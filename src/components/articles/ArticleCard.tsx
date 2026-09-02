import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { ArticleItem } from "@/types";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  article: ArticleItem;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
      <div className="space-y-3">
        {/* Categoria e Data */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="inline-block font-semibold text-turquoise-700 bg-turquoise-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Revisado em {formatDate(article.revisionDate)}</span>
          </div>
        </div>

        {/* Título */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group">
          <Link
            href={`/informativos/${article.slug}`}
            className="hover:text-petrol-900 transition-colors"
          >
            {article.title}
          </Link>
        </h3>

        {/* Resumo */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {article.summary}
        </p>

        {/* Revisor Técnico */}
        {article.technicalReviewerName && (
          <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-petrol-600 flex-shrink-0" />
            <span>
              Revisão: <strong>{article.technicalReviewerName}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Link de Leitura */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">Leitura educativa</span>
        <Link
          href={`/informativos/${article.slug}`}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-petrol-700 hover:text-petrol-900"
        >
          <span>Ler informativo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
