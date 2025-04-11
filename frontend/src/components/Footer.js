import React from "react";
import "../css/Footer.css"; // Importing CSS for styling
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa"; // Importing social media icons
import { Link } from "react-router-dom";

/**
 * Footer Component
 * 
 * - Represents the footer of the website.
 * - Includes sections for:
 *   - "Watch" (links to Movies & TV categories)
 *   - "My Account" (links to account and settings)
 *   - "Help" (links to support pages)
 * - Displays social media icons for external links.
 */
const Footer = () => {
  return (
    <footer className="footer">
      {/* Container for footer sections */}
      <div className="footer-sections">
        
        {/* Watch Section */}
        <div className="footer-section">
          <h4>Watch</h4>
          <ul>
            <li><Link to="/movies-tv?category=movies">Movies</Link></li>
            <li><Link to="/movies-tv?category=tvShows">TV</Link></li>
          </ul>
        </div>

        {/* My Account Section */}
        <div className="footer-section">
          <h4>My Account</h4>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>Settings</li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li>About Us</li>
            <li>Support</li>
            <li>Contact Us</li>
            <li>Jobs</li>
          </ul>
        </div>
      </div>
      
      {/* Social Media Links */}
      <div className="social-icons">
        <FaFacebook /> {/* Facebook Icon */}
        <FaInstagram /> {/* Instagram Icon */}
        <FaTwitter /> {/* Twitter Icon */}
        <FaTiktok /> {/* TikTok Icon */}
      </div>
    </footer>
  );
};

export default Footer;
