import React from "react";
import { Metadata } from "next";
import { Stethoscope, ShieldCheck } from "lucide-react";
import {
  getClinicSettings,
  getServiceCategories,
  getServices,
} from "@/lib/data-service";
import { ServiceCatalog } from "@/components/services/ServiceCatalog";
import { EmergencyNotice } from "@/components/common/EmergencyNotice";
import { isFilled } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const clinic = await getClinicSettings();
  const name = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";
  return {
    title: "Serviços e Valores Transparentes",
    description: `Consulte os serviços veterinários oferecidos por ${name}: consultas, vacinação, exames diagnósticos, cirurgias e procedimentos com transparência total de condições e valores.`,
  };
}

export default async function ServicosPage() {
  const [clinic, categories, services] = await Promise.all([
    getClinicSettings(),
    getServiceCategories(),
    getServices(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Cabeçalho da Página */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-turquoise-50 text-turquoise-800 text-xs font-semibold">
          <Stethoscope className="w-3.5 h-3.5 text-turquoise-600" />
          <span>Catálogo Oficial de Procedimentos</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Serviços e Valores Transparentes
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Acreditamos que a confiança começa na clareza. Consulte abaixo a descrição dos procedimentos, o que está incluso em cada atendimento e as condições de valores da clínica.
        </p>
      </div>

      {/* Catálogo Interativo com Filtros e Alternância Cards/Tabela */}
      <ServiceCatalog
        categories={categories}
        services={services}
        clinic={clinic}
      />

      {/* Aviso de Urgência */}
      <EmergencyNotice clinic={clinic} />
    </div>
  );
}
