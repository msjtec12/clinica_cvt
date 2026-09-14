"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Filter, Info, LayoutGrid, Search, Table as TableIcon } from "lucide-react";
import { ClinicSettings, ServiceCategory, ServiceItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { ServiceCard } from "./ServiceCard";
import { PriceTable } from "./PriceTable";

interface ServiceCatalogProps {
  categories: ServiceCategory[];
  services: ServiceItem[];
  clinic: ClinicSettings;
}

export function ServiceCatalog({ categories, services, clinic }: ServiceCatalogProps) {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("cat");
  const initialCategory =
    requestedCategory && categories.some((category) => category.slug === requestedCategory)
      ? requestedCategory
      : "all";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filteredServices = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        service.name.toLowerCase().includes(normalizedSearch) ||
        service.shortDescription.toLowerCase().includes(normalizedSearch) ||
        service.includedItems.some((item) => item.toLowerCase().includes(normalizedSearch));

      const matchesCategory =
        selectedCategory === "all" || service.categorySlug === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, selectedCategory]);

  const selectCategory = (slug: string) => {
    setSelectedCategory(slug);
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-4 text-xs text-slate-700 sm:flex-row sm:items-center sm:justify-between sm:p-5 sm:text-sm">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-petrol-700" />
          <p className="leading-relaxed">
            {clinic.priceDisclaimer ||
              "Alguns atendimentos dependem de avaliação médico-veterinária antes da definição de conduta, preparo e valor."}
          </p>
        </div>
        {clinic.lastPriceReviewDate && (
          <div className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Atualizado em {formatDate(clinic.lastPriceReviewDate)}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-lg flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Busque por consulta, vacina, exame..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-14 text-sm text-slate-900 shadow-subtle outline-none transition placeholder:text-slate-400 focus:border-petrol-500 focus:ring-2 focus:ring-petrol-200"
            aria-label="Buscar serviço"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-700"
            >
              Limpar
            </button>
          )}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="text-xs text-slate-500">Visualização</span>
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                viewMode === "cards" ? "bg-white font-semibold text-petrol-900 shadow-sm" : "text-slate-600"
              }`}
              aria-label="Ver serviços em cartões"
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Cartões
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                viewMode === "table" ? "bg-white font-semibold text-petrol-900 shadow-sm" : "text-slate-600"
              }`}
              aria-label="Ver serviços em tabela"
            >
              <TableIcon className="h-3.5 w-3.5" /> Tabela
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" aria-label="Filtrar serviços por categoria">
        <button
          type="button"
          onClick={() => selectCategory("all")}
          className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
            selectedCategory === "all"
              ? "bg-petrol-900 text-white shadow-sm"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          Todos ({services.length})
        </button>

        {categories.map((category) => {
          const count = services.filter((service) => service.categorySlug === category.slug).length;
          if (count === 0) return null;

          return (
            <button
              type="button"
              key={category.id}
              onClick={() => selectCategory(category.slug)}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                selectedCategory === category.slug
                  ? "bg-petrol-900 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {category.name} ({count})
            </button>
          );
        })}
      </div>

      {filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Filter className="mx-auto mb-3 h-9 w-9 text-slate-300" />
          <h3 className="font-semibold text-slate-900">Nenhum serviço encontrado</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            Tente outra palavra ou limpe os filtros para visualizar todo o catálogo.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="mt-4 text-sm font-semibold text-petrol-800 hover:text-petrol-950"
          >
            Limpar busca e filtros
          </button>
        </div>
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} whatsapp={clinic.whatsapp} />
          ))}
        </div>
      ) : (
        <PriceTable services={filteredServices} whatsapp={clinic.whatsapp} />
      )}
    </div>
  );
}
