import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { CampaignItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";

interface CampaignBannerProps {
  campaign: CampaignItem;
  whatsapp?: string;
}

export function CampaignBanner({ campaign, whatsapp }: CampaignBannerProps) {
  const whatsappMsg = `Olá! Vi no site o folder da campanha "${campaign.title}" e gostaria de agendar uma vaga para o meu pet.`;

  return (
    <section aria-label={`Campanha em destaque: ${campaign.title}`} className="my-10">
      <div className="rounded-3xl border border-teal-200/80 bg-gradient-to-br from-petrol-900 via-petrol-950 to-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-hover relative overflow-hidden">
        {/* Elemento gráfico decorativo sutil */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-turquoise-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Lado Esquerdo: Conteúdo e Regras Resumidas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-coral-500 text-white shadow-sm uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                Campanha Vigente
              </span>

              <div className="flex items-center gap-1.5 text-xs text-teal-200 bg-white/10 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-turquoise-400" />
                <span>
                  Válida de {formatDate(campaign.startDate)} até {formatDate(campaign.endDate)}
                </span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
              {campaign.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {campaign.summary}
            </p>

            {/* Condição / Preço Real */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm">
              <div className="font-semibold text-turquoise-300 mb-1">
                Condição da Campanha:
              </div>
              <div className="text-white font-medium">{campaign.realPriceOrCondition}</div>
              {campaign.rulesAndLimitations && (
                <div className="text-[11px] text-slate-300 mt-1 border-t border-white/10 pt-1">
                  Regras: {campaign.rulesAndLimitations}
                </div>
              )}
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <WhatsAppButton
                phone={whatsapp}
                message={whatsappMsg}
                variant="coral"
                size="md"
              >
                Garantir vaga pelo WhatsApp
              </WhatsAppButton>

              <Link
                href={`/campanhas/${campaign.slug}`}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg bg-white/15 hover:bg-white/20 text-white transition-colors border border-white/20"
              >
                <span>Ver folder digital completo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Lado Direito: Folder Digital Ilustrativo / Imagem */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/15 rounded-2xl p-2.5 backdrop-blur-sm shadow-xl">
              <PlaceholderImage
                src={campaign.folderImageUrl}
                alt={`Folder digital da campanha ${campaign.title}`}
                aspectRatio="portrait"
                label="Folder Oficial da Campanha"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
