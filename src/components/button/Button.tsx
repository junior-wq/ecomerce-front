import React from 'react';
import './styles.css';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary'; 
}

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`button button--${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}
