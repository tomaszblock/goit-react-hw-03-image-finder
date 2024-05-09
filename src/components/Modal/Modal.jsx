import React from 'react';
import css from './Modal.module.css';

export const Modal = ({ imageUrl, onClose }) => {
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={onClose}>
      <div className={css.Modal} onKeyDown={handleKeyDown}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};
