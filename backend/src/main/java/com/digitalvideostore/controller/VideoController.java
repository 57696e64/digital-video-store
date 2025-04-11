package com.digitalvideostore.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.digitalvideostore.model.Video;
import com.digitalvideostore.service.VideoService;

/**
 * REST controller for handling all video-related endpoints.
 * Maps to /api/videos and delegates logic to the VideoService.
 */
@RestController
@RequestMapping("/api/videos")
public class VideoController {

	@Autowired
	private VideoService videoService;

	/**
	 * POST /api/videos
	 * Creates a new video and saves it to the database.
	 *
	 * @param video the video data sent in the request body
	 * @return the created video and HTTP status 201
	 */
	@PostMapping
	public ResponseEntity<Video> createVideo(@RequestBody Video video) {
		Video savedVideo = videoService.addVideo(video);
		return new ResponseEntity<>(savedVideo, HttpStatus.CREATED);
	}

	/**
	 * GET /api/videos
	 * Retrieves all videos from the database.
	 *
	 * @return a list of all videos
	 */
	@GetMapping
	public List<Video> getAllVideos() {
		return videoService.getAllVideos();
	}

	/**
	 * GET /api/videos/{id}
	 * Retrieves a specific video by its ID.
	 *
	 * - Validates if the video exists before returning it.
	 * - If found, returns the video with HTTP 200.
	 * - If not found, returns 404 with an error message.
	 *
	 * @param id the video ID
	 * @return the found video or error message
	 */
	@GetMapping("/{id}")
	public ResponseEntity<?> getVideoById(@PathVariable String id) {
		Optional<Video> video = videoService.getVideoById(id);

		if (video.isPresent()) {
			return ResponseEntity.ok(video.get());
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Video with ID " + id + " not found.");
		}
	}

	/**
	 * DELETE /api/videos/{id}
	 * Deletes a video by its ID.
	 *
	 * - Validates if the video exists before deleting.
	 * - If found, deletes the video and returns 204 No Content.
	 * - If not found, returns a 404 error with a message.
	 *
	 * @param id the ID of the video to delete
	 * @return empty response (204) or error message (404)
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteVideo(@PathVariable String id) {
		try {
			// Call service to delete the video by ID
			videoService.deleteVideo(id);

			// Return 204 No Content (deletion success, nothing to return)
			return ResponseEntity.noContent().build(); // Type: ResponseEntity<Void>
		} catch (IllegalArgumentException e) {
			// If video not found, return error message with 404 Not Found
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // Type: ResponseEntity<String>
		}
	}

	/**
	 * PUT /api/videos/{id}
	 * Updates an existing video with new data.
	 *
	 * - Validates if the video exists before updating.
	 * - If found, updates and returns the video with status 200.
	 * - If not found, returns a 404 error with a message.
	 *
	 * @param id the ID of the video to update
	 * @param updatedVideo the new video data from the request body
	 * @return updated video or error message with appropriate HTTP status
	 */
	@PutMapping("/{id}")
	public ResponseEntity<?> updateVideo(@PathVariable String id, @RequestBody Video updatedVideo) {
		try {
			// Call service to update the video
			Video updated = videoService.updateVideo(id, updatedVideo);

			// Return the updated video with 200 OK
			return ResponseEntity.ok(updated); // Type: ResponseEntity<Video>
		} catch (IllegalArgumentException e) {
			// If video not found, return error message with 404 Not Found
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // Type: ResponseEntity<String>
		}
	}

	/**
	 * GET /api/videos/category
	 * Returns videos from a specific category (e.g., movies or tvShows).
	 *
	 * @param category the category to filter by
	 * @return a list of videos in that category
	 */
	@GetMapping("/category")
	public List<Video> getVideosByCategory(@RequestParam String category) {
		return videoService.getVideosByCategory(category);
	}

	/**
	 * GET /api/videos/search
	 * Returns videos with titles that contain the given keyword.
	 *
	 * @param title the partial title to search
	 * @return a list of matching videos
	 */
	@GetMapping("/search")
	public List<Video> searchVideosByTitle(@RequestParam String title) {
		return videoService.searchVideosByTitle(title);
	}

	/**
	 * GET /api/videos/featured
	 * Returns featured videos for a given category.
	 *
	 * @param category the category to filter featured videos by
	 * @return a list of featured videos
	 */
	@GetMapping("/featured")
	public List<Video> getFeaturedVideos(@RequestParam String category) {
		return videoService.getFeaturedVideos(category);
	}

	
}