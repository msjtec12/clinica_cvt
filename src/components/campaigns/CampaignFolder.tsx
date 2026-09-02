"use client";

import React, { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  FileDown,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { CampaignItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";

interface CampaignFolderProps {
  campaign: CampaignItem;
  whatsapp?: string;
}

export function CampaignFolder({ campaign, whatsapp }: CampaignFolderProps) {
  const [copied, setCopied] = useState(false);
  const isEnded = campaign.status === "ended";

  const handleShare = async () => {
    const shareData = {
      title: campaign.title,
      text: `${campaign.title} - Confira esta campanha da clínica:`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Usuário cancelou o share nativo
      }
    } else {
      // Fallback: copiar para o clipboard
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error("Falha ao copiar URL:", err);
      }
    }
  };

  const whatsappMsg = `Olá! Vi o folder digital da campanha "${campaign.title}" no site e gostaria de confirmar vaga e orientações para o meu pet.`;

  return (
    <article className="max-w-3xl mx-auto space-y-6">
      {/* Botão de Retorno */}
      <div className="flex items-center justify-between">
        <Link
          href="/campanhas"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para todas as campanhas</span>
        </Link>

        {/* Botão Compartilhar */}
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-subtle"
          aria-label="Compartilhar campanha"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Link copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-petrol-700" />
              <span>Compartilhar campanha</span>
            </>
          )}
        </button>
      </div>

      {/* Cartão Estilo "Folder Digital" */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        {/* Imagem do Folder ou Banner */}
        <div className="relative bg-slate-900 text-white">
          <PlaceholderImage
            src={campaign.folderImageUrl}
            alt={campaign.title}
            aspectRatio="banner"
            label="Folder Digital Oficial da Campanha"
            className="rounded-none border-b border-slate-100"
          />

          <div className="absolute top-4 left-4 flex gap-2">
            {isEnded ? (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 shadow-sm">
                Campanha Encerrada
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-sm">
                Campanha Ativa
              </span>
            )}
          </div>
        </div>

        {/* Corpo do Folder */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Período e Público */}
          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-600 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-turquoise-600" />
              <span>
                <strong>Período:</strong> {formatDate(campaign.startDate)} até{" "}
                {formatDate(campaign.endDate)}
              </span>
            </div>

            {campaign.eligibleAudience && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-turquoise-600" />
                <span>
                  <strong>Público:</strong> {campaign.eligibleAudience}
                </span>
              </div>
            )}
          </div>

          {/* Título e Resumo */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              {campaign.title}
            </h1>
            <p className="text-base text-slate-700 leading-relaxed font-medium">
              {campaign.summary}
            </p>
          </div>

          {/* Descrição Completa */}
          <div className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
            <p>{campaign.fullDescription}</p>
          </div>

          {/* Serviços Incluídos */}
          {campaign.includedServices && campaign.includedServices.length > 0 && (
            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                O que está incluído nesta ação:
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {campaign.includedServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Condição de Preço ou Ação */}
          <div className="bg-gradient-to-br from-petrol-50/60 to-white rounded-2xl p-5 border border-petrol-100 space-y-2">
            <div className="text-xs font-semibold text-petrol-800 uppercase tracking-wider">
              Condição Real da Campanha:
            </div>
            {isEnded ? (
              <div className="text-sm text-slate-500 italic">
                Esta ação foi encerrada. O valor ou benefício anunciado vigorou exclusivamente entre {formatDate(campaign.startDate)} e {formatDate(campaign.endDate)}.
              </div>
            ) : (
              <div className="text-lg font-bold text-petrol-900">
                {campaign.realPriceOrCondition}
              </div>
            )}
          </div>

          {/* Regras e Limitações */}
          <div className="rounded-xl bg-amber-50/60 border border-amber-200/70 p-4 text-xs text-amber-950 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Regras e Limitações Importantes:</span>
            </div>
            <p className="leading-relaxed pl-5">
              {campaign.rulesAndLimitations}
            </p>
          </div>

          {/* Download de Arquivo Opcional */}
          {campaign.downloadFileUrl && (
            <div className="pt-2">
              <a
                href={campaign.downloadFileUrl}
                download
                className="inline-flex items-center gap-2 text-xs font-medium text-petrol-700 hover:text-petrol-900 underline"
              >
                <FileDown className="w-4 h-4" />
                <span>Baixar regulamento / folder em PDF</span>
              </a>
            </div>
          )}

          {/* Ação de Agendamento */}
          {!isEnded && (
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Vagas sujeitas à disponibilidade de agenda da equipe técnica.
              </div>
              <WhatsAppButton
                phone={whatsapp}
                message={whatsappMsg}
                variant="coral"
                size="lg"
              >
                Garantir vaga pelo WhatsApp
              </WhatsAppButton>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
