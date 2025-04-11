package com.digitalvideostore.service;

import com.digitalvideostore.model.User;
import com.digitalvideostore.model.Customer; // Added to support automatic customer creation
import com.digitalvideostore.repository.UserRepository;
import com.digitalvideostore.service.CustomerService; // Injected for use in registration flow
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * UserService
 *
 * - Handles business logic related to user registration and login.
 * - Separates encryption, validation, and database operations from the controller.
 */
@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CustomerService customerService;

	// Encoder used to hash and compare passwords securely
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	/**
	 * Registers a new user after checking for duplicates.
	 *
	 * - Validates fields before saving.
	 * - Hashes the password before saving.
	 * - Automatically creates a customer profile with the same email.
	 *
	 * @param user the user to register
	 * @return saved user object
	 * @throws IllegalArgumentException if email already exists or input is invalid
	 */
	public User registerUser(User user) {
		// Validate all input fields for basic format and safe characters
		if (!user.getFirstName().matches("^[A-Za-z]+$") || !user.getLastName().matches("^[A-Za-z]+$")) {
			throw new IllegalArgumentException("First and last name must only contain letters.");
		}

		if (user.getEmail() == null || !user.getEmail().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$") || user.getEmail().matches(".*[<>'\"();`].*")) {
			throw new IllegalArgumentException("Invalid or unsafe email format.");
		}		

		if (user.getPassword() == null || user.getPassword().length() < 6 || user.getPassword().matches(".*[<>'\"();`].*")) {
			throw new IllegalArgumentException("Password must be at least 6 characters and not contain forbidden characters.");
		}

		if (userRepository.findByEmail(user.getEmail()) != null) {
			throw new IllegalArgumentException("User with this email already exists.");
		}

		// Hash the password before saving
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User savedUser = userRepository.save(user);

		// Also create a corresponding customer record
		Customer customer = new Customer();
		customer.setFirstName(user.getFirstName());
		customer.setLastName(user.getLastName());
		customer.setEmail(user.getEmail());
		customerService.createCustomer(customer);

		return savedUser;
	}

	/**
	 * Authenticates a user by email and password.
	 *
	 * - Checks credentials using BCrypt.
	 *
	 * @param email user's email
	 * @param password plain text password
	 * @return the authenticated user object
	 * @throws IllegalArgumentException if credentials are invalid
	 */
	public User loginUser(String email, String password) {
		User user = userRepository.findByEmail(email);

		if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
			throw new IllegalArgumentException("Invalid email or password.");
		}

		return user;
	}
}