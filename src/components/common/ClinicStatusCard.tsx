import React from "react";
import { Clock, MapPin, CalendarCheck, ShieldAlert, Navigation } from "lucide-react";
import { ClinicSettings } from "@/types";
import { isFilled, getSafeValue } from "@/lib/utils";

interface ClinicStatusCardProps {
  clinic: ClinicSettings;
}

export function ClinicStatusCard({ clinic }: ClinicStatusCardProps) {
  const hasHours = isFilled(clinic.openingHours);
  const hasAddress = isFilled(clinic.address);
  const hasEmergency = isFilled(clinic.emergencyCare);
  const hasMaps = isFilled(clinic.mapsUrl);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-card hover:shadow-hover transition-shadow">
      <div className="border-b border-slate-100 pb-4 mb-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-petrol-900 font-semibold text-base sm:text-lg">
          <CalendarCheck className="w-5 h-5 text-turquoise-600" />
          <span>Informações de Atendimento</span>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          Dados verificados
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-sm">
        {/* Horário de Atendimento */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-petrol-50 flex items-center justify-center flex-shrink-0 text-petrol-700 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Horários
            </div>
            <div className="font-medium text-slate-900 mt-0.5">
              {hasHours ? clinic.openingHours : "Consulte os horários da recepção"}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {clinic.requiresAppointment
                ? "Atendimento preferencialmente sob agendamento"
                : "Consulte a disponibilidade de encaixe"}
            </div>
          </div>
        </div>

        {/* Localização */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-turquoise-50 flex items-center justify-center flex-shrink-0 text-turquoise-700 mt-0.5">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Endereço
            </div>
            <div className="font-medium text-slate-900 mt-0.5">
              {hasAddress ? clinic.address : "Consulte o endereço completo"}
            </div>
            {hasMaps && (
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-petrol-700 hover:text-petrol-900 font-medium mt-1 underline"
              >
                <Navigation className="w-3 h-3" />
                Abrir rota no Maps
              </a>
            )}
          </div>
        </div>

        {/* Status Real de Urgência */}
        <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-700 mt-0.5">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Atendimento de Urgência
            </div>
            <div className="font-medium text-slate-900 mt-0.5">
              {hasEmergency
                ? clinic.emergencyCare
                : "Consulte a disponibilidade para urgências"}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Nunca hesite em ligar antes de se deslocar em caso crítico
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
