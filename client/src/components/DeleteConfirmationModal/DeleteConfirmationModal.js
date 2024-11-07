import React from 'react';
import './DeleteConfirmationModal.css';

function DeleteConfirmationModal({ show, onClose, onConfirm, itemName }) {
  if (!show) {
    return null; // Do not render anything if `show` is false
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Delete Item</h2>
        <p>
          Are you sure you want to delete "<strong>{itemName}</strong>"? All contents will be permanently destroyed.
        </p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="delete-button" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;