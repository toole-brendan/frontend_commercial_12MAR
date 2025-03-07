import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function ActionButton({ 
  children, 
  variant = 'secondary', 
  size = 'md', 
  icon, 
  onClick,
  className,
  disabled = false
}: ActionButtonProps) {
  const baseStyles = "flex items-center justify-center space-x-2 font-medium";
  
  const variantStyles = {
    primary: "bg-primary hover:bg-primary-600 text-white border-transparent",
    secondary: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
  };
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-5 py-2.5 text-base rounded-lg"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        "border transition-colors",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}