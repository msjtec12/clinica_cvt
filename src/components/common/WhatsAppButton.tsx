import React from "react";
import { MessageCircle } from "lucide-react";
import { cn, getWhatsAppLink } from "@/lib/utils";

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "coral";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
}

export function WhatsAppButton({
  phone,
  message,
  children = "Falar no WhatsApp",
  variant = "primary",
  size = "md",
  className,
  showIcon = true,
}: WhatsAppButtonProps) {
  const href = getWhatsAppLink(phone, message);

  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5 shadow-sm",
  };

  const variantStyles = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow",
    secondary:
      "bg-petrol-900 hover:bg-petrol-800 text-white focus:ring-petrol-700 shadow-sm",
    coral:
      "bg-coral-600 hover:bg-coral-700 text-white focus:ring-coral-500 shadow-sm hover:shadow",
    outline:
      "border border-emerald-600 text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-500",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      aria-label="Iniciar conversa com a clínica pelo WhatsApp"
    >
      {showIcon && <MessageCircle className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />}
      <span>{children}</span>
    </a>
  );
}
