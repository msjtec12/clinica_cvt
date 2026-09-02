import React from "react";
import { Camera, FileImage } from "lucide-react";
import { cn, isFilled } from "@/lib/utils";

interface PlaceholderImageProps {
  src?: string | null;
  alt: string;
  aspectRatio?: "video" | "square" | "portrait" | "banner";
  label?: string;
  className?: string;
}

export function PlaceholderImage({
  src,
  alt,
  aspectRatio = "video",
  label = "Espaço reservado para fotografia oficial",
  className,
}: PlaceholderImageProps) {
  const hasRealImage = isFilled(src);

  const aspectClasses = {
    video: "aspect-[16/9]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    banner: "aspect-[21/9]",
  };

  if (hasRealImage) {
    return (
      <div className={cn("overflow-hidden rounded-xl bg-slate-100", aspectClasses[aspectRatio], className)}>
        {/* Usando tag img padrão para evitar conflito de host em imagens externas dinâmicas */}
        <img
          src={src!}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Placeholder elegante e honesto: não finge ser foto da clínica
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-6 text-center text-slate-500",
        aspectClasses[aspectRatio],
        className
      )}
      role="img"
      aria-label={`Espaço reservado: ${alt}`}
    >
      <div className="w-12 h-12 rounded-full bg-white shadow-subtle flex items-center justify-center text-petrol-600 mb-3 border border-slate-100">
        <Camera className="w-6 h-6 stroke-[1.5]" />
      </div>
      <p className="text-xs sm:text-sm font-medium text-slate-700 max-w-[240px]">
        {label}
      </p>
      <p className="text-[11px] text-slate-500 mt-1 max-w-[200px]">
        Fotografias reais da clínica e equipe serão adicionadas em breve.
      </p>
    </div>
  );
}
