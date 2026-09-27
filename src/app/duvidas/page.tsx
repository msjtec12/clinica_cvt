import { getClinicSettings, getFaqs } from "@/lib/data-service";
import { FAQSearch } from "@/components/faq/FAQSearch";
import { tutorEducationFaqs } from "@/data/tutorEducationData";
import { libraryFaqs } from "@/data/libraryFaqs";
import { routineFaqs } from "@/data/routineFaqs";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
export const metadata = {
  title: "Dúvidas e cuidados com seu pet",
  description:
    "Respostas rápidas sobre atendimento, horários, pagamentos, vacinas, alimentação e cuidados com cães e gatos.",
};
export default async function DuvidasPage() {
  const [clinic, custom] = await Promise.all([getClinicSettings(), getFaqs()]);
  const administrative = routineFaqs(clinic);
  // Current settings take precedence over generic fallback answers for these topics.
  const replaced = new Set(["faq-1", "faq-3", "faq-5", "faq-10"]);
  const faqs = [
    ...administrative,
    ...custom.filter((f) => !replaced.has(f.id)),
    ...libraryFaqs,
    ...tutorEducationFaqs,
  ].filter(
    (f, i, all) =>
      f.isActive &&
      all.findIndex(
        (other) =>
          other.id === f.id ||
          other.question.toLowerCase() === f.question.toLowerCase(),
      ) === i,
  );
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-petrol-950">
          Dúvidas e cuidados com seu pet
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">
          Encontre uma resposta sem precisar esperar uma mensagem. Digite uma
          palavra ou escolha um assunto abaixo.
        </p>
      </header>
      <p className="rounded-xl bg-amber-50 p-4 text-base leading-relaxed text-amber-950">
        Se o pet parece estar passando mal, procure atendimento veterinário.
        Esta página traz informações gerais e não avalia a gravidade de um caso.
      </p>
      <FAQSearch faqs={faqs} whatsapp={clinic.whatsapp} />
      <section
        className="border-t border-slate-200 pt-8"
        aria-labelledby="library-title"
      >
        <h2 id="library-title" className="text-2xl font-bold text-petrol-950">
          Biblioteca para tutores
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-700">
          Para continuar a leitura, consulte estas fontes. Os links abrem o site
          de cada instituição. Conteúdos gerais não substituem as orientações
          dadas na consulta.
        </p>
        <ul className="mt-4 space-y-3 text-base">
          <li>
            <a
              className="inline-flex min-h-12 items-center font-semibold text-petrol-900 underline underline-offset-4"
              href="https://www.msdvetmanual.com/pt/resourcespages/pet-owners-overview"
            >
              Manual MSD: cuidados com animais, em português
            </a>
          </li>
          <li>
            <a
              className="inline-flex min-h-12 items-center font-semibold text-petrol-900 underline underline-offset-4"
              href="https://wsava.org/global-guidelines/global-nutrition-guidelines/"
            >
              WSAVA: alimentação e materiais para tutores
            </a>
          </li>
          <li>
            <a
              className="inline-flex min-h-12 items-center font-semibold text-petrol-900 underline underline-offset-4"
              href="https://wsava.org/global-guidelines/vaccination-guidelines/"
            >
              WSAVA: referência sobre vacinação
            </a>
          </li>
        </ul>
        <p className="mt-3 text-sm text-slate-600">
          A WSAVA disponibiliza materiais em português dentro dessas páginas. As
          informações administrativas acompanham o cadastro da clínica.
        </p>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-bold">Ainda precisa de ajuda?</h2>
        <p className="my-3 text-base text-slate-700">
          A equipe pode esclarecer dúvidas sobre o atendimento e orientar o
          próximo passo.
        </p>
        <WhatsAppButton phone={clinic.whatsapp} size="lg">
          Falar com a equipe
        </WhatsAppButton>
      </section>
    </div>
  );
}
