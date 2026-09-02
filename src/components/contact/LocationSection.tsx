import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  CreditCard,
  PawPrint,
  Instagram,
  ShieldCheck,
} from "lucide-react";
import { ClinicSettings } from "@/types";
import { isFilled, getSafeValue } from "@/lib/utils";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

interface LocationSectionProps {
  clinic: ClinicSettings;
}

export function LocationSection({ clinic }: LocationSectionProps) {
  const hasAddress = isFilled(clinic.address);
  const hasMaps = isFilled(clinic.mapsUrl);
  const hasHours = isFilled(clinic.openingHours);
  const hasPhone = isFilled(clinic.phone);
  const hasEmail = isFilled(clinic.email);
  const hasPayment = isFilled(clinic.paymentMethods);
  const hasSpecies = isFilled(clinic.acceptedSpecies);
  const hasInstagram = isFilled(clinic.instagram);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-900">
          Informações de Localização e Atendimento
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Fácil acesso em Inácio Monteiro, com identificação visual na esquina.
        </p>
      </div>

      {/* Foto Real da Fachada para Fácil Identificação */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-subtle group">
        <img
          src="/images/fachada-cvt.png"
          alt="Fachada da Clínica Veterinária Thieres (CVT) em Inácio Monteiro"
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <span className="text-amber-500">★★★★★</span>
            <span>4,8 no Google (322 avaliações)</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Esquina de fácil acesso</span>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        {/* Endereço e Rota */}
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-petrol-50 text-petrol-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Endereço Completo
            </span>
            <span className="font-medium text-slate-900 block mt-0.5">
              {hasAddress ? clinic.address : "Consulte nosso endereço na recepção"}
            </span>
            {hasMaps && (
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-petrol-700 hover:text-petrol-900 mt-1.5 underline"
              >
                <Navigation className="w-3.5 h-3.5" />
                Como chegar (abrir no Google Maps)
              </a>
            )}
          </div>
        </div>

        {/* Horários */}
        <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-turquoise-50 text-turquoise-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Horário de Funcionamento
            </span>
            <span className="font-medium text-slate-900 block mt-0.5">
              {hasHours ? clinic.openingHours : "Consulte os horários da recepção"}
            </span>
            <span className="text-xs text-slate-500 block mt-0.5">
              {clinic.requiresAppointment
                ? "Atendimentos preferencialmente sob agendamento prévio."
                : "Consulte disponibilidade de encaixes."}
            </span>
          </div>
        </div>

        {/* Telefones e WhatsApp */}
        <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Phone className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Canais Diretos
            </span>
            <div className="flex flex-col gap-1">
              <WhatsAppButton
                phone={clinic.whatsapp}
                message="Olá! Gostaria de falar com a recepção da clínica."
                variant="primary"
                size="sm"
                className="w-fit"
              >
                Conversar pelo WhatsApp
              </WhatsAppButton>

              <div className="flex flex-col gap-0.5 text-xs text-slate-700 font-medium pt-1">
                <a
                  href="tel:1121538100"
                  className="hover:text-petrol-800 transition-colors inline-flex items-center gap-1"
                >
                  <span>Telefone 1:</span> <strong>(11) 2153-8100</strong>
                </a>
                <a
                  href="tel:1127711586"
                  className="hover:text-petrol-800 transition-colors inline-flex items-center gap-1"
                >
                  <span>Telefone 2:</span> <strong>(11) 2771-1586</strong>
                </a>
              </div>

              {hasEmail && (
                <a
                  href={`mailto:${clinic.email}`}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  E-mail: {clinic.email}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Formas de Pagamento e Espécies */}
        {(hasPayment || hasSpecies) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
            {hasPayment && (
              <div className="bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
                  <CreditCard className="w-4 h-4 text-slate-500" />
                  <span>Pagamento:</span>
                </div>
                <div className="text-slate-600">{clinic.paymentMethods}</div>
              </div>
            )}

            {hasSpecies && (
              <div className="bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
                  <PawPrint className="w-4 h-4 text-slate-500" />
                  <span>Espécies Atendidas:</span>
                </div>
                <div className="text-slate-600">{clinic.acceptedSpecies}</div>
              </div>
            )}
          </div>
        )}

        {/* Redes Sociais */}
        {hasInstagram && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Acompanhe novidades no Instagram:</span>
            <a
              href={`https://instagram.com/${clinic.instagram!.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-petrol-700 hover:text-petrol-900"
            >
              <Instagram className="w-4 h-4" />
              <span>{clinic.instagram}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
