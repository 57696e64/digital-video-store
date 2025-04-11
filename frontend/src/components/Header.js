import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
import AuthModal from "./AuthModal";
import { UserContext } from "../context/UserContext";

/**
 * Header Component
 *
 * - Displays the site header including the logo, navigation links, search bar, and authentication buttons.
 * - Fetches and displays the logged-in customer's first name.
 * - Handles modal toggling and search navigation.
 */
const Header = () => {
	// State to control visibility of the login/register modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Global user context values: email, login and logout functions
	const { userEmail, loginUser, logoutUser } = useContext(UserContext);

	// State to store the retrieved customer object (used for displaying the user's name)
	const [customer, setCustomer] = useState(null);

	// State to track search input
	const [searchQuery, setSearchQuery] = useState("");

	// React Router hook to programmatically navigate
	const navigate = useNavigate();

	/**
	 * useEffect runs whenever userEmail changes.
	 * If a user is logged in, it fetches their customer data by email.
	 */
	useEffect(() => {
		const fetchCustomer = async () => {
			try {
				const custRes = await fetch(`https://digital-video-store.onrender.com/api/customers/email/${userEmail}`);
				if (!custRes.ok) throw new Error("Customer not found");
				const custData = await custRes.json();
				setCustomer(custData);
			} catch (err) {
				console.error("Error loading customer for header:", err);
			}
		};

		if (userEmail) {
			fetchCustomer();
		}
	}, [userEmail]);

	/**
	 * Handles form submission of the search bar.
	 * Navigates to the search results page if a valid query is provided.
	 */
	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
		}
	};

	return (
		<header className="header">
			<div className="header-inner">
				{/* Logo aligned left */}
				<div className="logo">FAKEVID</div>

				{/* Center navigation links */}
				<nav className="nav">
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/movies-tv">Movies & TV</Link></li>
					</ul>
				</nav>

				{/* Right section: search field and authentication buttons */}
				<div className="header-actions">
					{/* Search input and submit button */}
					<div className="search-box">
						<form className="search-form" onSubmit={handleSearch}>
							<div className="search-field">
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search..."
									required
								/>
							</div>
							<button type="submit" className="search-button">Search</button>
						</form>
					</div>

					{/* Authentication buttons or welcome message */}
					<div className="auth-buttons">
						{userEmail ? (
							<>
								{/* Welcome message linking to dashboard */}
								<Link to="/dashboard" className="welcome-text">
									Welcome{customer?.firstName ? `, ${customer.firstName}` : ""}!
								</Link>
								<button onClick={logoutUser}>Logout</button>
							</>
						) : (
							<button onClick={() => setIsModalOpen(true)}>Login</button>
						)}
					</div>
				</div>
			</div>

			{/* Authentication modal (login/register) */}
			<AuthModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onLogin={loginUser}
			/>
		</header>
	);
};

export default Header;
