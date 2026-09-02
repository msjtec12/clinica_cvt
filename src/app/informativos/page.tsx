import React from "react";
import { Metadata } from "next";
import { BookOpen, ShieldCheck } from "lucide-react";
import { getClinicSettings, getArticles } from "@/lib/data-service";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { EmergencyNotice } from "@/components/common/EmergencyNotice";
import { isFilled } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const clinic = await getClinicSettings();
  const name = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";
  return {
    title: "Informativos e Biblioteca Educativa",
    description: `Orientações educativas revisadas por médicos-veterinários sobre preparo para consultas, vacinação, cuidados pós-operatórios e bem-estar em ${name}.`,
  };
}

export default async function InformativosPage() {
  const [clinic, articles] = await Promise.all([
    getClinicSettings(),
    getArticles(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Cabeçalho */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-turquoise-50 text-turquoise-800 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-turquoise-600" />
          <span>Biblioteca Educativa para Tutores</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Informativos e Orientações Técnicas
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Materiais elaborados em linguagem acessível e revisados pela equipe veterinária para ajudar você a cuidar do seu animal no dia a dia.
        </p>
      </div>

      {/* Grid de Artigos Educativos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Aviso Legal sobre Orientações Médicas */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-xs text-slate-600 leading-relaxed max-w-4xl space-y-1">
        <span className="font-semibold text-slate-800 block">
          Nota de Responsabilidade Técnica:
        </span>
        <p>
          Os artigos publicados nesta biblioteca possuem caráter puramente educativo e não constituem consulta médica veterinária, diagnóstico nem prescrição de tratamentos. O organismo de cada paciente é único. Em caso de dúvidas sobre a saúde do seu pet, agende uma avaliação presencial.
        </p>
      </div>

      {/* Aviso de Urgência */}
      <EmergencyNotice clinic={clinic} />
    </div>
  );
}
