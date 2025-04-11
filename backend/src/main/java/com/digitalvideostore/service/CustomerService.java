package com.digitalvideostore.service;

import com.digitalvideostore.model.Customer;
import com.digitalvideostore.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * CustomerService
 *
 * - Handles business logic for creating, updating, and retrieving customers.
 * - Delegates persistence to the CustomerRepository.
 */
@Service
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	/**
	 * Creates and saves a new customer.
	 *
	 * - Prevents duplicate email registration.
	 * - Returns the saved customer.
	 *
	 * @param customer the customer to be saved
	 * @return the newly created customer
	 * @throws IllegalArgumentException if email already exists
	 */
	public Customer createCustomer(Customer customer) {
		Customer existing = customerRepository.findByEmail(customer.getEmail());
		if (existing != null) {
			throw new IllegalArgumentException("A customer with this email already exists.");
		}
		return customerRepository.save(customer);
	}

	/**
	 * Retrieves a list of all customers.
	 *
	 * @return list of all customers in the database
	 */
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	/**
	 * Retrieves a single customer by ID.
	 *
	 * @param id the ID of the customer
	 * @return Optional containing the customer if found, or empty if not found
	 */
	public Optional<Customer> getCustomerById(String id) {
		return customerRepository.findById(id);
	}

	/**
	 * Retrieves a single customer by email.
	 *
	 * - Used for login-based lookups in dashboard/header.
	 *
	 * @param email the email of the customer
	 * @return Customer if found, or null if not found
	 */
	public Customer getCustomerByEmail(String email) {
		return customerRepository.findByEmail(email);
	}

	/**
	 * Updates an existing customer.
	 *
	 * - Verifies that the customer exists before updating.
	 *
	 * @param id the ID of the customer to update
	 * @param updatedCustomer the new customer data
	 * @return the updated customer
	 * @throws IllegalArgumentException if customer with ID is not found
	 */
	public Customer updateCustomer(String id, Customer updatedCustomer) {
		Optional<Customer> existing = customerRepository.findById(id);
		if (existing.isEmpty()) {
			throw new IllegalArgumentException("Customer with ID " + id + " not found.");
		}
		updatedCustomer.setId(id);
		return customerRepository.save(updatedCustomer);
	}

	/**
	 * Deletes a customer by ID.
	 *
	 * @param id the ID of the customer to delete
	 * @throws IllegalArgumentException if the ID is not found
	 */
	public void deleteCustomer(String id) {
		if (!customerRepository.existsById(id)) {
			throw new IllegalArgumentException("Customer with ID " + id + " not found.");
		}
		customerRepository.deleteById(id);
	}
}