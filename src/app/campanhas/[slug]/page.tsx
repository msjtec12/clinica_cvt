import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClinicSettings, getCampaignBySlug, getCampaigns } from "@/lib/data-service";
import { CampaignFolder } from "@/components/campaigns/CampaignFolder";
import { EmergencyNotice } from "@/components/common/EmergencyNotice";
import { isFilled } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const campaigns = await getCampaigns();
  return campaigns.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);
  const clinic = await getClinicSettings();
  const clinicName = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";

  if (!campaign) {
    return {
      title: "Campanha Não Encontrada",
    };
  }

  return {
    title: `${campaign.title} | ${clinicName}`,
    description: campaign.summary,
    openGraph: {
      title: `${campaign.title} | Folder Digital ${clinicName}`,
      description: campaign.summary,
      type: "article",
    },
  };
}

export default async function CampaignDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [clinic, campaign] = await Promise.all([
    getClinicSettings(),
    getCampaignBySlug(slug),
  ]);

  if (!campaign) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <CampaignFolder campaign={campaign} whatsapp={clinic.whatsapp} />

      <div className="max-w-3xl mx-auto">
        <EmergencyNotice clinic={clinic} compact={true} />
      </div>
    </div>
  );
}
