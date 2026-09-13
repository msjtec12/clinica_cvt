import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  ShieldCheck,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { getClinicSettings, getArticleBySlug, getArticles } from "@/lib/data-service";
import { formatDate, isFilled } from "@/lib/utils";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { EmergencyNotice } from "@/components/common/EmergencyNotice";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const clinic = await getClinicSettings();
  const clinicName = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";

  if (!article) {
    return {
      title: "Informativo Não Encontrado",
    };
  }

  return {
    title: `${article.title} | ${clinicName}`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | Informativo Educativo`,
      description: article.summary,
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [clinic, article] = await Promise.all([
    getClinicSettings(),
    getArticleBySlug(slug),
  ]);

  if (!article) {
    notFound();
  }

  const whatsappMsg = `Olá! Li o informativo "${article.title}" no site e gostaria de agendar uma consulta para o meu pet.`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <div>
        <Link
          href="/informativos"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para todos os informativos</span>
        </Link>
      </div>

      <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-8">
        <header className="space-y-4 border-b border-slate-100 pb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-turquoise-800 bg-turquoise-50 px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>

            <div className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Última revisão: {formatDate(article.revisionDate)}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {article.summary}
          </p>

          {article.technicalReviewerName && (
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 w-fit">
              <ShieldCheck className="w-4 h-4 text-petrol-700 flex-shrink-0" />
              <span>
                Revisão técnica por: <strong>{article.technicalReviewerName}</strong>
                {article.technicalReviewerCrmv && ` • ${article.technicalReviewerCrmv}`}
              </span>
            </div>
          )}
        </header>

        <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
          {article.content}
        </div>

        <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-5 space-y-2 text-xs sm:text-sm text-amber-950">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>Aviso de Responsabilidade Médica</span>
          </div>
          <p className="leading-relaxed">
            Este texto possui finalidade estritamente orientativa e educativa. Nenhuma informação aqui contida substitui a avaliação física presencial realizada por um médico-veterinário devidamente habilitado. Não medique seu pet por conta própria.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Dúvidas sobre os cuidados do seu pet? Fale diretamente com nossa equipe.
          </div>
          <WhatsAppButton
            phone={clinic.whatsapp}
            message={whatsappMsg}
            variant="primary"
            size="md"
          >
            Falar com a clínica no WhatsApp
          </WhatsAppButton>
        </div>
      </article>

      <EmergencyNotice clinic={clinic} compact={true} />
    </div>
  );
}
