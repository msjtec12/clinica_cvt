import { FAQItem } from "@/types";
const nutrition = {
  label: "WSAVA — Nutrição",
  url: "https://wsava.org/global-guidelines/global-nutrition-guidelines/",
};
/** Original short summaries, not copies of the source articles. */
export const libraryFaqs: FAQItem[] = [
  {
    id: "biblioteca-rotulo",
    category: "alimentacao",
    categoryName: "Alimentação e água",
    question: "Só a lista de ingredientes diz se a ração é boa?",
    answer:
      "Não. A lista de ingredientes, sozinha, não mostra a qualidade nutricional do alimento. Leve o rótulo à consulta para conversar sobre a escolha adequada ao seu pet.",
    source: nutrition,
    displayOrder: 90,
    isActive: true,
  },
  {
    id: "biblioteca-dieta",
    category: "alimentacao",
    categoryName: "Alimentação e água",
    question: "O que anotar sobre a alimentação antes da consulta?",
    answer:
      "Anote qual alimento o pet recebe, as quantidades, os horários e os petiscos. Essas informações ajudam a equipe a avaliar a alimentação.",
    source: nutrition,
    displayOrder: 91,
    isActive: true,
  },
  {
    id: "biblioteca-peso",
    category: "alimentacao",
    categoryName: "Alimentação e água",
    question:
      "O peso na balança é suficiente para avaliar a condição corporal?",
    answer:
      "A avaliação também considera a condição corporal e muscular. A WSAVA oferece ferramentas para ajudar a equipe veterinária nessa avaliação durante a consulta.",
    source: nutrition,
    displayOrder: 92,
    isActive: true,
  },
];
