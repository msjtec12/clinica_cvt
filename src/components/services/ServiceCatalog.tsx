"use client";

import React, { useState, useMemo } from "react";
import { Search, LayoutGrid, Table as TableIcon, Calendar, Info, Filter } from "lucide-react";
import { ServiceCategory, ServiceItem, ClinicSettings } from "@/types";
import { formatDate } from "@/lib/utils";
import { ServiceCard } from "./ServiceCard";
import { PriceTable } from "./PriceTable";

interface ServiceCatalogProps {
  categories: ServiceCategory[];
  services: ServiceItem[];
  clinic: ClinicSettings;
}

export function ServiceCatalog({ categories, services, clinic }: ServiceCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  // Filtragem combinada por busca e categoria
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.includedItems.some((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" || service.categorySlug === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Barra de Aviso de Revisão e Política de Preços */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-petrol-700 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {clinic.priceDisclaimer ||
              "Valores podem variar caso haja necessidade de exames, medicamentos ou materiais adicionais prescritos durante a avaliação."}
          </p>
        </div>
        {clinic.lastPriceReviewDate && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap bg-white px-3 py-1.5 rounded-lg border border-slate-200 flex-shrink-0">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Última atualização: {formatDate(clinic.lastPriceReviewDate)}</span>
          </div>
        )}
      </div>

      {/* Controles de Busca, Filtros e Alternância de Visualização */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Campo de Busca */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por consulta, vacina, exame ou cirurgia..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-petrol-600 focus:border-transparent transition-all shadow-subtle"
            aria-label="Buscar serviço pelo nome ou descrição"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Botões de Alternância Cards / Tabela */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-xs text-slate-500 hidden sm:inline">Visualização:</span>
          <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200">
            <button
              onClick={() => setViewMode("cards")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "cards"
                  ? "bg-white text-petrol-900 shadow-sm font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              aria-label="Ver em cartões"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cartões</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "table"
                  ? "bg-white text-petrol-900 shadow-sm font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              aria-label="Ver em tabela"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabela</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pílulas de Categorias */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === "all"
              ? "bg-petrol-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Todos os Serviços ({services.length})
        </button>

        {categories.map((category) => {
          const count = services.filter((s) => s.categorySlug === category.slug).length;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.slug
                  ? "bg-petrol-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {category.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Exibição dos Serviços ou Mensagem Vazia */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-semibold text-slate-800">
            Nenhum serviço encontrado
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
            Não encontramos nenhum item para a busca &ldquo;{searchTerm}&rdquo; na categoria selecionada. Você pode consultar nossa equipe diretamente pelo WhatsApp.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="mt-4 text-xs font-medium text-petrol-700 hover:underline"
          >
            Limpar filtros de busca
          </button>
        </div>
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              whatsapp={clinic.whatsapp}
            />
          ))}
        </div>
      ) : (
        <PriceTable
          services={filteredServices}
          whatsapp={clinic.whatsapp}
        />
      )}
    </div>
  );
}
