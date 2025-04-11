/**
 * UserContext.js
 * 
 * - Provides a global context to store and manage the logged-in user's email.
 * - Makes userEmail accessible throughout the app without prop drilling.
 * - Automatically loads the email from localStorage if available.
 */

import React, { createContext, useState, useEffect } from "react";

// Create a new context for user authentication
export const UserContext = createContext();

/**
 * UserProvider Component
 * 
 * - Wraps around any component tree that needs access to the current user email.
 * - Provides `userEmail`, `loginUser`, `logoutUser`, and `isLoading` through context.
 */
export const UserProvider = ({ children }) => {
	// State to track the currently logged-in user's email (null if not logged in)
	const [userEmail, setUserEmail] = useState(null);

	// State to track whether we are still loading context data
	const [isLoading, setIsLoading] = useState(true);

	/**
	 * useEffect: Load userEmail from localStorage on component mount.
	 * - Helps persist login state even after refresh.
	 */
	useEffect(() => {
		const storedEmail = localStorage.getItem("loggedInUserEmail");
		if (storedEmail) {
			setUserEmail(storedEmail);
		}
		setIsLoading(false);
	}, []);

	/**
	 * loginUser: Updates the userEmail state and saves to localStorage
	 * @param {string} email - Email of the user
	 */
	const loginUser = (email) => {
		setUserEmail(email);
		localStorage.setItem("loggedInUserEmail", email);
	};

	/**
	 * logoutUser: Clears userEmail state and localStorage
	 */
	const logoutUser = () => {
		setUserEmail(null);
		localStorage.removeItem("loggedInUserEmail");
	};

	return (
		<UserContext.Provider value={{ userEmail, loginUser, logoutUser, isLoading }}>
			{children}
		</UserContext.Provider>
	);
};