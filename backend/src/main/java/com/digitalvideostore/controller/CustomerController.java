package com.digitalvideostore.controller;

import com.digitalvideostore.model.Customer;
import com.digitalvideostore.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

/**
 * CustomerController
 *
 * - REST controller for customer-related operations.
 * - Routes: /api/customers
 * - Handles input validation, response formatting, and delegates logic to service layer.
 */
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	/**
	 * POST /api/customers
	 * Creates a new customer entry.
	 *
	 * - Validates fields using annotations in Customer model.
	 * - Returns the created customer on success.
	 *
	 * @param customer customer data from request body
	 * @return saved customer or validation error
	 */
	@PostMapping
	public ResponseEntity<?> createCustomer(@Valid @RequestBody Customer customer) {
		try {
			Customer saved = customerService.createCustomer(customer);
			return new ResponseEntity<>(saved, HttpStatus.CREATED);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}

	/**
	 * GET /api/customers
	 * Retrieves a list of all customers.
	 *
	 * @return list of all customers
	 */
	@GetMapping
	public List<Customer> getAllCustomers() {
		return customerService.getAllCustomers();
	}

	/**
	 * GET /api/customers/{id}
	 * Retrieves a customer by ID.
	 *
	 * - Returns 404 if the customer is not found.
	 *
	 * @param id customer ID
	 * @return customer or error message
	 */
	@GetMapping("/{id}")
	public ResponseEntity<?> getCustomerById(@PathVariable String id) {
		Optional<Customer> customer = customerService.getCustomerById(id);
		return customer
			.<ResponseEntity<?>>map(ResponseEntity::ok)
			.orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body("Customer with ID " + id + " not found."));
	}

	/**
	 * GET /api/customers/email/{email}
	 * Retrieves a customer by email address.
	 *
	 * - Returns 404 if no matching customer is found.
	 *
	 * @param email customer email
	 * @return customer or error message
	 */
	@GetMapping("/email/{email}")
	public ResponseEntity<?> getCustomerByEmail(@PathVariable String email) {
		Customer customer = customerService.getCustomerByEmail(email);
		if (customer != null) {
			return ResponseEntity.ok(customer);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer with email " + email + " not found.");
		}
	}

	/**
	 * PUT /api/customers/{id}
	 * Updates an existing customer.
	 *
	 * - Returns 404 if the customer ID is invalid.
	 *
	 * @param id customer ID
	 * @param customer new data to update
	 * @return updated customer or error message
	 */
	@PutMapping("/{id}")
	public ResponseEntity<?> updateCustomer(@PathVariable String id, @Valid @RequestBody Customer customer) {
		try {
			Customer updated = customerService.updateCustomer(id, customer);
			return ResponseEntity.ok(updated);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	/**
	 * DELETE /api/customers/{id}
	 * Deletes a customer by ID.
	 *
	 * - Returns 204 on success, or 404 if the ID is invalid.
	 *
	 * @param id customer ID
	 * @return empty response or error message
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteCustomer(@PathVariable String id) {
		try {
			customerService.deleteCustomer(id);
			return ResponseEntity.noContent().build();
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
}