import React from "react";
import { CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { ServiceItem } from "@/types";
import { formatCurrency, getWhatsAppLink } from "@/lib/utils";

interface PriceTableProps {
  services: ServiceItem[];
  whatsapp?: string;
}

export function PriceTable({ services, whatsapp }: PriceTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-subtle">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
            <th className="py-3.5 px-4 sm:px-6">Serviço</th>
            <th className="py-3.5 px-4">Categoria</th>
            <th className="py-3.5 px-4 hidden md:table-cell">O que inclui</th>
            <th className="py-3.5 px-4">Avaliação Prévia</th>
            <th className="py-3.5 px-4 text-right">Valor Estimado</th>
            <th className="py-3.5 px-4 sm:px-6 text-center">Contato</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {services.map((service) => {
            const whatsappMsg = `Olá! Vi na tabela do site o serviço "${service.name}" e gostaria de consultar informações e agendamento.`;
            const waHref = getWhatsAppLink(whatsapp, whatsappMsg);

            return (
              <tr key={service.id} className="hover:bg-slate-50/60 transition-colors">
                {/* Nome e descrição */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="font-bold text-slate-900">{service.name}</div>
                  <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {service.shortDescription}
                  </div>
                </td>

                {/* Categoria */}
                <td className="py-4 px-4">
                  <span className="inline-block text-[11px] font-medium text-turquoise-800 bg-turquoise-50 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    {service.categoryName}
                  </span>
                </td>

                {/* Itens inclusos (desktop) */}
                <td className="py-4 px-4 hidden md:table-cell">
                  {service.includedItems && service.includedItems.length > 0 ? (
                    <span className="text-xs text-slate-600 line-clamp-2">
                      {service.includedItems.join(" • ")}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Padrão da clínica</span>
                  )}
                </td>

                {/* Avaliação prévia */}
                <td className="py-4 px-4">
                  {service.requiresEvaluation ? (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Obrigatória
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">Direto / Triagem</span>
                  )}
                </td>

                {/* Valor */}
                <td className="py-4 px-4 text-right whitespace-nowrap">
                  {service.priceType === "exact" && service.exactPrice ? (
                    <div className="font-bold text-slate-900">
                      {formatCurrency(service.exactPrice)}
                      <span className="text-[10px] text-slate-500 block font-normal">fixo</span>
                    </div>
                  ) : service.priceType === "starting_at" && service.startingPrice ? (
                    <div className="font-bold text-slate-900">
                      <span className="text-[10px] text-slate-500 font-normal">A partir de </span>
                      {formatCurrency(service.startingPrice)}
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-petrol-700 bg-petrol-50 px-2 py-1 rounded">
                      Sob avaliação
                    </span>
                  )}
                </td>

                {/* Ação WhatsApp */}
                <td className="py-4 px-4 sm:px-6 text-center">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                    title={`Consultar ${service.name} no WhatsApp`}
                    aria-label={`Consultar ${service.name} no WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
