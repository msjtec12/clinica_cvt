"use client";
import { useMemo, useState } from "react";
import { FAQItem } from "@/types";
import { FAQAccordion } from "./FAQAccordion";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
const aliases: Record<string, string> = {
  pix: "pagamento",
  cartao: "pagamento",
  dinheiro: "pagamento",
  preco: "valor",
  precos: "valor",
  horario: "horario",
  racao: "alimentacao",
  vacinacao: "vacina",
};
export function FAQSearch({
  faqs,
  whatsapp,
}: {
  faqs: FAQItem[];
  whatsapp?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = useMemo(
    () =>
      Array.from(
        new Map(faqs.map((f) => [f.category, f.categoryName])).entries(),
      ),
    [faqs],
  );
  const filtered = useMemo(() => {
    const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
    return faqs.filter(
      (f) =>
        (category === "all" || f.category === category) &&
        terms.every((term) => {
          const text = normalize(`${f.question} ${f.answer} ${f.categoryName}`);
          return (
            text.includes(term) ||
            (aliases[term] && text.includes(aliases[term]))
          );
        }),
    );
  }, [faqs, query, category]);
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="faq-query" className="mb-2 block text-lg font-semibold">
          O que você quer saber?
        </label>
        <input
          id="faq-query"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCategory("all");
          }}
          placeholder="Ex.: horário, pagamento, vacina"
          className="contact-input"
        />
      </div>
      <div
        className="flex flex-wrap gap-2"
        aria-label="Assuntos mais procurados"
      >
        {["Horário", "Pagamento", "Vacina", "Alimentação"].map((label) => (
          <button
            key={label}
            type="button"
            className="action-secondary text-base"
            onClick={() => {
              setQuery(label);
              setCategory("all");
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div>
        <label
          htmlFor="faq-category"
          className="mb-2 block text-base font-semibold"
        >
          Ou escolha um assunto
        </label>
        <select
          id="faq-category"
          className="contact-input"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setQuery("");
          }}
        >
          <option value="all">Todos os assuntos</option>
          {categories.map(([slug, label]) => (
            <option key={slug} value={slug}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-base text-slate-700">
          {filtered.length}{" "}
          {filtered.length === 1
            ? "resposta encontrada"
            : "respostas encontradas"}
        </p>
        {(query || category !== "all") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="action-secondary text-base"
          >
            Ver todas as perguntas
          </button>
        )}
      </div>
      <FAQAccordion
        key={`${query}-${category}`}
        items={filtered}
        whatsapp={whatsapp}
        allowMultiple
      />
      {!filtered.length && (
        <WhatsAppButton
          phone={whatsapp}
          message={`Olá! Não encontrei uma resposta no site para: ${query}`}
          size="lg"
        >
          Pedir ajuda à equipe
        </WhatsAppButton>
      )}
    </div>
  );
}
