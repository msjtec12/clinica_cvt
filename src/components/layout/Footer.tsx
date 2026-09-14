import React from "react";
import Link from "next/link";
import { Clock, Instagram, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { ClinicSettings } from "@/types";
import { isFilled } from "@/lib/utils";

interface FooterProps {
  clinic: ClinicSettings;
}

export function Footer({ clinic }: FooterProps) {
  const clinicName = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";
  const instagram = isFilled(clinic.instagram) ? clinic.instagram!.replace("@", "") : "";

  return (
    <footer className="border-t border-petrol-900 bg-petrol-950 pb-20 pt-10 text-slate-300 md:pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-9 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              {isFilled(clinic.logo) ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5">
                  <img src={clinic.logo} alt={clinicName} className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl font-bold text-white">
                  {clinicName.charAt(0)}
                </div>
              )}
              <div>
                <div className="font-bold text-white">{clinicName}</div>
                <div className="text-xs text-slate-400">Cuidado e saúde animal</div>
              </div>
            </Link>

            <p className="max-w-xl text-sm leading-relaxed text-slate-400">
              {isFilled(clinic.shortDescription)
                ? clinic.shortDescription
                : "Informações claras sobre atendimento, serviços e cuidados para facilitar a rotina dos tutores."}
            </p>

            {(isFilled(clinic.responsibleVeterinarian) || isFilled(clinic.crmv)) && (
              <div className="inline-flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-turquoise-300" />
                <div>
                  <span className="block font-semibold text-white">Responsabilidade técnica</span>
                  <span className="text-slate-400">
                    {isFilled(clinic.responsibleVeterinarian) ? clinic.responsibleVeterinarian : "Médico-veterinário responsável"}
                    {isFilled(clinic.crmv) ? ` • ${clinic.crmv}` : ""}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">Navegação</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link href="/servicos" className="hover:text-white">Serviços</Link></li>
              <li><Link href="/duvidas" className="hover:text-white">Central de Dúvidas</Link></li>
              <li><Link href="/campanhas" className="hover:text-white">Campanhas</Link></li>
              <li><Link href="/informativos" className="hover:text-white">Conteúdos educativos</Link></li>
              <li><Link href="/contato" className="hover:text-white">Contato e localização</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">Atendimento</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              {isFilled(clinic.openingHours) && (
                <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-turquoise-300"/><span>{clinic.openingHours}</span></li>
              )}
              {isFilled(clinic.address) && (
                <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-turquoise-300"/><span>{clinic.address}</span></li>
              )}
              {isFilled(clinic.phone) && (
                <li><a href={`tel:${clinic.phone!.replace(/\D/g, "")}`} className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 text-turquoise-300"/>{clinic.phone}</a></li>
              )}
              {isFilled(clinic.email) && (
                <li><a href={`mailto:${clinic.email}`} className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 text-turquoise-300"/>{clinic.email}</a></li>
              )}
              {instagram && (
                <li><a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><Instagram className="h-4 w-4 text-turquoise-300"/>@{instagram}</a></li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {clinicName}. Todos os direitos reservados.</p>
          <p className="max-w-2xl sm:text-right">
            Conteúdo educativo não substitui avaliação, diagnóstico ou prescrição médico-veterinária.
          </p>
        </div>
      </div>
    </footer>
  );
}
