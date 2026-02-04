import React, { forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`${styles.container} ${className}`}>
        <label className={styles.label} htmlFor={props.id || props.name}>
          {label}
        </label>
        <input
          id={props.id || props.name}
          ref={ref}
          className={`${styles.input} ${error ? styles.error : ''}`}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
