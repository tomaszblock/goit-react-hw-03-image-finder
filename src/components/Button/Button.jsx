import React from 'react';
import css from './Button.module.css';

export const Button = ({ onClick, text }) => {
  return (
    <button className={css.Button} onClick={onClick}>
      {text}
    </button>
  );
};
