"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, ShieldCheck, Siren } from "lucide-react";
import { ClinicSettings, ServiceItem } from "@/types";

interface TutorGuidanceWizardProps {
  clinic: ClinicSettings;
  services?: ServiceItem[];
  className?: string;
}

const topics = [
  "Primeiro pet",
  "Vacinas",
  "Alimentação",
  "Higiene",
  "Pulgas e carrapatos",
  "Castração",
  "Transporte",
  "Prevenção",
];

/**
 * Mantém o nome do componente por compatibilidade com a home antiga, mas não
 * realiza triagem, diagnóstico ou recomendação de exames/serviços por sintomas.
 */
export function TutorGuidanceWizard({ className }: TutorGuidanceWizardProps) {
  return (
    <section
      className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8 ${className || ""}`}
      aria-labelledby="orientacao-tutor-heading"
    >
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-petrol-50 px-3 py-1 text-xs font-semibold text-petrol-800">
            <BookOpenCheck className="h-4 w-4" />
            Orientação educativa para tutores
          </div>

          <div className="space-y-2">
            <h2 id="orientacao-tutor-heading" className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Tem uma dúvida sobre os cuidados com seu pet?
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
              Use nossa Central de Dúvidas para escrever a pergunta com suas próprias palavras. O site procura uma resposta educativa segura sobre rotina e prevenção, sem diagnosticar, prescrever medicamentos ou indicar exames para um caso específico.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Exemplos de assuntos disponíveis">
            {topics.map((topic) => (
              <span key={topic} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600">
                {topic}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/duvidas"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-petrol-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-petrol-800"
            >
              Escrever minha dúvida
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Conteúdo educativo com limites de segurança.
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5 text-rose-950">
          <div className="flex items-start gap-3">
            <Siren className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-700" />
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold">Se parecer urgente, não espere pelo site.</h3>
              <p className="text-xs leading-relaxed text-rose-900/80">
                Dificuldade para respirar, convulsão, desmaio, sangramento intenso, trauma importante, suspeita de intoxicação ou piora rápida precisam de atendimento médico-veterinário sem demora.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
