import React from "react";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import ContentSection from "../components/ContentSection";
import "../css/Home.css"; // Importing CSS for styling

/**
 * Home Component
 * 
 * - This component serves as the homepage of the application.
 * - It is responsible for displaying:
 *   1. **Hero Section**: A slideshow showcasing trending movies/shows.
 *   2. **Featured Movies Section**: Displays a list of highlighted movies.
 *   3. **Featured TV Shows Section**: Displays a list of highlighted TV shows.
 *   4. **Content Section**: Contains general information about the store.
 */
const Home = () => {
  return (
    <div className="home">
      {/* Hero Section - Displays a slideshow of trending movies/shows */}
      <Hero />

      {/* Featured Movies Section - Displays a selection of movies from the API */}
      <Featured title="Featured Movies" category="movies" />

      {/* Featured TV Shows Section - Displays a selection of TV shows from the API */}
      <Featured title="Featured TV Shows" category="tvShows" />

      {/* Content Section - Displays additional static content about the platform */}
      <ContentSection />
    </div>
  );
};

export default Home;