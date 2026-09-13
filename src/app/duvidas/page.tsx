import React from "react";
import { Metadata } from "next";
import { BookOpenCheck, ExternalLink, HelpCircle, ShieldCheck } from "lucide-react";
import { getClinicSettings, getFaqs } from "@/lib/data-service";
import { FAQSearch } from "@/components/faq/FAQSearch";
import { TutorQuestionFinder } from "@/components/faq/TutorQuestionFinder";
import { EmergencyNotice } from "@/components/common/EmergencyNotice";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { tutorEducationFaqs } from "@/data/tutorEducationData";
import { isFilled } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const clinic = await getClinicSettings();
  const name = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";
  return {
    title: "Central de Dúvidas dos Tutores",
    description: `Encontre orientações educativas sobre primeiros cuidados, alimentação, vacinação, higiene, prevenção, transporte, castração e guarda responsável em ${name}.`,
  };
}

export default async function DuvidasPage() {
  const [clinic, clinicFaqs] = await Promise.all([
    getClinicSettings(),
    getFaqs(),
  ]);

  const allFaqs = [...clinicFaqs, ...tutorEducationFaqs].filter(
    (item, index, array) =>
      array.findIndex(
        (candidate) =>
          candidate.id === item.id ||
          candidate.question.toLowerCase() === item.question.toLowerCase()
      ) === index
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-turquoise-50 text-turquoise-800 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-turquoise-600" />
          <span>Orientação educativa para tutores</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Tem uma dúvida sobre os cuidados com seu pet?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Escreva sua pergunta com suas próprias palavras. A central procura respostas em uma base educativa segura e direciona para atendimento profissional quando a dúvida exige avaliação do animal.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <TutorQuestionFinder faqs={allFaqs} clinic={clinic} />
      </div>

      <div className="max-w-5xl mx-auto grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-700" />
            <div>
              <h2 className="font-bold text-emerald-950">O que esta central pode esclarecer</h2>
              <p className="mt-1 text-sm leading-relaxed text-emerald-900/80">
                Guarda responsável, adaptação de um novo pet, rotina, alimentação geral, higiene, vacinação, prevenção de parasitas, transporte, identificação, bem-estar e preparo para consultas.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
          <div className="flex items-start gap-3">
            <BookOpenCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700" />
            <div>
              <h2 className="font-bold text-amber-950">O que exige médico-veterinário</h2>
              <p className="mt-1 text-sm leading-relaxed text-amber-900/80">
                Diagnóstico, definição de tratamento, medicamentos, dosagens, solicitação de exames e avaliação de urgência não são respondidos automaticamente. O atendimento presencial continua sendo a referência para avaliação clínica.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto border-t border-slate-200/80 pt-8">
        <h2 className="text-xl font-bold text-slate-900 text-center mb-2">
          Perguntas frequentes por assunto
        </h2>
        <p className="mb-6 text-center text-sm text-slate-500">
          Navegue por todos os conteúdos educativos e informações práticas da clínica.
        </p>
        <FAQSearch faqs={allFaqs} whatsapp={clinic.whatsapp} />
      </div>

      <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        <h2 className="font-bold text-slate-900">Critério de segurança e ética</h2>
        <p className="mt-2 leading-relaxed">
          Esta ferramenta é apenas educativa. Ela não realiza teleconsulta, diagnóstico, prescrição ou teletriagem profissional. O conteúdo segue o princípio de que avaliação clínica e decisões individualizadas pertencem ao médico-veterinário, respeitando as regras do Sistema CFMV/CRMVs.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold">
          <a href="https://www.cfmv.gov.br/resolucao-do-cfmv-regulamenta-a-telemedicina-veterinaria/comunicacao/noticias/2022/06/29/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-petrol-800 hover:text-petrol-950">
            Resolução CFMV nº 1.465/2022 <ExternalLink className="h-3 w-3" />
          </a>
          <a href="https://crmvsp.gov.br/infograficos/guarda-responsavel-uma-questao-de-saude-publica/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-petrol-800 hover:text-petrol-950">
            Guarda responsável — CRMV-SP <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-gradient-to-r from-petrol-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-card">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold">
            Sua dúvida depende do histórico ou do estado atual do pet?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Fale com a clínica para saber a forma adequada de atendimento.
          </p>
        </div>

        <WhatsAppButton
          phone={clinic.whatsapp}
          message="Olá! Consultei a Central de Dúvidas do site, mas minha pergunta depende de uma orientação da equipe."
          variant="coral"
          size="md"
          className="flex-shrink-0"
        >
          Falar com a clínica
        </WhatsAppButton>
      </div>

      <div className="max-w-3xl mx-auto">
        <EmergencyNotice clinic={clinic} />
      </div>
    </div>
  );
}
