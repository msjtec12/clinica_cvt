import React from "react";
import { Metadata } from "next";
import { HelpCircle, MessageCircle } from "lucide-react";
import { getClinicSettings, getFaqs, getServices } from "@/lib/data-service";
import { FAQSearch } from "@/components/faq/FAQSearch";
import { TutorGuidanceWizard } from "@/components/faq/TutorGuidanceWizard";
import { EmergencyNotice } from "@/components/common/EmergencyNotice";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { isFilled } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const clinic = await getClinicSettings();
  const name = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";
  return {
    title: "Central de Dúvidas e Assistente Interativo",
    description: `Tire dúvidas rápidas e use nosso questionário orientador sobre horários, vacinas, exames, cirurgias, preparo para atendimento e formas de pagamento em ${name}.`,
  };
}

export default async function DuvidasPage() {
  const [clinic, faqs, services] = await Promise.all([
    getClinicSettings(),
    getFaqs(),
    getServices(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Cabeçalho */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-turquoise-50 text-turquoise-800 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-turquoise-600" />
          <span>Suporte & Dúvidas Rápidas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Central de Dúvidas dos Tutores
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Encontre respostas rápidas para as perguntas mais comuns ou use o questionário interativo abaixo para que a gente direcione a resposta exata para você.
        </p>
      </div>

      {/* Questionário Orientador de Autoatendimento */}
      <div className="max-w-4xl mx-auto">
        <TutorGuidanceWizard clinic={clinic} services={services} />
      </div>

      {/* Divisor Visual */}
      <div className="max-w-4xl mx-auto border-t border-slate-200/80 pt-8">
        <h2 className="text-xl font-bold text-slate-900 text-center mb-6">
          Ou pesquise pelo catálogo completo de perguntas frequentes
        </h2>
        {/* Componente de Busca com Filtro de Categorias e Acordeões */}
        <FAQSearch faqs={faqs} whatsapp={clinic.whatsapp} />
      </div>

      {/* Banner de Ajuda Personalizada */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-petrol-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-card">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold">
            Não encontrou a resposta que procurava?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Nossa equipe de recepção está disponível no horário de atendimento para orientar você.
          </p>
        </div>

        <WhatsAppButton
          phone={clinic.whatsapp}
          message="Olá! Procurei na Central de Dúvidas do site e gostaria de esclarecer uma pergunta sobre o meu pet."
          variant="coral"
          size="md"
          className="flex-shrink-0"
        >
          Falar com a recepção
        </WhatsAppButton>
      </div>

      {/* Aviso de Urgência */}
      <div className="max-w-3xl mx-auto">
        <EmergencyNotice clinic={clinic} />
      </div>
    </div>
  );
}
