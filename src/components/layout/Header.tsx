"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, HeartPulse, Shield } from "lucide-react";
import { ClinicSettings } from "@/types";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { MobileMenu } from "./MobileMenu";
import { isFilled } from "@/lib/utils";

interface HeaderProps {
  clinic: ClinicSettings;
}

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços & Valores" },
  { href: "/duvidas", label: "Central de Dúvidas" },
  { href: "/campanhas", label: "Campanhas" },
  { href: "/informativos", label: "Informativos" },
  { href: "/contato", label: "Contato" },
];

export function Header({ clinic }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const clinicName = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-subtle transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo / Identidade */}
            <Link
              href="/"
              className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-petrol-600 rounded-lg p-1 group"
              aria-label={`Página inicial de ${clinicName}`}
            >
              {isFilled(clinic.logo) ? (
                <img
                  src={clinic.logo}
                  alt={clinicName}
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              ) : (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-petrol-900 text-white flex items-center justify-center shadow-subtle group-hover:bg-petrol-800 transition-colors">
                  <HeartPulse className="w-5 h-5 text-turquoise-400" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-sm sm:text-base leading-tight tracking-tight">
                  {clinicName}
                </span>
                <span className="text-[11px] text-slate-500 font-normal">
                  Cuidado & Saúde Animal
                </span>
              </div>
            </Link>

            {/* Navegação Desktop */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-petrol-900 bg-petrol-50/80 font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Ações Direitas (WhatsApp & Menu Mobile) */}
            <div className="flex items-center gap-2.5">
              <WhatsAppButton
                phone={clinic.whatsapp}
                message="Olá! Gostaria de informações sobre atendimento veterinário."
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
              >
                Falar no WhatsApp
              </WhatsAppButton>

              {/* Botão Hambúrguer Mobile */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-petrol-600"
                aria-label="Abrir menu de navegação"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu gaveta responsivo */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        clinic={clinic}
        links={navLinks}
      />
    </>
  );
}
