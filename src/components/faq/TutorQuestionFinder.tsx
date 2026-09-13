"use client";

import React, { FormEvent, useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpenCheck,
  MessageCircle,
  Search,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { ClinicSettings, FAQItem } from "@/types";
import { getWhatsAppLink } from "@/lib/utils";

interface Props {
  faqs: FAQItem[];
  clinic: ClinicSettings;
}

type SearchResult = { item: FAQItem; score: number };

const STOP_WORDS = new Set([
  "a", "o", "as", "os", "um", "uma", "de", "da", "do", "das", "dos", "e", "ou", "em", "no", "na",
  "nos", "nas", "para", "por", "com", "sem", "que", "qual", "quais", "como", "quando", "meu", "minha", "meus",
  "minhas", "ele", "ela", "me", "eu", "pode", "posso", "devo", "preciso", "pet", "animal",
]);

const SYNONYMS: Record<string, string[]> = {
  vacina: ["vacina", "vacinas", "vacinacao", "imunizacao", "carteira", "carteirinha", "reforco"],
  verme: ["verme", "vermes", "vermifugo", "vermifugacao", "parasita", "parasitas"],
  pulga: ["pulga", "pulgas", "carrapato", "carrapatos", "antipulgas", "ectoparasita"],
  alimento: ["racao", "comida", "alimentacao", "alimento", "petisco", "dieta", "nutricao"],
  banho: ["banho", "higiene", "lavar", "secar", "pelo", "pelagem"],
  ouvido: ["ouvido", "orelha", "cera", "coceira", "otite"],
  dente: ["dente", "dentes", "boca", "halito", "escovar", "escovacao"],
  castrar: ["castrar", "castracao", "cio", "esterilizacao", "reproducao"],
  filhote: ["filhote", "filhotes", "bebe", "novo", "adotei", "adocao"],
  passeio: ["passeio", "passear", "rua", "sair", "exercicio", "atividade"],
  viagem: ["viagem", "viajar", "carro", "transporte", "caixa", "transportar"],
  microchip: ["microchip", "chip", "identificacao", "identificar", "gps"],
  consulta: ["consulta", "checkup", "check-up", "retorno", "veterinario", "avaliacao"],
  remedio: ["remedio", "medicamento", "medicacao", "dose", "dosagem", "antibiotico", "antiinflamatorio"],
  urgencia: ["urgencia", "emergencia", "socorro", "grave", "rapido", "imediato"],
};

const EMERGENCY_TERMS = [
  "falta de ar", "nao respira", "dificuldade para respirar", "lingua roxa", "convuls", "desmai", "sangramento intenso",
  "atropel", "queda alta", "veneno", "intoxic", "chumbinho", "engoliu objeto", "nao consegue urinar", "nao urina",
  "muito mole", "nao levanta", "inconsciente", "choque", "dor intensa",
];

const RESTRICTED_TERMS = [
  "qual remedio", "que remedio", "posso dar remedio", "posso dar dipirona", "posso dar paracetamol", "posso dar ibuprofeno",
  "qual dose", "que dose", "dosagem", "quantos mg", "antibiotico", "anti-inflamatorio", "antiinflamatorio", "receita",
  "prescre", "o que ele tem", "qual doenca", "diagnostico", "qual tratamento", "qual exame ele precisa", "qual exame devo fazer",
];

const EXAMPLES = [
  "Adotei um filhote. O que preciso fazer primeiro?",
  "Posso passear antes de terminar as vacinas?",
  "Como escolher a ração?",
  "Para que serve o microchip?",
];

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string) {
  const base = normalize(text).split(" ").filter((word) => word.length > 2 && !STOP_WORDS.has(word));
  const expanded = new Set(base);

  for (const word of base) {
    for (const variants of Object.values(SYNONYMS)) {
      if (variants.some((variant) => normalize(variant) === word)) {
        variants.forEach((variant) => expanded.add(normalize(variant)));
      }
    }
  }

  return [...expanded];
}

function containsAny(text: string, terms: string[]) {
  const value = normalize(text);
  return terms.some((term) => value.includes(normalize(term)));
}

