import { ClinicSettings } from "@/types";

/**
 * ==============================================================================
 * DADOS REAIS OFICIAIS DA CLÍNICA VETERINÁRIA THIERES (CVT)
 * ==============================================================================
 * Dados confirmados através do perfil oficial, cartão profissional e Google Maps:
 * - Dra. Priscila Villanova Nunes | CRMV-SP 19.394
 * - Rua Cachoeira Camaleão, 162 - Inácio Monteiro - São Paulo / SP
 * - Telefones: (11) 2153-8100 / (11) 2771-1586
 * - Avaliação real no Google: 4,8 estrelas (mais de 320 avaliações de tutores)
 * ==============================================================================
 */
export const defaultClinicData: ClinicSettings = {
  name: "Clínica Veterinária Thieres (CVT)",
  shortDescription: "Cuidado com amor, excelência e confiança para cães e gatos em Inácio Monteiro - SP. Mais de 21 anos de dedicação da Dra. Priscila Villanova Nunes.",
  logo: "/images/logo-cvt.svg",
  whatsapp: "(11) 2153-8100",
  phone: "(11) 2153-8100",
  email: "",
  address: "Rua Cachoeira Camaleão, 162 - Conj. Hab. Inácio Monteiro, São Paulo - SP, CEP 08472-150",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Clinica+Veterinaria+Thieres+Rua+Cachoeira+Camaleao+162+Inacio+Monteiro+Sao+Paulo",
  openingHours: "Segunda a Sexta das 9h30 às 17h30 | Sábados das 9h30 às 14h",
  emergencyCare: "Atendimento nos horários de funcionamento da clínica (Seg a Sex das 9h30 às 17h30 e Sábados das 9h30 às 14h). Fora desse período, consulte nossa recepção para os hospitais 24h parceiros na Zona Leste.",
  emergencyReferenceContact: "Hospitais de emergência 24h parceiros na Zona Leste (orientados na recepção)",
  acceptedSpecies: "Cães e Gatos",
  paymentMethods: "Pix, Cartões de Débito, Crédito e Dinheiro",
  instagram: "@thieresvet_",
  responsibleVeterinarian: "Dra. Priscila Villanova Nunes",
  crmv: "CRMV-SP 19.394",
  city: "São Paulo - SP",
  neighborhood: "Inácio Monteiro",
  requiresAppointment: true,
  lastPriceReviewDate: "2026-09-01",
  priceDisclaimer: "Os valores informados correspondem aos serviços básicos. Exames, medicamentos, materiais ou procedimentos complementares dependem da avaliação presencial com a Dra. Priscila Villanova e são informados previamente com total transparência.",
};
