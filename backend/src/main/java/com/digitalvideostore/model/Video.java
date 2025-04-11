package com.digitalvideostore.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Video document representing both movies and TV shows.
 * Uses the 'videos' MongoDB collection.
 */
@Document(collection = "videos")
@Getter	// Lombok generates all getters
@Setter	// Lombok generates all setters
@NoArgsConstructor	// Lombok generates a no-arg constructor
@AllArgsConstructor	// Lombok generates a full-arg constructor
public class Video {

	@Id
	private String id;

	private String title;
	private String genre;
	private String category;	// Can be "movies" or "tvShows"
	private int year;
	private String description;
	private String phrase;
	private String cardImage;
	private String largePoster;
	private double rentPrice;
	private double buyPrice;
	private boolean featured;
}
