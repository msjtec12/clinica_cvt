import React from "react";
import { CheckCircle2, AlertCircle, Info, Calendar, ShieldCheck } from "lucide-react";
import { ServiceItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

interface ServiceCardProps {
  service: ServiceItem;
  whatsapp?: string;
}

export function ServiceCard({ service, whatsapp }: ServiceCardProps) {
  const whatsappMsg = `Olá! Vi no site o serviço "${service.name}" e gostaria de confirmar disponibilidade e orientações.`;
  const requiresClinicalQuote =
    service.requiresEvaluation || service.categorySlug === "cirurgias";

  const renderPrice = () => {
    if (requiresClinicalQuote) {
      return (
        <div className="space-y-0.5">
          <span className="text-xs text-slate-500 font-medium block">Condição de valor</span>
          <span className="text-sm font-semibold text-petrol-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Informado após avaliação
          </span>
        </div>
      );
    }

    if (service.priceType === "exact" && service.exactPrice) {
      return (
        <div className="space-y-0.5">
          <span className="text-xs text-slate-500 font-medium block">Valor informado pela clínica</span>
          <span className="text-xl font-bold text-petrol-900">
            {formatCurrency(service.exactPrice)}
          </span>
        </div>
      );
    }

    if (service.priceType === "starting_at" && service.startingPrice) {
      return (
        <div className="space-y-0.5">
          <span className="text-xs text-slate-500 font-medium block">A partir de</span>
          <span className="text-xl font-bold text-petrol-900">
            {formatCurrency(service.startingPrice)}
          </span>
        </div>
      );
    }

    return (
      <div className="space-y-0.5">
        <span className="text-xs text-slate-500 font-medium block">Condição de valor</span>
        <span className="text-base font-semibold text-petrol-800">
          Consulte a clínica
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-block text-[11px] font-semibold text-turquoise-700 bg-turquoise-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
              {service.categoryName}
            </span>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {service.name}
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          {service.shortDescription}
        </p>

        {service.requiresEvaluation && (
          <div className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50/80 p-2.5 rounded-lg border border-amber-100">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Requer avaliação prévia:</strong>{" "}
              {service.evaluationNotes ||
                "A indicação, o preparo e as condições do atendimento são definidos após avaliação do médico-veterinário."}
            </span>
          </div>
        )}

        {service.includedItems && service.includedItems.length > 0 && (
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Informações sobre o atendimento:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {service.includedItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {service.observations && (
          <div className="flex items-start gap-2 text-[11px] text-slate-500 pt-1">
            <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>{service.observations}</span>
          </div>
        )}

        {service.availability && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{service.availability}</span>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {renderPrice()}

        <WhatsAppButton
          phone={whatsapp}
          message={whatsappMsg}
          variant="primary"
          size="sm"
          className="w-full sm:w-auto"
        >
          Consultar no WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
