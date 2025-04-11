package com.digitalvideostore.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Customer Model
 *
 * - Represents a customer profile in the MongoDB "customers" collection.
 * - Used for user-facing information such as name and email.
 * - Does not handle login credentials (handled in the User model).
 * - Email is duplicated for display/search purposes only — no passwords stored here.
 */
@Document(collection = "customers")
@Getter
@Setter
@NoArgsConstructor
public class Customer {

	@Id
	private String id;

	@NotBlank(message = "First name is required") // Error message for validation failure
	private String firstName;

	@NotBlank(message = "Last name is required") // Error message for validation failure
	private String lastName;

	@NotBlank(message = "Email is required") // Error message for validation failure
	@Email(message = "Email must be valid") // Error message if email format is invalid
	private String email;
}