"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppLink, isFilled } from "@/lib/utils";

interface FloatingWhatsAppProps {
  phone?: string;
  defaultMessage?: string;
}

export function FloatingWhatsApp({
  phone,
  defaultMessage = "Olá! Acessei o site e gostaria de tirar uma dúvida sobre o atendimento do meu pet.",
}: FloatingWhatsAppProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const href = getWhatsAppLink(phone, defaultMessage);

  return (
    <div className="fixed bottom-5 right-5 z-30 flex items-end gap-2.5">
      {/* Balão explicativo discreto */}
      {showTooltip && (
        <div className="bg-white text-slate-800 text-xs px-3 py-2 rounded-xl shadow-lg border border-slate-100 max-w-[200px] animate-in fade-in slide-in-from-bottom-2 duration-150 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full p-0.5"
            aria-label="Fechar mensagem rápida"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-medium text-slate-900 mb-0.5">Dúvidas rápidas?</p>
          <p className="text-slate-500 text-[11px] leading-tight">
            Nossa recepção responde pelo WhatsApp no horário de atendimento.
          </p>
        </div>
      )}

      {/* Botão flutuante principal */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 active:scale-95"
        aria-label="Conversar com a clínica pelo WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
