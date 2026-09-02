"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Syringe,
  Stethoscope,
  Scissors,
  Microscope,
  CreditCard,
  ClipboardCheck,
  Dog,
  Cat,
  Sparkles,
  MessageCircle,
  ExternalLink,
  ShieldAlert,
  Clock,
  Check,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { ClinicSettings, ServiceItem } from "@/types";
import { defaultServices } from "@/data/servicesData";
import { formatCurrency, getWhatsAppLink, isFilled } from "@/lib/utils";

interface TutorGuidanceWizardProps {
  clinic: ClinicSettings;
  services?: ServiceItem[];
  className?: string;
}

type Species = "dog" | "cat" | "exotic";
type AgeGroup = "puppy" | "adult" | "senior";

interface SymptomOption {
  id: string;
  label: string;
  category: "urgent" | "clinical" | "routine";
  description?: string;
}

export function TutorGuidanceWizard({
  clinic,
  services = defaultServices,
  className,
}: TutorGuidanceWizardProps) {
  // Passos: 1 = Espécie e Porte/Raça, 2 = Faixa Etária, 3 = O que o pet está sentindo, 4 = Resultado & Serviços
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Dados coletados na triagem
  const [species, setSpecies] = useState<Species>("dog");
  const [breedType, setBreedType] = useState<string>("srd");
  const [customBreed, setCustomBreed] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("adult");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [hasUrgentFlag, setHasUrgentFlag] = useState<boolean>(false);

  // Lista de sinais e sintomas em linguagem simples que qualquer pessoa entende
  const symptomOptions: SymptomOption[] = [
    // Sinais de Urgência / Emergência
    {
      id: "respiracao_dificil",
      label: "Falta de ar, respiração muito rápida ou língua roxa",
      category: "urgent",
      description: "A barriga mexe com força para puxar o ar ou o pet parece sufocado.",
    },
    {
      id: "sangramento_convulsao",
      label: "Convulsão, desmaio ou sangramento que não para",
      category: "urgent",
      description: "O corpo treme sem controle, fica duro ou sangra sem estancar.",
    },
    {
      id: "prostracao_extrema",
      label: "Muito mole, não consegue levantar e não reage",
      category: "urgent",
      description: "Fica deitado, sem forças nem para beber água ou levantar a cabeça.",
    },
    {
      id: "nao_urina",
      label: "Tenta fazer xixi, chora de dor e não sai nada",
      category: "urgent",
      description: "Muito comum em gatos machos. É perigoso e pode travar a bexiga.",
    },
    {
      id: "suspeita_intoxicacao",
      label: "Comeu veneno, remédio de gente, planta ou objeto estranho",
      category: "urgent",
      description: "Engoliu meia, brinquedo, chumbinho, plantas da casa ou remédio humano.",
    },

    // Sintomas de Consulta Comum
    {
      id: "vomito_diarreia",
      label: "Vômito ou diarreia várias vezes no mesmo dia",
      category: "clinical",
      description: "Colocou a comida toda para fora mais de uma vez ou fezes com água/sangue.",
    },
    {
      id: "coceira_pele",
      label: "Se coçando muito, lambendo a pata ou perdendo pelo",
      category: "clinical",
      description: "Pele avermelhada, casquinhas, feridinhas ou falhas no pelo.",
    },
    {
      id: "dor_ouvido",
      label: "Dor de ouvido: balançando a cabeça ou com cheiro ruim na orelha",
      category: "clinical",
      description: "Cera preta/amarelada, chora ao coçar ou esfrega a orelha no chão.",
    },
    {
      id: "mancando_dor",
      label: "Mancando, com dor nas patinhas ou custo para levantar",
      category: "clinical",
      description: "Pisa fofo, não quer apoiar a pata ou não consegue subir no sofá/cama.",
    },
    {
      id: "falta_apetite",
      label: "Não quer comer ração ou está emagrecendo rápido",
      category: "clinical",
      description: "Rejeita comida, não quer nem petiscos favoritos e bebe pouca água.",
    },
    {
      id: "olhos_vermelhos",
      label: "Olho remelando, fechado, vermelho ou lacrimejando",
      category: "clinical",
      description: "Não consegue abrir o olho, pisca muito ou tem remela amarela/verde.",
    },

    // Prevenção e Rotina
    {
      id: "vacinas_pendentes",
      label: "Vacinas atrasadas ou primeiras vacinas do filhote",
      category: "routine",
      description: "Precisa tomar a vacina múltipla (V8/V10 para cães ou V4/V5 para gatos) ou a vacina da raiva.",
    },
    {
      id: "interesse_castracao",
      label: "Quero castrar meu pet (evitar filhotes e doenças)",
      category: "routine",
      description: "Cirurgia segura para machos ou fêmeas, evitando fugas, brigas e infecções graves.",
    },
    {
      id: "checkup_geral",
      label: "Revisão de saúde geral (Check-up / Prevenção)",
      category: "routine",
      description: "Exame geral do corpo para descobrir alterações no começo, antes de virar doença.",
    },
  ];

  const resetWizard = () => {
    setStep(1);
    setSpecies("dog");
    setBreedType("srd");
    setCustomBreed("");
    setAgeGroup("adult");
    setSelectedSymptoms([]);
    setHasUrgentFlag(false);
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];

      // Atualiza alerta de urgência se qualquer sintoma perigoso estiver marcado
      const hasAnyUrgent = next.some((item) =>
        symptomOptions.find((s) => s.id === item)?.category === "urgent"
      );
      setHasUrgentFlag(hasAnyUrgent);

      return next;
    });
  };

  // Nomes amigáveis e claros para o resumo
  const speciesText =
    species === "dog" ? "Cachorro (Cão)" : species === "cat" ? "Gato (Felino)" : "Outro Pet";

  const breedText =
    customBreed.trim() ||
    (breedType === "srd"
      ? "Sem raça definida (Vira-lata)"
      : breedType === "toy"
      ? "Porte pequeno (até 10kg)"
      : breedType === "medium"
      ? "Porte médio (10kg a 25kg)"
      : breedType === "large"
      ? "Porte grande (mais de 25kg)"
      : "Focinho achatado (Pug, Buldogue, Shih-tzu, Persa...)");

  const ageText =
    ageGroup === "puppy"
      ? "Filhote (menos de 1 ano)"
      : ageGroup === "adult"
      ? "Adulto (de 1 a 7 anos)"
      : "Idoso / Sênior (mais de 7 anos)";

  // =========================================================================
  // MATCH DIRETO COM SERVIÇOS DO CATÁLOGO DA CLÍNICA
  // =========================================================================
  const matchedServices = useMemo(() => {
    const sList: ServiceItem[] = [];

    const addService = (idOrSlug: string) => {
      const found = services.find(
        (s) =>
          s.id === idOrSlug ||
          s.categorySlug === idOrSlug ||
          s.name.toLowerCase().includes(idOrSlug.toLowerCase())
      );
      if (found && !sList.some((item) => item.id === found.id)) {
        sList.push(found);
      }
    };

    // 1. Coceira na pele ou ouvido
    if (
      selectedSymptoms.includes("dor_ouvido") ||
      selectedSymptoms.includes("coceira_pele")
    ) {
      addService("serv-8"); // Limpeza de ouvidos e curativos
      addService("serv-2"); // Especialista (dermatologia)
      addService("serv-1"); // Consulta clínica geral
    }

    // 2. Vômito, diarreia ou falta de apetite
    if (
      selectedSymptoms.includes("vomito_diarreia") ||
      selectedSymptoms.includes("falta_apetite") ||
      selectedSymptoms.includes("prostracao_extrema")
    ) {
      addService("serv-1"); // Consulta clínica geral
      addService("serv-5"); // Exame de sangue
      addService("serv-6"); // Ultrassom da barriguinha
    }

    // 3. Castração
    if (selectedSymptoms.includes("interesse_castracao")) {
      addService("serv-7"); // Castração segura
      addService("serv-5"); // Exame de sangue pré-cirúrgico
      addService("serv-1"); // Consulta clínica geral
    }

    // 4. Vacinas
    if (selectedSymptoms.includes("vacinas_pendentes")) {
      if (species === "dog") {
        addService("serv-3"); // Vacina para cães
      } else if (species === "cat") {
        addService("serv-4"); // Vacina para gatos
      }
      addService("serv-1"); // Consulta de exame antes da vacina
    }

    // 5. Check-up / Pet idoso
    if (selectedSymptoms.includes("checkup_geral") || ageGroup === "senior") {
      addService("serv-9"); // Check-up preventivo
      addService("serv-5"); // Exame de sangue
      addService("serv-1"); // Consulta clínica geral
    }

    // Padrão de segurança caso nada tenha sido marcado
    if (sList.length === 0) {
      addService("serv-1");
      if (species === "dog") addService("serv-3");
      if (species === "cat") addService("serv-4");
    }

    return sList.slice(0, 3);
  }, [services, selectedSymptoms, species, ageGroup]);

  // Nomes dos sintomas em texto corrido para o WhatsApp
  const symptomsLabels = selectedSymptoms
    .map((sId) => symptomOptions.find((opt) => opt.id === sId)?.label.split("/")[0].trim())
    .filter(Boolean)
    .join(", ");

  const recommendedServiceNames = matchedServices.map((s) => s.name).join(", ");

  const finalWhatsAppMsg = hasUrgentFlag
    ? `URGÊNCIA: Meu ${speciesText} (${breedText}, ${ageText}) está passando muito mal com sinais graves (${symptomsLabels || "sintomas graves"}). Gostaria de orientações imediatas para levar à clínica agora.`
    : `Olá! Fiz a triagem rápida no site para meu ${speciesText} (${breedText}, ${ageText}). Ele apresenta: ${symptomsLabels || "Avaliação de rotina"}. Gostaria de confirmar valores e agendar para os serviços sugeridos: ${recommendedServiceNames}.`;

  const whatsappHref = getWhatsAppLink(clinic.whatsapp, finalWhatsAppMsg);

  return (
    <div
      className={`bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 lg:p-10 ${className}`}
    >
      {/* Cabeçalho do Assistente */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-turquoise-50 text-turquoise-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-turquoise-600" />
            <span>Assistente Simples e Rápido</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Descubra o que o seu pet precisa e veja os valores da clínica
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Responda em 1 minuto sem termos difíceis. Nós mostramos os serviços certos e ajudamos você a agendar no WhatsApp.
          </p>
        </div>

        {step > 1 && (
          <button
            onClick={resetWizard}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Começar de novo</span>
          </button>
        )}
      </div>

      {/* Barra de Progresso */}
      <div className="flex items-center gap-2 py-4">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              step >= s ? "bg-petrol-800" : "bg-slate-100"
            }`}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* ETAPA 1: QUEM É O PET? */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="space-y-6 pt-2 animate-in fade-in duration-200">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-turquoise-700 uppercase tracking-wider">
              Passo 1 de 4
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Quem é o paciente que vai receber atendimento?
            </h3>
          </div>

          {/* Seleção de Espécie */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setSpecies("dog")}
              className={`flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all group ${
                species === "dog"
                  ? "border-petrol-800 bg-petrol-50/50 shadow-subtle"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                <Dog className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base">
                Cachorro (Cão)
              </span>
              <span className="text-xs text-slate-500 mt-0.5">
                De qualquer tamanho ou raça
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSpecies("cat")}
              className={`flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all group ${
                species === "cat"
                  ? "border-petrol-800 bg-petrol-50/50 shadow-subtle"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Cat className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base">
                Gato (Felino)
              </span>
              <span className="text-xs text-slate-500 mt-0.5">
                Atendimento calmo e sem medo
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSpecies("exotic")}
              className={`flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all group ${
                species === "exotic"
                  ? "border-petrol-800 bg-petrol-50/50 shadow-subtle"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                <HelpCircle className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base">
                Outro Bichinho
              </span>
              <span className="text-xs text-slate-500 mt-0.5">
                Coelho, ave ou porquinho-da-índia
              </span>
            </button>
          </div>

          {/* Seleção do Tamanho ou Raça */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Qual é o tamanho aproximado dele?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {[
                { id: "srd", label: "Vira-lata (SRD)" },
                { id: "toy", label: "Pequeno (até 10kg)" },
                { id: "medium", label: "Médio (10kg a 25kg)" },
                { id: "large", label: "Grande (mais de 25kg)" },
                { id: "brachy", label: "Focinho achatado (Pug, Buldogue, Shih-tzu...)" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBreedType(item.id)}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all text-center ${
                    breedType === item.id
                      ? "bg-petrol-900 text-white border-petrol-900 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Campo Opcional para Escrever a Raça */}
            <div className="pt-2">
              <input
                type="text"
                value={customBreed}
                onChange={(e) => setCustomBreed(e.target.value)}
                placeholder="Se quiser, digite a raça do seu pet aqui (ex: Poodle, Golden, Siamês, Pinscher...)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-petrol-600"
              />
            </div>
          </div>

          {/* Botão para Avançar */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-petrol-900 hover:bg-petrol-800 text-white font-medium text-sm transition-all shadow-subtle"
            >
              <span>Continuar para a idade</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 2: FAIXA ETÁRIA */}
      {/* ========================================================================= */}
      {step === 2 && (
        <div className="space-y-6 pt-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-turquoise-700 uppercase tracking-wider">
                Passo 2 de 4
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Qual é a idade aproximada do seu {species === "cat" ? "gatinho" : "cãozinho"}?
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => {
                setAgeGroup("puppy");
                setStep(3);
              }}
              className={`p-6 rounded-2xl border-2 text-left space-y-2 transition-all ${
                ageGroup === "puppy"
                  ? "border-petrol-800 bg-petrol-50/50"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="text-2xl">🍼</div>
              <div className="font-bold text-slate-900 text-base">
                Filhote (menos de 1 ano)
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hora de tomar as primeiras vacinas da vida, remédios de verme e aprender a comer direitinho.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setAgeGroup("adult");
                setStep(3);
              }}
              className={`p-6 rounded-2xl border-2 text-left space-y-2 transition-all ${
                ageGroup === "adult"
                  ? "border-petrol-800 bg-petrol-50/50"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="text-2xl">🐕</div>
              <div className="font-bold text-slate-900 text-base">
                Adulto (de 1 a 7 anos)
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hora de renovar as vacinas todo ano, pensar em castração e cuidar contra pulgas e carrapatos.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setAgeGroup("senior");
                setStep(3);
              }}
              className={`p-6 rounded-2xl border-2 text-left space-y-2 transition-all ${
                ageGroup === "senior"
                  ? "border-petrol-800 bg-petrol-50/50"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="text-2xl">👓</div>
              <div className="font-bold text-slate-900 text-base">
                Idoso / Sênior (mais de 7 anos)
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fase de atenção com os rins, coração, vista, dentes e dores nas juntas para não sofrer com a idade.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 3: O QUE O PET ESTÁ SENTINDO? */}
      {/* ========================================================================= */}
      {step === 3 && (
        <div className="space-y-6 pt-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-turquoise-700 uppercase tracking-wider">
                Passo 3 de 4
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                O que você está notando no seu pet ou o que gostaria de fazer?
              </h3>
              <p className="text-xs text-slate-500">
                Você pode marcar mais de uma opção com um clique.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar</span>
            </button>
          </div>

          {/* Sinais Graves de Urgência */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>⚠️ Sinais Graves (Se você notar isso, leve ao veterinário sem esperar!):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {symptomOptions
                .filter((s) => s.category === "urgent")
                .map((opt) => {
                  const isChecked = selectedSymptoms.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleSymptom(opt.id)}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                        isChecked
                          ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                          : "bg-white text-slate-800 border-rose-200 hover:border-rose-400"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center flex-shrink-0 ${
                          isChecked ? "bg-white text-rose-600" : "border border-slate-300"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold leading-tight">{opt.label}</div>
                        {opt.description && (
                          <div
                            className={`text-[11px] mt-0.5 ${
                              isChecked ? "text-rose-100" : "text-slate-500"
                            }`}
                          >
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Sintomas Comuns do Dia a Dia */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Sintomas e incômodos comuns:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {symptomOptions
                .filter((s) => s.category === "clinical")
                .map((opt) => {
                  const isChecked = selectedSymptoms.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleSymptom(opt.id)}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                        isChecked
                          ? "bg-petrol-900 text-white border-petrol-900 shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-petrol-400 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center flex-shrink-0 ${
                          isChecked ? "bg-white text-petrol-900" : "border border-slate-300"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold leading-tight">{opt.label}</div>
                        {opt.description && (
                          <div
                            className={`text-[11px] mt-0.5 ${
                              isChecked ? "text-slate-200" : "text-slate-500"
                            }`}
                          >
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Vacinas, Castração ou Check-up */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Vacinas, Castração ou Prevenção:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {symptomOptions
                .filter((s) => s.category === "routine")
                .map((opt) => {
                  const isChecked = selectedSymptoms.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleSymptom(opt.id)}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                        isChecked
                          ? "bg-turquoise-800 text-white border-turquoise-800 shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-turquoise-500 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center flex-shrink-0 ${
                          isChecked ? "bg-white text-turquoise-800" : "border border-slate-300"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold leading-tight">{opt.label}</div>
                        {opt.description && (
                          <div
                            className={`text-[11px] mt-0.5 ${
                              isChecked ? "text-teal-100" : "text-slate-500"
                            }`}
                          >
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Botão de Conclusão */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              {selectedSymptoms.length > 0
                ? `${selectedSymptoms.length} item(ns) marcado(s)`
                : "Se preferir, clique para ver a consulta geral preventiva"}
            </span>

            <button
              type="button"
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-petrol-900 hover:bg-petrol-800 text-white font-medium text-sm transition-all shadow-subtle"
            >
              <span>Ver serviços e valores recomendados</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 4: RESULTADO COM SERVIÇOS E VALORES CORRESPONDENTES */}
      {/* ========================================================================= */}
      {step === 4 && (
        <div className="space-y-6 pt-2 animate-in fade-in duration-300">
          {/* Barra Superior */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-semibold text-turquoise-700 uppercase tracking-wider">
              Orientação Personalizada
            </span>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Trocar opções marcadas</span>
            </button>
          </div>

          {/* Resumo do Pet */}
          <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Dados informados por você:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-petrol-900 text-white">
                  {speciesText}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200">
                  {breedText}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200">
                  {ageText}
                </span>
              </div>
            </div>

            {selectedSymptoms.length > 0 && (
              <div className="text-xs text-slate-600 max-w-md">
                <strong className="text-slate-800">O que você notou: </strong>
                {symptomsLabels}
              </div>
            )}
          </div>

          {/* Alerta de Urgência (se marcado algum sinal de perigo) */}
          {hasUrgentFlag && (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 text-rose-950 space-y-3">
              <div className="flex items-center gap-2 font-bold text-base text-rose-900">
                <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <span>Atenção: Seu pet pode estar em perigo!</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                Você marcou sintomas graves que pioram muito rápido. <strong>Nunca dê remédios de dor ou febre de humanos</strong> (remédios como dipirona, paracetamol ou anti-inflamatórios podem intoxicar cães e gatos gravemente). Ligue ou venha direto para a clínica para atendimento imediato.
              </p>
              <div className="pt-1 flex flex-col sm:flex-row gap-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Avisar a clínica pelo WhatsApp em Urgência</span>
                </a>
                {isFilled(clinic.phone) && (
                  <a
                    href={`tel:${clinic.phone!.replace(/\D/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-white border border-rose-200 text-rose-800 hover:bg-rose-50"
                  >
                    Ligar para a clínica: {clinic.phone}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Serviços e Valores Recomendados */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Serviços Recomendados da Clínica ({matchedServices.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Veja com transparência o que está incluso em cada atendimento e como funcionam os valores:
                </p>
              </div>

              <Link
                href="/servicos"
                className="inline-flex items-center gap-1 text-xs font-semibold text-petrol-700 hover:text-petrol-900 underline"
              >
                <span>Ver catálogo completo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Grid dos Cards de Serviços */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedServices.map((service) => {
                const serviceWaMsg = `Olá! Fiz a triagem no site para meu ${speciesText} (${breedText}, ${ageText}) e gostaria de consultar informações e marcar o serviço "${service.name}".`;
                const sWaHref = getWhatsAppLink(clinic.whatsapp, serviceWaMsg);

                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-turquoise-800 bg-turquoise-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {service.categoryName}
                        </span>
                        {service.requiresEvaluation && (
                          <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-medium">
                            Avaliação prévia
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-900 text-base leading-snug">
                        {service.name}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {service.shortDescription}
                      </p>

                      {/* O que inclui */}
                      {service.includedItems && service.includedItems.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 space-y-1.5">
                          <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
                            O que está incluso:
                          </span>
                          <ul className="space-y-1 text-xs text-slate-600">
                            {service.includedItems.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Preço e Botão */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        {service.priceType === "exact" && service.exactPrice ? (
                          <div>
                            <span className="text-[10px] text-slate-500 block">Preço fixo</span>
                            <span className="text-base font-bold text-slate-900">
                              {formatCurrency(service.exactPrice)}
                            </span>
                          </div>
                        ) : service.priceType === "starting_at" && service.startingPrice ? (
                          <div>
                            <span className="text-[10px] text-slate-500 block">A partir de</span>
                            <span className="text-base font-bold text-slate-900">
                              {formatCurrency(service.startingPrice)}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[10px] text-slate-500 block">Condição de valor</span>
                            <span className="text-xs font-semibold text-petrol-800">
                              Sob avaliação médica
                            </span>
                          </div>
                        )}
                      </div>

                      <a
                        href={sWaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Consultar</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botão de Envio Geral para o WhatsApp com Texto Completo */}
          <div className="bg-gradient-to-br from-petrol-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card">
            <div className="space-y-1 text-center sm:text-left">
              <div className="font-bold text-base sm:text-lg">
                Gostaria de agendar ou tirar dúvidas com a equipe?
              </div>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Ao clicar abaixo, nossa recepção receberá as informações do seu pet (espécie, tamanho, idade e sintomas) para responder você com rapidez no WhatsApp.
              </p>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl bg-coral-600 hover:bg-coral-700 text-white text-sm shadow-sm flex-shrink-0 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar para o WhatsApp da Clínica</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
