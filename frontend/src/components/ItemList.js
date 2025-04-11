import React, { useState, useEffect } from "react";
import MovieContainer from "../components/MovieContainer";
import "../css/ItemList.css"; // Importing CSS for styling

/**
 * ItemList Component
 * 
 * - Fetches and displays movies or TV shows based on the selected category.
 * - Supports filtering by "all", "movies", or "tvShows".
 * - Uses async data fetching to retrieve movies and TV shows separately.
 * 
 * Props:
 * - `category` (string): Determines which content to display ("all", "movies", "tvShows").
 */
const ItemList = ({ category }) => {
  // State to store movies and TV shows data
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to handle async fetching

  /**
   * Effect: Fetches videos from the real backend when the component mounts or category changes.
   * 
   * - Uses different logic based on selected category
   * - For "all": fetch both movies and tvShows and merge
	 * - For "movies" or "tvShows": fetch from category endpoint
	 * - Uses `fetch()` to request data from Spring Boot backend
   * - Since it is fetching from two links (movies, TV), put them inside an async function is eaiser to read
   *   compare to a long chained then function. 
   * - To prevent unwanted bugs, we need to use key word `await` on async functions like `fetch()` so lines like
   *   `setMovies()` don't run before fetching completes. `await` only works in an async function so `fetchData()`
   *   has to be an async function.
   * - Updates state with fetched movie and TV show data.
   * - Handles errors and ensures the loading state is updated.
   */
  useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				if (category === "all") {
					// Fetch both categories separately and merge them
					const [moviesRes, tvShowsRes] = await Promise.all([
						fetch("https://digital-video-store.onrender.com/api/videos/category?category=movies"),
						fetch("https://digital-video-store.onrender.com/api/videos/category?category=tvShows")
					]);
					const movies = await moviesRes.json();
					const tvShows = await tvShowsRes.json();
					setVideos([...movies, ...tvShows]);
				} else {
					// Fetch only the selected category
					const res = await fetch(`https://digital-video-store.onrender.com/api/videos/category?category=${category}`);
					const data = await res.json();
					setVideos(data);
				}
			} catch (error) {
				console.error("Error fetching videos:", error);
			} finally {
				setLoading(false); // Stop loading indicator
			}
		};

		fetchData(); // Invoke the fetch function
	}, [category]); // Re-run if category changes

  // Displays a loading message while data is being fetched
  if (loading) {
    return <p>Loading content...</p>;
  }

  // Separate fetched videos into movies and tvShows based on their `category` field
	const filteredMovies = videos.filter((video) => video.category === "movies");
	const filteredTvShows = videos.filter((video) => video.category === "tvShows");

  return (
		<div className="item-list">
			<div className="grid-container">

				{/* Display Movies Section if there are movies to show */}
				{(category === "all" || category === "movies") && filteredMovies.length > 0 && (
					<>
						<h2>Movies</h2>
						<div className="grid larger-cards">
							{filteredMovies.map((movie) => (
								<MovieContainer
									key={movie.id || movie._id}
									id={movie.id || movie._id}
									linkTo={`/details/movies/${movie.id || movie._id}`}
									title={movie.title}
									poster={movie.cardImage}
									phrase={movie.phrase}
								/>
							))}
						</div>
					</>
				)}

				{/* Display TV Shows Section if there are TV shows to show */}
				{(category === "all" || category === "tvShows") && filteredTvShows.length > 0 && (
					<>
						<h2>TV Shows</h2>
						<div className="grid tv-grid larger-cards">
							{filteredTvShows.map((tvShow) => (
								<MovieContainer
									key={tvShow.id || tvShow._id}
									id={tvShow.id || tvShow._id}
									linkTo={`/details/tvShows/${tvShow.id || tvShow._id}`}
									title={tvShow.title}
									poster={tvShow.cardImage}
									phrase={tvShow.phrase}
								/>
							))}
						</div>
					</>
				)}

			</div>
		</div>
	);
};

export default ItemList;
