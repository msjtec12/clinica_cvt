import React from "react";
import Link from "next/link";
import { HeartPulse, Instagram, Phone, Mail, MapPin, Shield, Clock } from "lucide-react";
import { ClinicSettings } from "@/types";
import { isFilled, getSafeValue } from "@/lib/utils";

interface FooterProps {
  clinic: ClinicSettings;
}

export function Footer({ clinic }: FooterProps) {
  const clinicName = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";
  const hasVet = isFilled(clinic.responsibleVeterinarian);
  const hasCrmv = isFilled(clinic.crmv);
  const hasInstagram = isFilled(clinic.instagram);
  const hasPhone = isFilled(clinic.phone);
  const hasEmail = isFilled(clinic.email);
  const hasAddress = isFilled(clinic.address);
  const hasHours = isFilled(clinic.openingHours);

  return (
    <footer className="bg-petrol-950 text-slate-200 pt-12 pb-6 border-t-4 border-turquoise-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-petrol-900">
          {/* Identidade e Responsável Técnico */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-turquoise-400 rounded-2xl"
              aria-label={`Página inicial de ${clinicName}`}
            >
              <div className="bg-white px-3.5 py-2 rounded-2xl w-fit shadow-sm border border-white/20 hover:opacity-95 transition-opacity">
                <img
                  src={isFilled(clinic.logo) ? clinic.logo : "/images/logo-cvt.svg"}
                  alt={clinicName}
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isFilled(clinic.shortDescription)
                ? clinic.shortDescription
                : "Atendimento veterinário transparente, ético e humanizado para cães e gatos."}
            </p>

            {/* Responsabilidade Técnica CFMV */}
            <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/60 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-turquoise-400 font-semibold text-[11px] uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                <span>Responsabilidade Técnica</span>
              </div>
              <div className="text-slate-200 font-medium">
                {hasVet ? clinic.responsibleVeterinarian : "Médico-Veterinário Responsável"}
              </div>
              <div className="text-slate-400 text-[11px]">
                {hasCrmv ? clinic.crmv : "CRMV Sob Consulta"}
              </div>
            </div>
          </div>

          {/* Links de Acesso Rápido */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-turquoise-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="hover:text-turquoise-400 transition-colors">
                  Serviços e Valores Transparentes
                </Link>
              </li>
              <li>
                <Link href="/duvidas" className="hover:text-turquoise-400 transition-colors">
                  Central de Dúvidas (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/campanhas" className="hover:text-turquoise-400 transition-colors">
                  Campanhas & Folders Digitais
                </Link>
              </li>
              <li>
                <Link href="/informativos" className="hover:text-turquoise-400 transition-colors">
                  Informativos Educativos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-turquoise-400 transition-colors">
                  Contato e Localização
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato e Horários */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Atendimento
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {hasHours && (
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-turquoise-400 flex-shrink-0 mt-0.5" />
                  <span>{clinic.openingHours}</span>
                </li>
              )}
              {hasAddress && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-turquoise-400 flex-shrink-0 mt-0.5" />
                  <span>{clinic.address}</span>
                </li>
              )}
              {hasPhone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-turquoise-400 flex-shrink-0" />
                  <span>{clinic.phone}</span>
                </li>
              )}
              {hasEmail && (
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-turquoise-400 flex-shrink-0" />
                  <span>{clinic.email}</span>
                </li>
              )}
            </ul>

            {hasInstagram && (
              <div className="mt-4">
                <a
                  href={`https://instagram.com/${clinic.instagram!.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-turquoise-400 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{clinic.instagram}</span>
                </a>
              </div>
            )}
          </div>

          {/* Aviso Legal e Ético */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Aviso Educativo
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-800/40 p-3.5 rounded-lg border border-slate-800">
              O conteúdo deste site tem finalidade exclusivamente educativa e informativa. Conforme as normas éticas da Medicina Veterinária, não são realizados diagnósticos, consultas ou prescrições de tratamentos e medicamentos à distância. Em caso de alteração no bem-estar do seu animal, procure atendimento presencial.
            </p>
          </div>
        </div>

        {/* Faixa de Endereço Oficial igual ao Cartão e Flyer */}
        <div className="mt-8 pt-4 pb-2 border-t border-petrol-800 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-turquoise-300 uppercase">
            Rua Cachoeira do Limão, 10 - casa 2 - Inácio Monteiro - São Paulo - SP
          </p>
        </div>

        {/* Rodapé inferior */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 border-t border-petrol-900/60">
          <p>
            &copy; {new Date().getFullYear()} {clinicName}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/admin" className="hover:text-turquoise-400 transition-colors">
              Área Administrativa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
