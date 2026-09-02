"use client";

import React, { useState, useMemo } from "react";
import { Search, HelpCircle, Sparkles } from "lucide-react";
import { FAQItem } from "@/types";
import { faqCategories } from "@/data/faqsData";
import { FAQAccordion } from "./FAQAccordion";

interface FAQSearchProps {
  faqs: FAQItem[];
  whatsapp?: string;
  initialCategory?: string;
}

export function FAQSearch({ faqs, whatsapp, initialCategory = "all" }: FAQSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Campo de Busca Principal */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite sua dúvida (ex: vacina, agendamento, exames, jejum, pagamento)..."
          className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 shadow-card focus:outline-none focus:ring-2 focus:ring-petrol-600 focus:border-transparent transition-all"
          aria-label="Buscar pergunta frequente"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Pílulas de categorias de dúvidas */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === "all"
              ? "bg-petrol-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Todas as Dúvidas ({faqs.length})
        </button>

        {faqCategories.map((cat) => {
          const count = faqs.filter((f) => f.category === cat.slug).length;
          if (count === 0) return null;

          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-petrol-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Lista de Acordeão com os Resultados */}
      <div className="max-w-3xl mx-auto">
        <FAQAccordion items={filteredFaqs} whatsapp={whatsapp} allowMultiple={true} />
      </div>
    </div>
  );
}
