import React, { useEffect, useState } from 'react';
import './Alert.css';

function Alert({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fade-out after 9 seconds (1 second before auto-dismiss)
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 9000);

    // Auto-dismiss after 10 seconds
    const autoDismissTimer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(autoDismissTimer);
    };
  }, [onClose]);

  return (
    <div className={`alert-container ${!isVisible ? 'fade-out' : ''}`}>
      <p>{message}</p>
      <button className="close-button" onClick={onClose}>X</button>
    </div>
  );
}

export default Alert;