function rankFaqs(query: string, faqs: FAQItem[]): SearchResult[] {
  const queryTokens = tokens(query);
  const normalizedQuery = normalize(query);

  return faqs
    .map((item) => {
      const q = normalize(item.question);
      const a = normalize(item.answer);
      const c = normalize(`${item.category} ${item.categoryName}`);
      let score = 0;

      if (q.includes(normalizedQuery) || normalizedQuery.includes(q)) score += 12;
      for (const token of queryTokens) {
        if (q.includes(token)) score += 5;
        if (c.includes(token)) score += 3;
        if (a.includes(token)) score += 1.5;
      }

      return { item, score };
    })
    .filter((result) => result.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function TutorQuestionFinder({ faqs, clinic }: Props) {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState("");

  const isEmergency = submitted ? containsAny(submitted, EMERGENCY_TERMS) : false;
  const isRestricted = submitted ? containsAny(submitted, RESTRICTED_TERMS) : false;
  const results = useMemo(() => (submitted ? rankFaqs(submitted, faqs) : []), [submitted, faqs]);

  const whatsappMessage = submitted
    ? `Olá! Usei a Central de Dúvidas do site e ainda preciso de orientação. Minha dúvida foi: ${submitted}`
    : "Olá! Gostaria de esclarecer uma dúvida sobre os cuidados com meu pet.";
  const whatsappHref = getWhatsAppLink(clinic.whatsapp, whatsappMessage);

  function submit(e: FormEvent) {
    e.preventDefault();
    const value = question.trim();
    if (value.length >= 4) setSubmitted(value);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-petrol-50 px-3 py-1 text-xs font-semibold text-petrol-800">
            <BookOpenCheck className="h-4 w-4" />
            Busca educativa segura
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">Qual é a sua dúvida sobre seu pet?</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Escreva como você falaria normalmente. O site procura a resposta em conteúdos educativos revisados, sem diagnosticar nem indicar medicamentos.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />
            <textarea
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex.: adotei um filhote e não sei quando pode passear..."
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-petrol-500 focus:bg-white focus:ring-2 focus:ring-petrol-200"
              aria-label="Digite sua dúvida sobre cuidados com o pet"
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.slice(0, 3).map((example) => (
                <button key={example} type="button" onClick={() => setQuestion(example)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-600 hover:bg-slate-50">
                  {example}
                </button>
              ))}
            </div>
            <button type="submit" disabled={question.trim().length < 4} className="inline-flex items-center justify-center gap-2 rounded-xl bg-petrol-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-petrol-800 disabled:cursor-not-allowed disabled:opacity-50">
              <Search className="h-4 w-4" /> Procurar resposta
            </button>
          </div>
        </form>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-900"><ShieldCheck className="mb-1 h-4 w-4"/><strong>Responde:</strong> prevenção, rotina, higiene, alimentação, vacinas e guarda responsável.</div>
          <div className="rounded-xl bg-amber-50 p-3 text-xs text-amber-900"><Stethoscope className="mb-1 h-4 w-4"/><strong>Não faz:</strong> diagnóstico, prescrição, dose de remédio ou indicação individual de exames.</div>
          <div className="rounded-xl bg-rose-50 p-3 text-xs text-rose-900"><AlertTriangle className="mb-1 h-4 w-4"/><strong>Urgência:</strong> o site orienta procurar atendimento e não tenta responder clinicamente.</div>
        </div>

        {submitted && (
          <div className="space-y-4 border-t border-slate-100 pt-5" aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resultado para: “{submitted}”</p>

            {isEmergency ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-950">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-700" />
                  <div className="space-y-2">
                    <h3 className="font-bold">Esse relato pode envolver uma situação que não deve ser avaliada por um site.</h3>
                    <p className="text-sm leading-relaxed">Procure atendimento médico-veterinário sem demora. Em urgências e emergências, não espere uma resposta on-line e não ofereça medicamentos por conta própria.</p>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-rose-700 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-800"><MessageCircle className="h-4 w-4"/>Contatar a clínica</a>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {isRestricted && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                    <strong>Limite de segurança:</strong> esta central não informa diagnóstico, medicamento, dose, prescrição ou quais exames um animal específico deve realizar. Isso exige avaliação de um médico-veterinário.
                  </div>
                )}

                {results.length > 0 ? (
                  <div className="space-y-3">
                    {results.map(({ item }, index) => (
                      <article key={item.id} className={`rounded-2xl border p-5 ${index === 0 ? "border-petrol-200 bg-petrol-50/50" : "border-slate-200 bg-white"}`}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-petrol-700">{index === 0 ? "Resposta mais próxima" : "Também pode ajudar"}</span>
                          <span className="rounded-full bg-white px-2 py-1 text-[10px] text-slate-500">{item.categoryName}</span>
                        </div>
                        <h3 className="font-bold text-slate-900">{item.question}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.answer}</p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
                    <p className="font-semibold text-slate-800">Ainda não temos uma resposta educativa segura para essa pergunta.</p>
                    <p className="mt-1 text-sm text-slate-600">Você pode reformular usando palavras como vacina, alimentação, banho, castração, pulgas, viagem ou primeiro pet — ou falar diretamente com a clínica.</p>
                  </div>
                )}

                <div className="flex justify-end">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-petrol-800 hover:text-petrol-950"><MessageCircle className="h-4 w-4"/>Ainda tenho dúvida — falar com a clínica</a>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
