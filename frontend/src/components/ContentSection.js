import React from "react";
import "../css/ContentSection.css"; // Importing CSS for styling

/**
 * ContentSection Component
 * 
 * - Displays a static content banner.
 * - Uses an image (`content-banner-small.jpg`) located in the `/images/content/` directory.
 */
const ContentSection = () => {
  return (
    <section className="content-section">
      {/* Displays a banner image */}
      <img 
        src="/images/content/content-banner-small.jpg" 
        alt="Content Banner" 
        className="content-banner"
      />
    </section>
  );
};

export default ContentSection;
