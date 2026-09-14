"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, HeartPulse, Phone, X } from "lucide-react";
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
  const clinicName = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";

  useEffect(() => {
    onClose();
    // O fechamento deve acontecer somente quando a rota muda.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-petrol-900 text-white">
            <HeartPulse className="h-5 w-5 text-turquoise-300" />
          </div>
          <div className="min-w-0">
            <span className="block truncate text-sm font-bold text-slate-950">{clinicName}</span>
            <span className="text-[11px] text-slate-500">Menu de navegação</span>
          </div>
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          aria-label="Fechar menu de navegação"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="Navegação móvel">
        <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Navegar
        </p>
        <div className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-petrol-50 font-semibold text-petrol-900"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight className={`h-4 w-4 ${isActive(link.href) ? "text-petrol-700" : "text-slate-300"}`} />
            </Link>
          ))}
        </div>

        <div className="mx-2 mt-6 rounded-2xl border border-petrol-100 bg-petrol-50/70 p-4">
          <p className="text-xs font-semibold text-petrol-950">Não sabe por onde começar?</p>
          <p className="mt-1 text-xs leading-relaxed text-petrol-900/70">
            Use a Central de Dúvidas para orientações gerais ou fale com a clínica para questões sobre atendimento.
          </p>
          <Link href="/duvidas" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-petrol-800">
            Abrir Central de Dúvidas <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>

      <div className="border-t border-slate-200 bg-slate-50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="grid gap-2 sm:grid-cols-2">
          <WhatsAppButton
            phone={clinic.whatsapp}
            message="Olá! Gostaria de informações sobre o atendimento do meu pet."
            variant="primary"
            size="lg"
            className="w-full"
          >
            Falar no WhatsApp
          </WhatsAppButton>

          {isFilled(clinic.phone) && (
            <a
              href={`tel:${clinic.phone!.replace(/\D/g, "")}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-subtle"
            >
              <Phone className="h-4 w-4" />
              Ligar para a clínica
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
