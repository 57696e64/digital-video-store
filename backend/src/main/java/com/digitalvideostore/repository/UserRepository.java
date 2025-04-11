package com.digitalvideostore.repository;

import com.digitalvideostore.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * UserRepository interface
 *
 * - Provides CRUD operations for User documents.
 * - Extends MongoRepository to automatically implement database access methods.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

	/**
	 * Finds a user by their email address.
	 *
	 * @param email the email to search for
	 * @return the matching User object, or null if not found
	 */
	User findByEmail(String email);

	/**
	 * Finds a user by both email and password.
	 * Used for authentication logic.
	 *
	 * @param email the user's email
	 * @param password the user's password
	 * @return the matching User object, or null if no match
	 */
	User findByEmailAndPassword(String email, String password);
}
