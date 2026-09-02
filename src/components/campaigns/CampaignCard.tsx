import React from "react";
import Link from "next/link";
import { Calendar, Users, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { CampaignItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";

interface CampaignCardProps {
  campaign: CampaignItem;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const isEnded = campaign.status === "ended";
  const isActive = campaign.status === "active";

  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
        isEnded
          ? "border-slate-200 opacity-85"
          : "border-slate-200/80 shadow-subtle hover:shadow-card hover:border-turquoise-300"
      }`}
    >
      <div>
        {/* Capa / Folder Imagem */}
        <div className="relative">
          <PlaceholderImage
            src={campaign.folderImageUrl}
            alt={campaign.title}
            aspectRatio="video"
            label="Folder da Ação"
            className="rounded-none border-b border-slate-100"
          />

          {/* Badge de Status */}
          <div className="absolute top-3 left-3">
            {isActive ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm">
                <CheckCircle className="w-3 h-3" />
                Campanha Ativa
              </span>
            ) : isEnded ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-700 text-slate-200 shadow-sm">
                <AlertCircle className="w-3 h-3" />
                Campanha Encerrada
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-600 text-white shadow-sm">
                Agendada
              </span>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {formatDate(campaign.startDate)} até {formatDate(campaign.endDate)}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            {campaign.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {campaign.summary}
          </p>

          {campaign.eligibleAudience && (
            <div className="flex items-start gap-1.5 text-xs text-slate-600 pt-1">
              <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Público:</strong> {campaign.eligibleAudience}
              </span>
            </div>
          )}

          {/* Preço ou aviso de encerramento */}
          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            {isEnded ? (
              <span className="text-slate-500 italic">
                Ação encerrada. Condições promocionais não estão mais vigentes.
              </span>
            ) : (
              <div>
                <span className="font-semibold text-petrol-900 block mb-0.5">
                  Condição:
                </span>
                <span className="text-slate-700">{campaign.realPriceOrCondition}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ação */}
      <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-slate-50">
        <Link
          href={`/campanhas/${campaign.slug}`}
          className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-semibold text-petrol-700 hover:text-petrol-900 group"
        >
          <span>{isEnded ? "Ver histórico da campanha" : "Abrir folder digital e regras"}</span>
          <ArrowRight className="w-4 h-4 text-petrol-600 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
