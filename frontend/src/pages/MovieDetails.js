import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/MovieDetails.css"; // Importing CSS for styling

/**
 * MovieDetails Component
 * 
 * - Fetches and displays details for both movies and TV shows based on the URL parameters `category` and `id`.
 * - Uses `useParams` to extract dynamic route parameters (e.g., `/details/movies/65feabcd...`).
 * - Utilizes `useEffect` to fetch data from the backend API when `id` changes.
 * - Implements conditional rendering to show "Rent" and "Buy" buttons, which change to a "Watch" button after selection.
 */
const MovieDetails = () => {
	// Extracts the `category` (movies or TV shows) and `id` from the URL
	const { id } = useParams();

	// Stores the fetched movie/TV show data
	const [media, setMedia] = useState(null);

	// Tracks whether the user has purchased or rented the movie/show
	const [isPurchased, setIsPurchased] = useState(false);

	/**
	 * Fetches the movie/TV show data from the real backend when the component loads or when `id` changes.
	 */
	useEffect(() => {
		// Fetches a video by ID from the real backend
		fetch(`https://digital-video-store.onrender.com/api/videos/${id}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Not found"); // Handles fetch errors
				}
				return response.json();
			})
			.then((data) => {
				console.log("Fetched Media:", data); // Logs fetched data for debugging
				setMedia(data); // Updates state with the fetched media details
			})
			.catch((error) => console.error("Error fetching media details:", error));
	}, [id]); // Runs when the video ID changes

	// Shows a loading message until the data is fetched
	if (!media) {
		return <div className="loading">Loading details...</div>;
	}

	return (
		<div className="movie-details">
			{/* Left Section - Small Poster & Action Buttons */}
			<div className="left-section">
				{/* Displays a small poster using inline CSS background image */}
				<div
					className="small-poster"
					style={{ backgroundImage: `url(${media.cardImage})` }}
				></div>

				{/* Action Buttons Section */}
				<div className="buttons">
					{/* If the user has not rented/bought the movie, show "Rent" and "Buy" buttons */}
					{!isPurchased ? (
						<>
							{/* Rent button - Clicking this will change state to mark the item as "purchased" */}
							<button className="rent-btn" onClick={() => setIsPurchased(true)}>
								Rent ${media.rentPrice.toFixed(2)}
							</button>

							{/* Buy button - Also changes state to mark as "purchased" */}
							<button className="buy-btn" onClick={() => setIsPurchased(true)}>
								Buy ${media.buyPrice.toFixed(2)}
							</button>
						</>
					) : (
						// If item is purchased, replace buttons with a "Watch" button
						<button className="play-btn">Watch</button>
					)}
				</div>
			</div>

			{/* Middle Section - Movie/TV Show Information */}
			<div className="details-content">
				{/* Displays the movie/show title */}
				<h1 className="movie-title">{media.title}</h1>

				{/* Displays genre, category type (Movie/TV Show), and release year */}
				<p className="meta-info">
          {media.genre} | {media.category === "movies" ? "Movie" : "TV Show"} | {media.year}
				</p>

				{/* Displays the synopsis of the movie/show */}
				<p className="synopsis">{media.description}</p>
			</div>

			{/* Right Section - Large Poster */}
			<div className="large-poster">
				{/* Displays a larger version of the movie/show poster */}
				<img src={media.largePoster} alt={media.title} />
			</div>
		</div>
	);
};

export default MovieDetails;
