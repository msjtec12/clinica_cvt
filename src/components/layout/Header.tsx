"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, Menu } from "lucide-react";
import { ClinicSettings } from "@/types";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { MobileMenu } from "./MobileMenu";
import { isFilled } from "@/lib/utils";

interface HeaderProps {
  clinic: ClinicSettings;
}

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/duvidas", label: "Dúvidas" },
  { href: "/campanhas", label: "Campanhas" },
  { href: "/informativos", label: "Conteúdos" },
  { href: "/contato", label: "Contato" },
];

export function Header({ clinic }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const clinicName = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 shadow-subtle backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
            <Link
              href="/"
              className="group flex min-w-0 items-center gap-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-petrol-600"
              aria-label={`Página inicial de ${clinicName}`}
            >
              {isFilled(clinic.logo) ? (
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white sm:h-11 sm:w-11">
                  <img src={clinic.logo} alt={clinicName} className="h-full w-full object-contain p-1" />
                </div>
              ) : (
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-petrol-900 text-white shadow-subtle sm:h-11 sm:w-11">
                  <HeartPulse className="h-5 w-5 text-turquoise-300" />
                </div>
              )}
              <div className="min-w-0">
                <span className="block truncate text-sm font-bold leading-tight text-slate-950 sm:text-base">
                  {clinicName}
                </span>
                <span className="hidden text-[11px] font-medium text-slate-500 sm:block">
                  Cuidado e saúde animal
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-petrol-50 text-petrol-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-shrink-0 items-center gap-2">
              <WhatsAppButton
                phone={clinic.whatsapp}
                message="Olá! Gostaria de informações sobre o atendimento veterinário."
                variant="primary"
                size="sm"
                className="hidden md:inline-flex"
              >
                Falar com a clínica
              </WhatsAppButton>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-petrol-600 lg:hidden"
                aria-label="Abrir menu de navegação"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        clinic={clinic}
        links={navLinks}
      />
    </>
  );
}
