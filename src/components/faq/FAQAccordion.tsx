"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import { FAQItem } from "@/types";
import { getWhatsAppLink } from "@/lib/utils";

interface FAQAccordionProps {
  items: FAQItem[];
  whatsapp?: string;
  allowMultiple?: boolean;
}

export function FAQAccordion({ items, whatsapp, allowMultiple = false }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || ""]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
        <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <p className="text-sm font-medium text-slate-700">Nenhuma pergunta encontrada para os filtros selecionados.</p>
        <p className="text-xs text-slate-500 mt-1">Experimente alterar os termos de busca ou consulte a clínica diretamente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const whatsappMsg = `Olá! Li a dúvida sobre "${item.question}" no site, mas ainda preciso de ajuda sobre o meu pet.`;
        const waHref = getWhatsAppLink(whatsapp, whatsappMsg);

        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-subtle transition-all"
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-petrol-600 focus:ring-inset group"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-sm sm:text-base text-slate-900 group-hover:text-petrol-900 transition-colors">
                {item.question}
              </span>
              <div
                className={`w-7 h-7 rounded-full bg-slate-100 group-hover:bg-petrol-50 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 bg-petrol-50 text-petrol-800" : "text-slate-500"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-50 space-y-4">
                <p>{item.answer}</p>

                {/* Botão discreto obrigatório: "Ainda tenho dúvida — falar com a clínica" */}
                <div className="pt-2">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-petrol-700 hover:text-petrol-900 bg-petrol-50/80 hover:bg-petrol-100/80 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ainda tenho dúvida — falar com a clínica</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
