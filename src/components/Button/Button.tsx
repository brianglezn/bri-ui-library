import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Contenido del botón
   */
  children?: React.ReactNode;
  /**
   * Tipo de variante
   */
  variant?: ButtonVariant;
  /**
   * Tamaño del botón
   */
  size?: ButtonSize;
  /**
   * Deshabilitado
   */
  disabled?: boolean;
  /**
   * Icono a mostrar
   */
  icon?: React.ReactNode;
  /**
   * Posición del icono
   */
  iconPosition?: 'left' | 'right';
  /**
   * Solo mostrar icono
   */
  iconOnly?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  iconPosition = 'left',
  iconOnly = false,
  onClick,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    icon && styles.hasIcon,
    icon && !iconOnly && styles[`icon-${iconPosition}`],
    iconOnly && styles.iconOnly,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && (iconPosition === 'left' || iconOnly) && <span className={styles.icon}>{icon}</span>}
      {!iconOnly && children}
      {icon && iconPosition === 'right' && !iconOnly && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}
