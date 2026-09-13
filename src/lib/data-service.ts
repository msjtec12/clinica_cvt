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
 * O fallback local é usado somente quando o Supabase não está configurado
 * ou quando a consulta falha. Uma tabela configurada e vazia deve continuar
 * vazia; caso contrário, itens removidos no painel reapareceriam do fallback.
 */
export async function getClinicSettings(): Promise<ClinicSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("clinic_settings")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.warn("Erro ao buscar clinic_settings do Supabase, usando fallback local:", error.message);
      } else if (data) {
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
      console.warn("Erro inesperado ao buscar clinic_settings, usando fallback local:", err);
    }
  }

  return defaultClinicData;
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("service_categories")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.warn("Erro ao buscar categorias do Supabase, usando fallback local:", error.message);
      } else {
        return (data ?? []).map((cat) => ({
          id: cat.id,
          slug: cat.slug,
          name: cat.name,
          description: cat.description,
          displayOrder: cat.display_order,
          isActive: cat.is_active,
        }));
      }
    } catch (err) {
      console.warn("Erro inesperado ao buscar categorias, usando fallback local:", err);
    }
  }

  return defaultCategories;
}

export async function getServices(): Promise<ServiceItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.warn("Erro ao buscar serviços do Supabase, usando fallback local:", error.message);
      } else {
        return (data ?? []).map((service) => ({
          id: service.id,
          categorySlug: service.category_slug,
          categoryName: service.category_name || service.category_slug,
          name: service.name,
          shortDescription: service.short_description,
          priceType: service.price_type,
          exactPrice: service.exact_price,
          startingPrice: service.starting_price,
          requiresEvaluation: service.requires_evaluation,
          evaluationNotes: service.evaluation_notes,
          includedItems: service.included_items || [],
          observations: service.observations,
          availability: service.availability,
          isActive: service.is_active,
          displayOrder: service.display_order,
        }));
      }
    } catch (err) {
      console.warn("Erro inesperado ao buscar serviços, usando fallback local:", err);
    }
  }

  return defaultServices;
}

export async function getFaqs(): Promise<FAQItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.warn("Erro ao buscar FAQs do Supabase, usando fallback local:", error.message);
      } else {
        return (data ?? []).map((faq) => ({
          id: faq.id,
          category: faq.category,
          categoryName: faq.category_name || faq.category,
          question: faq.question,
          answer: faq.answer,
          displayOrder: faq.display_order,
          isActive: faq.is_active,
        }));
      }
    } catch (err) {
      console.warn("Erro inesperado ao buscar FAQs, usando fallback local:", err);
    }
  }

  return defaultFaqs;
}

export async function getArticles(): Promise<ArticleItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.warn("Erro ao buscar artigos do Supabase, usando fallback local:", error.message);
      } else {
        return (data ?? []).map((article) => ({
          id: article.id,
          slug: article.slug,
          title: article.title,
          summary: article.summary,
          category: article.category,
          content: article.content,
          revisionDate: article.revision_date,
          technicalReviewerName: article.technical_reviewer_name,
          technicalReviewerCrmv: article.technical_reviewer_crmv,
          isPublished: article.is_published,
          displayOrder: article.display_order,
        }));
      }
    } catch (err) {
      console.warn("Erro inesperado ao buscar artigos, usando fallback local:", err);
    }
  }

  return defaultArticles;
}

export async function getArticleBySlug(slug: string): Promise<ArticleItem | null> {
  const all = await getArticles();
  return all.find((article) => article.slug === slug) || null;
}

export async function getCampaigns(): Promise<CampaignItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .in("status", ["active", "ended"])
        .order("display_order", { ascending: true });

      if (error) {
        console.warn("Erro ao buscar campanhas do Supabase, usando fallback local:", error.message);
      } else {
        return (data ?? []).map((campaign) => ({
          id: campaign.id,
          slug: campaign.slug,
          title: campaign.title,
          folderImageUrl: campaign.folder_image_url,
          summary: campaign.summary,
          fullDescription: campaign.full_description,
          startDate: campaign.start_date,
          endDate: campaign.end_date,
          eligibleAudience: campaign.eligible_audience,
          includedServices: campaign.included_services || [],
          realPriceOrCondition: campaign.real_price_or_condition,
          rulesAndLimitations: campaign.rules_and_limitations,
          downloadFileUrl: campaign.download_file_url,
          status: campaign.status,
          displayOrder: campaign.display_order,
        }));
      }
    } catch (err) {
      console.warn("Erro inesperado ao buscar campanhas, usando fallback local:", err);
    }
  }

  return defaultCampaigns;
}

export async function getActiveCampaigns(): Promise<CampaignItem[]> {
  const all = await getCampaigns();
  return all.filter((campaign) => campaign.status === "active");
}

export async function getCampaignBySlug(slug: string): Promise<CampaignItem | null> {
  const all = await getCampaigns();
  return all.find((campaign) => campaign.slug === slug) || null;
}
