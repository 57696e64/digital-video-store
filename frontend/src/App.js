import React from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import MovieDetails from "./pages/MovieDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import SearchResults from "./pages/SearchResults";
import "./css/App.css"; // Importing global styles

/**
 * App Component
 * 
 * - This component is responsible for setting up the **main routing structure** of the application.
 * - Uses **React Router** (`BrowserRouter`) to handle navigation between pages.
 * - Wraps the entire application with a **Router** to allow navigation between different pages.
 */
const App = () => {
  return (
    <Router>
      {/* Main wrapper div that applies global styling from App.css */}
      <div className="app-container">
        {/* Displays the navigation bar/header across all pages */}
        <Header />

        {/* Defines the routes for different pages */}
        <Routes>
          {/* Home Page Route: Loads the Home component when the path is '/' */}
          <Route path="/" element={<Home />} />

          {/* Collection Page Route: Displays all movies/TV shows, loads the Collection component */}
          <Route path="/movies-tv" element={<Collection />} />

          {/* Movie Details Route: Dynamic route that loads MovieDetails based on category and ID */}
          <Route path="/details/:category/:id" element={<MovieDetails />} />

          {/* Dashboard Page Route: New protected route for logged-in users */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Search result Page Route: New route for searrch result display */}
          <Route path="/search" element={<SearchResults />} />

        </Routes>

        {/* Displays the footer across all pages */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;