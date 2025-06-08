import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  /**
   * Contenido del botón
   */
  children: React.ReactNode;
  /**
   * Tipo de variante
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Tamaño del botón
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Deshabilitado
   */
  disabled?: boolean;
  /**
   * Función onClick
   */
  onClick?: () => void;
}

export  default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
