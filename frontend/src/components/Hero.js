import React, { useState, useEffect } from "react";
import "../css/Hero.css"; // Importing CSS for styling
import { Link } from "react-router-dom";

/**
 * Hero Component
 * 
 * - Implements a slideshow with three rotating banners.
 * - Auto-rotates every 10 seconds.
 * - Supports manual navigation via left/right arrows.
 * - Clicking on a slide navigates to a specific movie/TV show (if a link is available).
 */
const Hero = () => {
	// Array of slideshow images with navigation links
	const images = [
		{
			src: "/images/hero/site-banner.jpg",
			alt: "Unlimited movies and TV shows — rent or buy instantly",
			link: null
		},
		{
			src: "/images/hero/oppenheimer-banner.jpg",
			alt: "Oppenheimer now available in HD",
			link: "/details/movies/67eb4d93c5f833010f323251"
		},
		{
			src: "/images/hero/arcane2-banner.jpg",
			alt: "Arcane Season 2 now streaming",
			link: "/details/tvShows/67eb4d94c5f833010f32325e"
		}
	];

	// State to track the currently displayed slide
	const [currentIndex, setCurrentIndex] = useState(0);

	/**
	 * Effect: Auto-rotates the slideshow every 10 seconds.
	 */
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 10000); // Auto-rotate every 10 seconds

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, [images.length]);

	/**
	 * Navigates to the previous slide.
	 */
	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	/**
	 * Navigates to the next slide.
	 */
	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	// Get current image
	const currentImage = images[currentIndex];

	return (
		<section className="hero">
			<div className="slideshow">
				{/* Left Navigation Arrow */}
				<button className="prev" onClick={goToPrevious}>
					&#10094;
				</button>

				{/* Main Slideshow Image (conditionally wrapped in <Link>) */}
				{currentImage.link ? (
					<Link to={currentImage.link}>
						<img
							src={currentImage.src}
							alt={currentImage.alt}
							className="hero-image"
						/>
					</Link>
				) : (
					<img
						src={currentImage.src}
						alt={currentImage.alt}
						className="hero-image"
					/>
				)}

				{/* Right Navigation Arrow */}
				<button className="next" onClick={goToNext}>
					&#10095;
				</button>
			</div>

			{/* Dots Navigation */}
			<div className="dots">
				{images.map((_, index) => (
					<span
						key={index}
						className={index === currentIndex ? "dot active" : "dot"}
						onClick={() => setCurrentIndex(index)}
					></span>
				))}
			</div>
		</section>
	);
};

export default Hero;