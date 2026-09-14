"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

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
    <div className="fixed bottom-5 right-5 z-30 hidden items-end gap-2.5 md:flex">
      {showTooltip && (
        <div className="relative max-w-[210px] rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs text-slate-800 shadow-lg">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute -right-1.5 -top-1.5 rounded-full bg-slate-200 p-0.5 text-slate-600 hover:bg-slate-300"
            aria-label="Fechar mensagem rápida"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="mb-0.5 font-medium text-slate-900">Precisa falar com a clínica?</p>
          <p className="text-[11px] leading-tight text-slate-500">
            Use o WhatsApp para informações de atendimento, horários e agendamento.
          </p>
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-300 active:scale-95"
        aria-label="Conversar com a clínica pelo WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
