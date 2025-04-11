package com.digitalvideostore.repository;

import com.digitalvideostore.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * CustomerRepository
 *
 * - Extends MongoRepository to provide CRUD operations for Customer documents.
 * - Uses Spring Data MongoDB to generate query logic automatically.
 *
 * Naming Rule (Spring Data):
 * ----------------------------
 * Structure: findBy[Field][Keyword][Options]
 *
 * Examples:
 * - findByEmail(String email) → finds a customer by exact email
 * - findByFirstNameContainingIgnoreCase(String name) → partial first name match
 */
@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> {

	// Find customer by exact email address
	Customer findByEmail(String email);
}
