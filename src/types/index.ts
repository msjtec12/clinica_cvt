export type PriceType = 'exact' | 'starting_at' | 'on_evaluation';

export interface ClinicSettings {
  name: string;
  shortDescription?: string;
  logo?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  address?: string;
  mapsUrl?: string;
  openingHours?: string;
  emergencyCare?: string;
  emergencyReferenceContact?: string;
  acceptedSpecies?: string;
  paymentMethods?: string;
  instagram?: string;
  responsibleVeterinarian?: string;
  crmv?: string;
  city?: string;
  neighborhood?: string;
  requiresAppointment?: boolean;
  lastPriceReviewDate?: string;
  priceDisclaimer?: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ServiceItem {
  id: string;
  categorySlug: string;
  categoryName: string;
  name: string;
  shortDescription: string;
  priceType: PriceType;
  exactPrice?: number | null;
  startingPrice?: number | null;
  requiresEvaluation: boolean;
  evaluationNotes?: string;
  includedItems: string[];
  observations?: string;
  availability: string;
  isActive: boolean;
  displayOrder: number;
}

export interface FAQItem {
  id: string;
  category: string;
  categoryName: string;
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  content: string; // Markdown / parágrafos educativos
  revisionDate: string;
  technicalReviewerName?: string;
  technicalReviewerCrmv?: string;
  isPublished: boolean;
  displayOrder: number;
}

export type CampaignStatus = 'draft' | 'scheduled' | 'active' | 'ended';

export interface CampaignItem {
  id: string;
  slug: string;
  title: string;
  folderImageUrl?: string;
  summary: string;
  fullDescription: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  eligibleAudience?: string;
  includedServices: string[];
  realPriceOrCondition: string;
  rulesAndLimitations: string;
  downloadFileUrl?: string;
  status: CampaignStatus;
  displayOrder: number;
}

export interface ContactFormData {
  tutorName: string;
  petName: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  honeypot?: string; // Proteção anti-spam
}
