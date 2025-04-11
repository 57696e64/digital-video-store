import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ItemList from "../components/ItemList";
import "../css/Collection.css"; // Importing CSS for styling

/**
 * Collection Component
 * 
 * - Displays a tab navigation to filter items between "All", "Movies", and "TV Shows".
 * - Reads the `category` query parameter from the URL if provided (`?category=movies`).
 * - Uses `useState` to track the currently selected tab.
 * - Updates the tab selection dynamically when the URL changes.
 */
const Collection = () => {
  // Extracts query parameters from the URL
  const [searchParams, setSearchParams] = useSearchParams(); // A React Router hook to rad and update URL query params (returns object-like structure)
  const categoryFromURL = searchParams.get("category"); // Retrieves category from query params (e.g., "?category=movies")

  // State to track the currently selected tab (default is "all" if no category is provided)
  const [selectedTab, setSelectedTab] = useState(categoryFromURL || "all");

  /**
   * Effect: Updates selected tab when the `category` parameter in the URL changes.
   * 
   * - Runs whenever `categoryFromURL` changes.
   * - Ensures that when the user changes the query parameter, the UI updates.
   */
  useEffect(() => {
    if (categoryFromURL) {
      setSelectedTab(categoryFromURL);
    }
  }, [categoryFromURL]);

  return (
    <div className="collection">
      {/* Tab Navigation - Allows users to filter between All, Movies, and TV Shows */}
      <div className="tabs">
        {/* "All" Tab - Highlights when selected */}
        <button 
          className={selectedTab === "all" ? "active" : ""} 
          onClick={() => {setSelectedTab("all"); setSearchParams('')}}
        >
          All
        </button>

        {/* "Movies" Tab - Highlights when selected */}
        <button 
          className={selectedTab === "movies" ? "active" : ""} 
          onClick={() => {setSelectedTab("movies"); setSearchParams('')}}
        >
          Movies
        </button>

        {/* "TV Shows" Tab - Highlights when selected */}
        <button 
          className={selectedTab === "tvShows" ? "active" : ""} 
          onClick={() => {setSelectedTab("tvShows"); setSearchParams('')}}
        >
          TV Shows
        </button>
      </div>

      {/* Item List - Displays content based on the selected tab */}
      <ItemList category={selectedTab} />
    </div>
  );
};

export default Collection;
