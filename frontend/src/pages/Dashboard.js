import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../css/Home.css"; // Reuse existing styles for layout and spacing
import "../css/Dashboard.css"; // Custom styles specific to dashboard layout

/**
 * Dashboard Component
 *
 * - Displays the customer's profile information after login.
 * - Protects the route by redirecting unauthenticated users back to the homepage.
 */
const Dashboard = () => {
	// Access global user email state from context
	const { userEmail, isLoading } = useContext(UserContext);

	// Hook for navigating programmatically
	const navigate = useNavigate();

	// Local state to store customer profile data fetched from backend
	const [customer, setCustomer] = useState(null);
	const [loadingCustomer, setLoadingCustomer] = useState(true);

	/**
	 * Redirect unauthenticated users to the homepage after context has finished loading.
	 */
	useEffect(() => {
		if (!isLoading && !userEmail) {
			navigate("/");
		}
	}, [userEmail, isLoading, navigate]);

	/**
	 * After userEmail is available, fetch customer info from backend.
	 */
	useEffect(() => {
		const fetchCustomer = async () => {
			try {
				const res = await fetch(`https://digital-video-store.onrender.com/api/customers/email/${userEmail}`);
				if (!res.ok) throw new Error("Failed to load customer info");
				const data = await res.json();
				setCustomer(data);
			} catch (err) {
				console.error("Error loading customer:", err);
			} finally {
				setLoadingCustomer(false);
			}
		};
		if (userEmail) fetchCustomer();
	}, [userEmail]);

	// Show a loading message while context or customer is initializing
	if (isLoading || loadingCustomer) return <p>Loading...</p>;

	// Prevent rendering if user is missing after loading completes
	if (!userEmail || !customer) return null;

	return (
		<div className="dashboard">
			{/* Page Title */}
			<h1>User Dashboard</h1>

			{/* Profile Info Section */}
			<div className="user-profile">
				<p><strong>First Name:</strong> {customer.firstName}</p>
				<p><strong>Last Name:</strong> {customer.lastName}</p>
				<p><strong>Email:</strong> {customer.email}</p>
			</div>
		</div>
	);
};

export default Dashboard;