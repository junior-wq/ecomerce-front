import React from 'react';
import './styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  fullWidth?:boolean 
}

export default function Button({fullWidth, label, onClick, variant = 'primary',...otherProps }: ButtonProps) {
  return (
    <button 
        className={
          fullWidth?`button button--${variant} button--full-width`:`button button--${variant}`}
        onClick={onClick} {...otherProps}>
      {label}
    </button>
  );
}
