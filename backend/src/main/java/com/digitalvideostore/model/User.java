package com.digitalvideostore.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * User document representing a registered user account.
 * Stored in the 'users' collection in MongoDB.
 */
@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	private String id;

	// Required fields when registering
	private String firstName;
	private String lastName;
	private String email;
	private String password;
}
