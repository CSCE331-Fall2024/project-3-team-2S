import React, { useState } from 'react';
import './Chevron.css';  // Add your own CSS styles

/**
 * Chevron component for displaying a series of steps with optional images.
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.totalSteps - The total number of steps.
 * @param {string[]} props.imageUrls - An array of image URLs for completed steps.
 */
function Chevron({ totalSteps, imageUrls }) {

  return (
    <div className="chevron-tier">
      {/* Iterate over the total number of steps */}
      {Array.from({ length: totalSteps }, (_, index) => {
        const isCompleted = index < imageUrls.length;  // Check if the step is completed
        return (
          <div
            key={index}
            className={`chevron
               ${isCompleted ? 'completed' : 'incomplete'}`}
          >
            {isCompleted && imageUrls[index] && (
              <img src={imageUrls[index]} alt={`Step ${index + 1}`} className="chevron-image" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Chevron;
