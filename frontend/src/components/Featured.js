import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../css/Featured.css"; // Importing CSS for styling

/**
 * Featured Component
 * 
 * - Dynamically fetches and displays featured movies or TV shows.
 * - Uses the new backend API: `/api/videos/featured?category=movies|tvShows`
 * - Uses `useEffect` to fetch data when the `category` prop changes.
 * 
 * Props:
 * - `title` (string): Section title (e.g., "Featured Movies", "Featured TV Shows").
 * - `category` (string): Backend category ("movies" or "tvShows").
 */
const Featured = ({ title, category }) => {
	// State to store fetched featured items
	const [items, setItems] = useState([]);

	// State to track loading status
	const [loading, setLoading] = useState(true);

	/**
	 * Fetches featured items from the backend when component mounts or category changes.
	 */
	useEffect(() => {
		// Fetch featured videos directly by category from real backend
		fetch(`https://digital-video-store.onrender.com/api/videos/featured?category=${category}`)
			.then((response) => response.json()) // Convert response to JSON
			.then((data) => {
				setItems(data); // Update state with fetched items
				setLoading(false); // Mark loading as complete
			})
			.catch((error) => {
				console.error(`Error fetching featured ${category}:`, error);
				setLoading(false); // Stop loading on failure
			});
	}, [category]); // Trigger when `category` changes

	// Display loading message while fetching
	if (loading) {
		return <div className="featured-loading">Loading {title}...</div>;
	}

	return (
		<section className="featured">
			{/* Section title */}
			<h3>{title}</h3>

			{/* Grid layout for movie/TV cards */}
			<div className="featured-grid">
				{items.map((item) => (
					<MovieCard
						key={item.id || item._id} // Backend uses _id
						id={item.id || item._id}
						title={item.title}
						poster={item.cardImage}
						category={category}
					/>
				))}
			</div>
		</section>
	);
};

export default Featured;