"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-peach text-white shadow-soft hover:brightness-105 active:scale-95",
      secondary: "bg-lavender text-white shadow-soft hover:brightness-105 active:scale-95",
      outline: "border-2 border-peach text-peach hover:bg-peach/10 active:scale-95",
      ghost: "text-peach hover:bg-peach/10",
      glass: "glass text-foreground hover:bg-white/50",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-2.5",
      lg: "px-8 py-3.5 text-lg font-bold",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative flex items-center justify-center rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none overflow-hidden",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-2xl border-2 border-transparent bg-white px-4 py-3 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-peach focus:ring-4 focus:ring-peach/10",
            error && "border-red-400 focus:border-red-400 focus:ring-red-100",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs font-medium text-red-500 ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
