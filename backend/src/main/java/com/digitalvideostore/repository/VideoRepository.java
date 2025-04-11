package com.digitalvideostore.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.digitalvideostore.model.Video;
import java.util.List;

/**
 * VideoRepository
 * 
 * - Extends MongoRepository to provide built-in CRUD operations for the Video collection.
 * - Supports Spring Data's method name query generation.
 *
 * Method Naming Rule:
 * --------------------
 * Spring automatically generates queries based on method names.
 * Structure: findBy[Field][Keyword][MoreFields][Options]
 *
 * Examples:
 * - findByTitle(String title) → exact match
 * - findByTitleContaining(String title) → partial match (LIKE '%title%')
 * - findByGenreAndYearGreaterThan(String genre, int year) → compound query
 * - findByCategoryAndFeatured(String category, boolean featured) → multiple field match
 *
 * Keywords include:
 * - Containing / Contains → partial match
 * - IgnoreCase → case-insensitive
 * - LessThan / GreaterThan / Between → range conditions
 * - And / Or → multiple conditions
 *
 * MongoDB will convert these to appropriate JSON queries under the hood.
 */
public interface VideoRepository extends MongoRepository<Video, String> {
	
	/**
	 * Finds all videos matching the given category (e.g., "movies" or "tvShows").
	 * 
	 * @param category the category to filter by
	 * @return a list of videos in the given category
	 */
	List<Video> findByCategory(String category);

	/**
	 * Finds all videos where the title contains the given string (case-insensitive).
	 * 
	 * @param title the title keyword to search for
	 * @return a list of videos whose titles contain the keyword
	 */
	List<Video> findByTitleContainingIgnoreCase(String title);

	/**
	 * Finds all featured videos for a specific category.
	 * 
	 * @param category the category to filter by
	 * @param featured true to find featured videos
	 * @return a list of featured videos in the given category
	 */
	List<Video> findByCategoryAndFeatured(String category, boolean featured);
}
