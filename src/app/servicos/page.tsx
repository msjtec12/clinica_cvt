import React from "react";
import { Metadata } from "next";
import { Stethoscope } from "lucide-react";
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
    title: "Serviços e Condições de Atendimento",
    description: `Conheça os serviços veterinários oferecidos por ${name}, suas condições de atendimento e quando é necessária avaliação médico-veterinária prévia.`,
  };
}

interface ServicosPageProps {
  searchParams: Promise<{ cat?: string | string[] }>;
}

export default async function ServicosPage({ searchParams }: ServicosPageProps) {
  const [{ cat }, clinic, categories, services] = await Promise.all([
    searchParams,
    getClinicSettings(),
    getServiceCategories(),
    getServices(),
  ]);

  const initialCategory = Array.isArray(cat) ? cat[0] : cat;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-turquoise-50 px-3 py-1 text-xs font-semibold text-turquoise-800">
          <Stethoscope className="h-3.5 w-3.5 text-turquoise-600" />
          <span>Serviços da clínica</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Serviços e Condições de Atendimento
        </h1>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          Consulte os serviços disponíveis, informações gerais e formas de contato. Quando um procedimento depende de avaliação clínica, a indicação, o preparo e o valor são definidos após avaliação do médico-veterinário.
        </p>
      </div>

      <ServiceCatalog
        categories={categories}
        services={services}
        clinic={clinic}
        initialCategory={initialCategory}
      />

      <EmergencyNotice clinic={clinic} />
    </div>
  );
}
