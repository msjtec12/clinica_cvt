import React from "react";
import { Metadata } from "next";
import { Megaphone, Sparkles, History } from "lucide-react";
import { getClinicSettings, getCampaigns } from "@/lib/data-service";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { EmergencyNotice } from "@/components/common/EmergencyNotice";
import { isFilled } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const clinic = await getClinicSettings();
  const name = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";
  return {
    title: "Campanhas e Ações Preventivas",
    description: `Acompanhe as campanhas vigentes e folders digitais de vacinação, check-up e prevenção de ${name}.`,
  };
}

export default async function CampanhasPage() {
  const [clinic, allCampaigns] = await Promise.all([
    getClinicSettings(),
    getCampaigns(),
  ]);

  const activeCampaigns = allCampaigns.filter((c) => c.status === "active");
  const pastCampaigns = allCampaigns.filter((c) => c.status === "ended");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Cabeçalho */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-turquoise-50 text-turquoise-800 text-xs font-semibold">
          <Megaphone className="w-3.5 h-3.5 text-turquoise-600" />
          <span>Ações Sazonais & Prevenção</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Campanhas e Folders Digitais
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Conheça nossas ações educativas e campanhas de saúde animal com regras transparentes, datas de vigência e condições de atendimento sem surpresas.
        </p>
      </div>

      {/* Seção 1: Campanhas Vigentes (Ativas) */}
      <section aria-labelledby="ativas-heading" className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Sparkles className="w-5 h-5 text-coral-600" />
          <h2 id="ativas-heading" className="text-xl font-bold text-slate-900">
            Campanhas Vigentes ({activeCampaigns.length})
          </h2>
        </div>

        {activeCampaigns.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
            <p className="text-sm font-medium text-slate-700">Não há campanhas com vagas abertas no momento.</p>
            <p className="text-xs text-slate-500 mt-1">Nossos serviços regulares de vacinação e consultas continuam disponíveis normalmente sob agendamento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCampaigns.map((camp) => (
              <CampaignCard key={camp.id} campaign={camp} />
            ))}
          </div>
        )}
      </section>

      {/* Seção 2: Histórico de Campanhas Encerradas */}
      {pastCampaigns.length > 0 && (
        <section aria-labelledby="passadas-heading" className="space-y-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <History className="w-5 h-5 text-slate-400" />
            <div>
              <h2 id="passadas-heading" className="text-lg font-bold text-slate-700">
                Histórico de Ações Anteriores ({pastCampaigns.length})
              </h2>
              <p className="text-xs text-slate-500">
                Campanhas encerradas permanecem documentadas, mas suas condições promocionais não estão mais vigentes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastCampaigns.map((camp) => (
              <CampaignCard key={camp.id} campaign={camp} />
            ))}
          </div>
        </section>
      )}

      {/* Aviso de Urgência */}
      <EmergencyNotice clinic={clinic} />
    </div>
  );
}
