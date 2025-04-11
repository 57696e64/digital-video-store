import React, { useState, useEffect } from "react";
import "../css/AuthModal.css";

/**
 * AuthModal Component
 * 
 * - Displays a modal for user authentication (Login/Register).
 * - Supports toggling between login and registration modes.
 * - Handles form validation and stores login state in `localStorage`.
 * 
 * Props:
 * - `isOpen` (boolean): Controls the visibility of the modal.
 * - `onClose` (function): Closes the modal when triggered.
 * - `onLogin` (function): Updates the parent component when a user logs in.
 */
const AuthModal = ({ isOpen, onClose, onLogin }) => {
	// State variables to track user input for both login and registration
	const [username, setUsername] = useState(""); // Used only for login
	const [password, setPassword] = useState(""); // Shared by login and registration
	const [firstName, setFirstName] = useState(""); // Registration only
	const [lastName, setLastName] = useState(""); // Registration only
	const [email, setEmail] = useState(""); // Registration only

	// State to toggle between login and register mode
	const [isRegister, setIsRegister] = useState(false);

	// State for error message feedback
	const [error, setError] = useState("");

	/**
	 * Reset form fields whenever the modal is opened.
	 * Ensures clean state on each open.
	 */
	useEffect(() => {
		if (isOpen) {
			setIsRegister(false); // Always default to login
			setUsername("");
			setPassword("");
			setFirstName("");
			setLastName("");
			setEmail("");
			setError("");
		}
	}, [isOpen]);

	/**
	 * Handles both registration and login form submissions.
	 * Makes fetch requests and stores returned user ID if successful.
	 */
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevents default form submission and page reload

		// Input validation
		if (!password || (!isRegister && !username)) {
			setError("All fields are required.");
			return;
		}
		if (isRegister && (!firstName || !lastName || !email)) {
			setError("Please fill out all registration fields.");
			return;
		}

		// Enforce that first/last name are all letters (no numbers/symbols)
		const nameRegex = /^[A-Za-z]+$/;
		if ((isRegister && (!nameRegex.test(firstName) || !nameRegex.test(lastName)))) {
			setError("First and last name must only contain letters.");
			return;
		}

		// Validate email format and block suspicious characters
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const unsafeCharRegex = /[<>'"();`]/; // Blocks common injection characters
		if (!emailRegex.test(email || username)) {
			setError("Invalid email format.");
			return;
		}
		if (unsafeCharRegex.test(email || username)) {
			setError("Invalid characters in email.");
			return;
		}

		// Password basic strength check (optional)
		if (password.length < 6 || unsafeCharRegex.test(password)) {
			setError("Password must be at least 6 characters and not contain invalid symbols.");
			return;
		}

		setError("");

		try {
			let response;

			// Registration fetch request
			if (isRegister) {
				response = await fetch("https://digital-video-store.onrender.com/api/auth/register", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ firstName, lastName, email, password }),
				});
			} else {
				// Login fetch request
				response = await fetch("https://digital-video-store.onrender.com/api/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: username, password }),
				});
			}

			// Handle non-successful responses from backend
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(errorText);
			}

			// Only parse response if JSON is returned
			const contentType = response.headers.get("content-type");
			if (contentType && contentType.includes("application/json")) {
				const userData = await response.json();

				// Store only user ID and send to context (used for profile retrieval later)
				localStorage.setItem("loggedInUserId", userData.id);
				onLogin(userData.email);
				onClose();
			} else {
				throw new Error("Unexpected response from server.");
			}
		} catch (err) {
			// Show meaningful message for registration or login errors
			if (isRegister && err.message.includes("already")) {
				setError("Email already in use. Please use a different one.");
			} else {
				setError("Login failed. Please check your credentials and try again.");
			}
			console.error("Auth error:", err);
		}
	};

	return (
		isOpen && (
			<div className="auth-modal-overlay" onClick={onClose}>
				<div className="auth-modal" onClick={(e) => e.stopPropagation()}>
					{/* Modal title updates depending on auth mode */}
					<h2>{isRegister ? "Register" : "Login"}</h2>

					{/* Display error messages */}
					{error && <p className="error-message">{error}</p>}

					<form onSubmit={handleSubmit}>
						{/* Show registration-specific fields */}
						{isRegister && (
							<>
								<input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
								<input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
								<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
							</>
						)}

						{/* Login-specific email field */}
						{!isRegister && (
							<input type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
						)}

						{/* Password field (shared) */}
						<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

						{/* Submit button updates based on mode */}
						<button type="submit">{isRegister ? "Register" : "Login"}</button>

						{/* Cancel button to close modal */}
						<button onClick={onClose} type="button">Close</button>
					</form>

					{/* Toggle between login/register */}
					<p className="toggle-auth" onClick={() => setIsRegister(!isRegister)}>
						{isRegister ? "Already have an account? Login here." : "Don't have an account? Register here."}
					</p>
				</div>
			</div>
		)
	);
};

export default AuthModal;