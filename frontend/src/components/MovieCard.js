import React from "react";
import { Link } from "react-router-dom";
import "../css/MovieCard.css"; // Importing CSS for styling

/**
 * MovieCard Component
 * 
 * - Represents an individual movie or TV show card.
 * - Displays a clickable poster that links to the movie/show details page.
 * - Includes a dark overlay at the bottom where the title is displayed.
 * 
 * Props:
 * - `id` (number/string): Unique identifier for the movie or TV show.
 * - `title` (string): The title of the movie or TV show.
 * - `poster` (string): URL of the movie/show poster image.
 * - `category` (string, optional): The category ("movies" or "tvShows"). Defaults to "movies".
 */
const MovieCard = ({ id, title, poster, category = "movies" }) => {
  return (
    <div className="movie-card">
      {/* Link wraps the entire movie card, directing users to the movie details page */}
      <Link to={`/details/${category}/${id}`} className="movie-link">
        
        {/* Displays the movie/show poster image */}
        <img src={poster} alt={title} className="movie-poster" />
        
        {/* Dark overlay effect with the movie title */}
        <div className="overlay">
          <p className="movie-title">{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
