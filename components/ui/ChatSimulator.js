import React from 'react';
import styles from './ChatSimulator.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  icon, 
  onClick, 
  className = '', 
  ...props 
}) => {
  const buttonClass = `${styles.btn} ${styles[`btn-${variant}`]} ${className}`;
  
  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {icon && <i className={icon}></i>}
      {children}
      {variant !== 'cta' && <i className="fas fa-arrow-right"></i>}
    </button>
  );
};

export default Button;