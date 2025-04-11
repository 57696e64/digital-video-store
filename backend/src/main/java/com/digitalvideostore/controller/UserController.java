package com.digitalvideostore.controller;

import com.digitalvideostore.model.User; // User model class
import com.digitalvideostore.service.UserService; // User service logic
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * UserController
 *
 * - Handles registration and login functionality for users.
 * - All routes are grouped under /api/auth.
 * - Delegates business logic to UserService.
 */
@RestController // Marks this class as a REST API controller
@RequestMapping("/api/auth") // All endpoints here will start with /api/auth
public class UserController {

	@Autowired
	private UserService userService; // Injects the user service

	/**
	 * POST /api/auth/register
	 *
	 * - Receives user details from the client
	 * - Calls service to register user
	 * - Returns the created user (excluding password) or an error
	 *
	 * @param user user information from request body
	 * @return HTTP 200 with user or 409 if email is duplicate
	 */
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		try {
			// Call service to register the user (also handles password hashing)
			User savedUser = userService.registerUser(user);

			// For security: don't return the hashed password to the client
			savedUser.setPassword(null);

			// Return 200 OK with the created user
			return new ResponseEntity<>(savedUser, HttpStatus.OK);

		} catch (IllegalArgumentException e) {
			// If the email already exists, return 409 Conflict
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}

	/**
	 * POST /api/auth/login
	 *
	 * - Receives email and password
	 * - Verifies credentials via service
	 * - Returns user info or 401 Unauthorized if invalid
	 *
	 * @param loginRequest contains email and password
	 * @return HTTP 200 with user info or 401 if login fails
	 */
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
		try {
			// Authenticate user using email + password
			User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());

			// Hide password before returning response
			user.setPassword(null);

			// Return 200 OK with user info
			return new ResponseEntity<>(user, HttpStatus.OK);

		} catch (IllegalArgumentException e) {
			// If credentials are invalid, return 401 Unauthorized
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}
}