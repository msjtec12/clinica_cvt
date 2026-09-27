import { ClinicSettings, FAQItem } from "@/types";
import { getSafeValue } from "@/lib/utils";

/** Administrative answers follow the current clinic settings, including missing data. */
export function routineFaqs(clinic: ClinicSettings): FAQItem[] {
  const rows = [
    [
      "horarios",
      "Qual é o horário de atendimento?",
      getSafeValue(
        clinic.openingHours,
        "Os horários não foram informados. Confirme com a equipe antes de sair.",
      ),
    ],
    [
      "agendamento",
      "Preciso marcar horário?",
      clinic.requiresAppointment === false
        ? "O atendimento é por ordem de chegada. Ligue antes de sair para confirmar a disponibilidade. Serviços específicos podem precisar de agendamento."
        : clinic.requiresAppointment === true
          ? "Sim. Fale com a equipe para combinar o atendimento antes de sair de casa."
          : "Confirme com a equipe se o atendimento precisa de horário marcado.",
    ],
    [
      "endereco",
      "Onde fica a clínica?",
      getSafeValue(
        clinic.address,
        "Consulte o endereço com a equipe antes de sair.",
      ),
    ],
    [
      "pagamento",
      "Quais formas de pagamento são aceitas?",
      getSafeValue(
        clinic.paymentMethods,
        "Confirme as formas de pagamento com a equipe.",
      ),
    ],
    [
      "especies",
      "Quais animais a clínica atende?",
      getSafeValue(
        clinic.acceptedSpecies,
        "Confirme com a equipe se há atendimento para a espécie do seu animal.",
      ),
    ],
    [
      "valores",
      "Onde vejo os preços de consultas e serviços?",
      "Abra Serviços no menu para consultar os valores publicados. Quando aparecer ‘Consulte a clínica’ ou ‘Informado após avaliação’, a equipe precisa confirmar o valor para o seu caso.",
    ],
  ];
  return rows.map(([id, question, answer], i) => ({
    id: `rotina-${id}`,
    question,
    answer,
    category: "rotina",
    categoryName: "Atendimento da clínica",
    displayOrder: i,
    isActive: true,
  }));
}
