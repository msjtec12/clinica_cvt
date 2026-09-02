import React from "react";
import { AlertTriangle, PhoneCall, HelpCircle } from "lucide-react";
import { ClinicSettings } from "@/types";
import { isFilled } from "@/lib/utils";
import { WhatsAppButton } from "./WhatsAppButton";

interface EmergencyNoticeProps {
  clinic: ClinicSettings;
  compact?: boolean;
}

export function EmergencyNotice({ clinic, compact = false }: EmergencyNoticeProps) {
  const hasEmergencyCare = isFilled(clinic.emergencyCare);
  const hasReferenceContact = isFilled(clinic.emergencyReferenceContact);

  if (compact) {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <span className="font-semibold text-amber-950">Atenção em caso de emergência: </span>
            Se o seu pet estiver passando muito mal ou piorando rápido, ligue ou mande mensagem no WhatsApp imediatamente. Este site serve para tirar dúvidas e não substitui o veterinário examinando o animal ao vivo.
          </div>
        </div>
      </div>
    );
  }

  return (
    <section aria-labelledby="emergency-heading" className="my-8">
      <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 p-5 sm:p-7 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 id="emergency-heading" className="text-base sm:text-lg font-semibold text-slate-900">
                Aviso importante: seu pet está em perigo ou passando muito mal?
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed max-w-2xl">
                Se o seu animal estiver com falta de ar, sangrando sem parar, com convulsão, muito desmaiado ou você suspeitar de envenenamento, entre em contato imediatamente com a clínica. Não espere e nunca dê remédios de dor de pessoas por conta própria.
              </p>

              {/* Status real de atendimento de urgência */}
              <div className="pt-2 text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium text-slate-800">Status de urgência:</span>
                {hasEmergencyCare ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {clinic.emergencyCare}
                  </span>
                ) : (
                  <span className="text-slate-500 italic">
                    Consulte os horários de plantão diretamente com a clínica.
                  </span>
                )}
              </div>

              {/* Contato de referência caso informado */}
              {hasReferenceContact && (
                <div className="pt-1 text-xs text-slate-600">
                  <span className="font-medium text-slate-800">Serviço de referência informado: </span>
                  {clinic.emergencyReferenceContact}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 flex-shrink-0">
            <WhatsAppButton
              phone={clinic.whatsapp}
              message="Olá! Estou com uma dúvida urgente sobre o atendimento do meu pet."
              variant="coral"
              size="md"
            >
              Falar com a clínica agora
            </WhatsAppButton>

            {isFilled(clinic.phone) && (
              <a
                href={`tel:${clinic.phone!.replace(/\D/g, "")}`}
                className="inline-flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-slate-600" />
                Ligar: {clinic.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
