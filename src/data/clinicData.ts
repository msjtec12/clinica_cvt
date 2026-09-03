import { ClinicSettings } from "@/types";

/**
 * ==============================================================================
 * DADOS REAIS OFICIAIS DA CLÍNICA VETERINÁRIA THIERES (CVT)
 * ==============================================================================
 * Atualizado com base no material institucional oficial (flyer e banner):
 * - Slogan: "Cuidar é o nosso compromisso! ❤️"
 * - Endereço oficial: Rua Cachoeira do Limão, 10 - casa 2 - Inácio Monteiro, São Paulo - SP
 * - Telefone principal: (11) 2153-8100 / (11) 2771-1586
 * - Modelo de atendimento: Atendimento por ordem de chegada
 * - Horários: Segunda a Sexta das 9:30h às 17:30h | Sábado das 9:30h às 14h
 * - Aviso da clínica: "Se possível, ligue antes para confirmar o atendimento, pois pode haver alteração no horário."
 * ==============================================================================
 */
export const defaultClinicData: ClinicSettings = {
  name: "Clínica Veterinária Thieres (CVT)",
  shortDescription: "Cuidar é o nosso compromisso! Atendimento com amor e dedicação para cães e gatos em Inácio Monteiro pela Dra. Priscila Villanova Nunes.",
  logo: "/images/logo-cvt.svg",
  whatsapp: "(11) 2153-8100",
  phone: "(11) 2153-8100",
  email: "",
  address: "Rua Cachoeira do Limão, 10 - casa 2 - Inácio Monteiro, São Paulo - SP",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Clinica+Veterinaria+Thieres+Rua+Cachoeira+do+Limao+10+Inacio+Monteiro+Sao+Paulo",
  openingHours: "Segunda a Sexta-feira das 9:30h às 17:30h | Sábados das 9:30h às 14h",
  emergencyCare: "Atendimento por ordem de chegada no horário de funcionamento (Seg a Sex 9:30h às 17:30h e Sáb 9:30h às 14h). Se possível, ligue antes para confirmar o atendimento.",
  emergencyReferenceContact: "Hospitais de emergência 24h parceiros na Zona Leste (orientados na recepção)",
  acceptedSpecies: "Cães e Gatos",
  paymentMethods: "Pix, Cartões de Débito, Crédito e Dinheiro",
  instagram: "@thieresvet_",
  responsibleVeterinarian: "Dra. Priscila Villanova Nunes",
  crmv: "CRMV-SP 19.394",
  city: "São Paulo - SP",
  neighborhood: "Inácio Monteiro",
  requiresAppointment: false, // Atendimento por ordem de chegada!
  lastPriceReviewDate: "2026-09-01",
  priceDisclaimer: "Os valores informados correspondem aos serviços básicos. Exames, medicamentos, materiais ou procedimentos complementares dependem da avaliação presencial com a Dra. Priscila Villanova e são informados previamente com total transparência.",
};
