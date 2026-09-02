import React from "react";
import { Metadata } from "next";
import {
  getClinicSettings,
  getServices,
  getServiceCategories,
  getFaqs,
  getCampaigns,
  getArticles,
} from "@/lib/data-service";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Painel Administrativo | Gestão da Clínica",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const [clinic, services, categories, faqs, campaigns, articles] = await Promise.all([
    getClinicSettings(),
    getServices(),
    getServiceCategories(),
    getFaqs(),
    getCampaigns(),
    getArticles(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <AdminDashboard
        initialClinic={clinic}
        initialServices={services}
        initialCategories={categories}
        initialFaqs={faqs}
        initialCampaigns={campaigns}
        initialArticles={articles}
      />
    </div>
  );
}
