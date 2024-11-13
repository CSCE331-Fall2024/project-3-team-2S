import React, { useState } from 'react';
import './Chevron.css';  // Add your own CSS styles

function Chevron({ totalSteps, initialStep, imageUrls }) {
  // Set up state for currentStep
  const [currentStep, setCurrentStep] = useState(initialStep || 1);

  // Function to update current step
  const updateStep = (newStep) => {
    if (newStep >= 1 && newStep <= totalSteps) {
      setCurrentStep(newStep);  // Update currentStep
    }
  };

  return (
    <div className="chevron-tier">
      {/* Iterate over the total number of steps */}
      {Array.from({ length: totalSteps }, (_, index) => {
        const isCompleted = index < currentStep;  // Check if the step is completed
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
