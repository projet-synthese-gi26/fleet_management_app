import React from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger";
  children: React.ReactNode;
}

export const Button = ({
  isLoading,
  variant = "primary",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "flex items-center justify-center rounded-lg px-5 h-12 text-base font-bold transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary hover:bg-primary-hover text-white shadow-sm",
    secondary:
      "bg-background-secondary hover:bg-background-tertiary text-text-primary",
    outline:
      "border border-border-default hover:bg-background-secondary text-text-primary",
    danger: "bg-error hover:bg-error-light text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Spinner
            size="sm"
            color={
              variant === "primary" || variant === "danger"
                ? "white"
                : "primary"
            }
          />
          <span>Chargement...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
