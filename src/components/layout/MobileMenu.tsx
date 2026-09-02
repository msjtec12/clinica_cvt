"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, MessageCircle, ChevronRight, ShieldCheck, Phone } from "lucide-react";
import { ClinicSettings } from "@/types";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { isFilled } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  clinic: ClinicSettings;
  links: { href: string; label: string }[];
}

export function MobileMenu({ isOpen, onClose, clinic, links }: MobileMenuProps) {
  const pathname = usePathname();

  // Fechar o menu ao trocar de rota
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Bloquear rolagem do body quando aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-white/95 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
    >
      {/* Barra superior do menu móvel */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-petrol-900 text-white flex items-center justify-center font-bold text-sm">
            {isFilled(clinic.name) ? clinic.name[0] : "V"}
          </div>
          <span className="font-semibold text-slate-900 text-sm">
            {isFilled(clinic.name) ? clinic.name : "Clínica Veterinária"}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Fechar menu de navegação"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Links de navegação */}
      <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                isActive
                  ? "bg-petrol-50 text-petrol-900 font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          );
        })}

        <div className="pt-4 border-t border-slate-100 mt-4">
          <Link
            href="/admin"
            className="flex items-center justify-between px-4 py-3 rounded-xl text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              Acesso Administrativo
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          </Link>
        </div>
      </nav>

      {/* Ações de contato no rodapé do menu móvel */}
      <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
        <WhatsAppButton
          phone={clinic.whatsapp}
          message="Olá! Gostaria de tirar uma dúvida sobre o atendimento do meu pet."
          variant="primary"
          size="lg"
          className="w-full"
        >
          Falar no WhatsApp
        </WhatsAppButton>

        {isFilled(clinic.phone) && (
          <a
            href={`tel:${clinic.phone!.replace(/\D/g, "")}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-subtle hover:bg-slate-50"
          >
            <Phone className="w-4 h-4 text-slate-500" />
            Ligar: {clinic.phone}
          </a>
        )}
      </div>
    </div>
  );
}
