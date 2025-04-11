import { Link } from "react-router-dom"; // Allows navigation without full page reload
import "../css/MovieContainer.css"; // Importing styles specific to this component
import "../css/MovieCard.css"; // Ensuring MovieCard styles apply consistently

/**
 * MovieContainer Component
 * 
 * - Wraps a MovieCard inside a clickable `Link` for navigation.
 * - Displays:
 *   - A MovieCard with an image, title, and overlay.
 *   - A tagline or phrase below the card for marketing appeal.
 * - The entire container is wrapped in `Link`, ensuring the entire component is clickable.
 * 
 * Props:
 * - `id` (number/string): Unique identifier for the movie/TV show.
 * - `title` (string): The title of the media.
 * - `poster` (string): Image source URL for the card.
 * - `phrase` (string): A short tagline or marketing phrase.
 * - `linkTo` (string): The destination URL path for navigation.
 */
const MovieContainer = ({ id, title, poster, phrase, linkTo }) => {
  return (
    <Link to={linkTo} className="movie-container"> {/* Ensures entire container is clickable */}
      <div className="movie-card"> {/* Reuses MovieCard styles for consistency */}
        <img src={poster} alt={title} className="movie-poster" /> {/* Displays poster image */}
        
        {/* Overlay with movie title, adding a visual effect on hover */}
        <div className="overlay">
          <p className="movie-title">{title}</p>
        </div>
      </div>
      
      {/* Marketing tagline displayed below the movie card */}
      <p className="movie-phrase">{phrase}</p>
    </Link>
  );
};

export default MovieContainer;