import {
  ClinicSettings,
  ServiceCategory,
  ServiceItem,
  FAQItem,
  ArticleItem,
  CampaignItem,
} from "@/types";
import { defaultClinicData } from "@/data/clinicData";
import { defaultCategories, defaultServices } from "@/data/servicesData";
import { defaultFaqs } from "@/data/faqsData";
import { defaultArticles } from "@/data/articlesData";
import { defaultCampaigns } from "@/data/campaignsData";
import { supabase, isSupabaseConfigured } from "./supabase/client";

/**
 * Obtém os dados e configurações da clínica.
 * Prioriza o Supabase quando configurado; caso contrário, retorna os dados estáticos seguros.
 */
export async function getClinicSettings(): Promise<ClinicSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("clinic_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return {
          name: data.name,
          shortDescription: data.short_description,
          logo: data.logo_url,
          whatsapp: data.whatsapp,
          phone: data.phone,
          email: data.email,
          address: data.address,
          mapsUrl: data.maps_url,
          openingHours: data.opening_hours,
          emergencyCare: data.emergency_care,
          emergencyReferenceContact: data.emergency_reference_contact,
          acceptedSpecies: data.accepted_species,
          paymentMethods: data.payment_methods,
          instagram: data.instagram,
          responsibleVeterinarian: data.responsible_veterinarian,
          crmv: data.crmv,
          city: data.city,
          neighborhood: data.neighborhood,
          requiresAppointment: data.requires_appointment,
          lastPriceReviewDate: data.last_price_review_date,
          priceDisclaimer: data.price_disclaimer,
        };
      }
    } catch (err) {
      console.warn("Erro ao buscar clinic_settings do Supabase, usando fallback local:", err);
    }
  }

  return defaultClinicData;
}

/**
 * Obtém as categorias de serviços
 */
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("service_categories")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((cat) => ({
          id: cat.id,
          slug: cat.slug,
          name: cat.name,
          description: cat.description,
          displayOrder: cat.display_order,
          isActive: cat.is_active,
        }));
      }
    } catch (err) {
      console.warn("Erro ao buscar categorias do Supabase:", err);
    }
  }

  return defaultCategories;
}

/**
 * Obtém o catálogo de serviços
 */
export async function getServices(): Promise<ServiceItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((s) => ({
          id: s.id,
          categorySlug: s.category_slug,
          categoryName: s.category_name || s.category_slug,
          name: s.name,
          shortDescription: s.short_description,
          priceType: s.price_type,
          exactPrice: s.exact_price,
          startingPrice: s.starting_price,
          requiresEvaluation: s.requires_evaluation,
          evaluationNotes: s.evaluation_notes,
          includedItems: s.included_items || [],
          observations: s.observations,
          availability: s.availability,
          isActive: s.is_active,
          displayOrder: s.display_order,
        }));
      }
    } catch (err) {
      console.warn("Erro ao buscar serviços do Supabase:", err);
    }
  }

  return defaultServices;
}

/**
 * Obtém as perguntas frequentes (FAQs)
 */
export async function getFaqs(): Promise<FAQItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((f) => ({
          id: f.id,
          category: f.category,
          categoryName: f.category_name || f.category,
          question: f.question,
          answer: f.answer,
          displayOrder: f.display_order,
          isActive: f.is_active,
        }));
      }
    } catch (err) {
      console.warn("Erro ao buscar FAQs do Supabase:", err);
    }
  }

  return defaultFaqs;
}

/**
 * Obtém os informativos educativos
 */
export async function getArticles(): Promise<ArticleItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((a) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          summary: a.summary,
          category: a.category,
          content: a.content,
          revisionDate: a.revision_date,
          technicalReviewerName: a.technical_reviewer_name,
          technicalReviewerCrmv: a.technical_reviewer_crmv,
          isPublished: a.is_published,
          displayOrder: a.display_order,
        }));
      }
    } catch (err) {
      console.warn("Erro ao buscar artigos do Supabase:", err);
    }
  }

  return defaultArticles;
}

/**
 * Busca um artigo pelo seu slug
 */
export async function getArticleBySlug(slug: string): Promise<ArticleItem | null> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug) || null;
}

/**
 * Obtém todas as campanhas públicas
 */
export async function getCampaigns(): Promise<CampaignItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .in("status", ["active", "ended"])
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((c) => ({
          id: c.id,
          slug: c.slug,
          title: c.title,
          folderImageUrl: c.folder_image_url,
          summary: c.summary,
          fullDescription: c.full_description,
          startDate: c.start_date,
          endDate: c.end_date,
          eligibleAudience: c.eligible_audience,
          includedServices: c.included_services || [],
          realPriceOrCondition: c.real_price_or_condition,
          rulesAndLimitations: c.rules_and_limitations,
          downloadFileUrl: c.download_file_url,
          status: c.status,
          displayOrder: c.display_order,
        }));
      }
    } catch (err) {
      console.warn("Erro ao buscar campanhas do Supabase:", err);
    }
  }

  return defaultCampaigns;
}

/**
 * Obtém somente campanhas ativas
 */
export async function getActiveCampaigns(): Promise<CampaignItem[]> {
  const all = await getCampaigns();
  return all.filter((c) => c.status === "active");
}

/**
 * Busca campanha por slug
 */
export async function getCampaignBySlug(slug: string): Promise<CampaignItem | null> {
  const all = await getCampaigns();
  return all.find((c) => c.slug === slug) || null;
}
