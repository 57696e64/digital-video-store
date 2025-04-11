package com.digitalvideostore.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalvideostore.model.Video;
import com.digitalvideostore.repository.VideoRepository;

/**
 * Service layer for handling video-related operations.
 * This class contains business logic and interacts with the repository layer.
 */
@Service
public class VideoService {

	@Autowired
	private VideoRepository videoRepository;

	/**
	 * Saves a new video document to the MongoDB collection.
	 *
	 * @param video the video object to be saved
	 * @return the saved video with its generated ID
	 */
	public Video addVideo(Video video) {
		return videoRepository.save(video);
	}

	/**
	 * Retrieves all videos from the database.
	 *
	 * @return a list of all video documents
	 */
	public List<Video> getAllVideos() {
		return videoRepository.findAll();
	}

	/**
	 * Retrieves a specific video by its ID.
	 *
	 * @param id the unique ID of the video
	 * @return an Optional containing the video if found, or empty if not
	 */
	public Optional<Video> getVideoById(String id) {
		return videoRepository.findById(id);
	}

	/**
	 * Deletes a video by its ID.
	 *
	 * @param id the unique ID of the video to delete
	 */
	public void deleteVideo(String id) {
		if (!videoRepository.existsById(id)) {
			throw new IllegalArgumentException("Cannot delete: Video with ID " + id + " not found.");
		}
		videoRepository.deleteById(id);
	}	

	/**
	 * Updates an existing video by ID.
	 * 
	 * - Checks if the video with the given ID exists.
	 * - If it does, sets the ID on the incoming object and saves it (overwriting the old one).
	 * - If it doesn't exist, throws an exception that the controller can catch.
	 *
	 * @param id the video ID from the URL path
	 * @param updatedVideo the updated video object from the request body
	 * @return the saved (updated) video object
	 * @throws IllegalArgumentException if no video exists with the given ID
	 */
	public Video updateVideo(String id, Video updatedVideo) {
		// Try to find the video in the database by its ID
		// This returns an Optional, which may or may not contain a result
		Optional<Video> existingOpt = videoRepository.findById(id);

		// If the Optional is empty, the ID is invalid — throw an exception
		if (existingOpt.isEmpty()) {
			throw new IllegalArgumentException("Video with ID " + id + " not found.");
		}

		// Set the ID on the incoming updated object to match the one we're replacing
		updatedVideo.setId(id);

		// Save the updated video (overwriting the original)
		return videoRepository.save(updatedVideo);
	}
	
	/**
	 * Finds all videos that belong to the given category.
	 *
	 * @param category either "movies" or "tvShows"
	 * @return a list of videos in the specified category
	 */
	public List<Video> getVideosByCategory(String category) {
		return videoRepository.findByCategory(category);
	}

	/**
	 * Searches for videos by a partial title match (case-insensitive).
	 *
	 * @param title the keyword to search for
	 * @return a list of videos whose titles contain the keyword
	 */
	public List<Video> searchVideosByTitle(String title) {
		return videoRepository.findByTitleContainingIgnoreCase(title);
	}

	/**
	 * Retrieves featured videos from a specific category.
	 *
	 * @param category the category to filter by
	 * @return a list of featured videos in that category
	 */
	public List<Video> getFeaturedVideos(String category) {
		return videoRepository.findByCategoryAndFeatured(category, true);
	}
}
