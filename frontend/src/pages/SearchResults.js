import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchGrid from "../components/SearchGrid";

/**
 * SearchResults Component
 *
 * - Retrieves the search query from the URL.
 * - Fetches matching video data from the backend based on the query.
 * - Displays the results using the SearchGrid layout.
 */
const SearchResults = () => {
	// React Router hook to read URL query parameters
	const [searchParams] = useSearchParams();

	// Stores the list of videos returned from the backend
	const [results, setResults] = useState([]);

	// Tracks whether the results are still loading
	const [loading, setLoading] = useState(true);

	// Stores any error encountered during fetch
	const [error, setError] = useState(null);

	// Gets the current search query from the URL
	const query = searchParams.get("query") || "";

	/**
	 * useEffect runs when the search query changes.
	 * Sends a GET request to the backend to fetch matching videos.
	 * Handles loading state and error feedback.
	 */
	useEffect(() => {
		const fetchResults = async () => {
			try {
				const res = await fetch(`https://digital-video-store.onrender.com/api/videos/search?title=${encodeURIComponent(query)}`);
				if (!res.ok) throw new Error("Failed to fetch results");
				const data = await res.json();
				setResults(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (query.trim()) {
			fetchResults();
		} else {
			// If the query is empty or only whitespace, don't fetch
			setLoading(false);
		}
	}, [query]);

	// Render loading message while data is being fetched
	if (loading) return <p>Loading search results...</p>;

	// Display error message if request failed
	if (error) return <p>Error: {error}</p>;

	// Pass the result list to the SearchGrid component for display
	return (
		<SearchGrid title={`Search Results for "${query}"`} items={results} />
	);
};

export default SearchResults;
