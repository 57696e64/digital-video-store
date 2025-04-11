import React from "react";
import MovieCard from "./MovieCard";
import "../css/Featured.css";

/**
 * SearchGrid Component
 *
 * - Reusable grid layout for displaying search results.
 * - Uses the same visual layout as the Featured section.
 *
 * Props:
 * - title (string): Section heading
 * - items (array): List of video objects (each should have title, cardImage, id/_id)
 */
const SearchGrid = ({ title, items }) => {
	return (
		<section className="featured">
			<h3>{title}</h3>
			<div className="featured-grid">
				{items.map((item) => (
					<MovieCard
						key={item.id || item._id}
						id={item.id || item._id}
						title={item.title}
						poster={item.cardImage}
					/>
				))}
			</div>
		</section>
	);
};

export default SearchGrid;
