import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getClinicSettings } from "@/lib/data-service";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { isFilled } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const clinic = await getClinicSettings();
  const name = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";
  const city = isFilled(clinic.city) ? ` em ${clinic.city}` : "";
  const desc = isFilled(clinic.shortDescription)
    ? clinic.shortDescription
    : `Atendimento veterinário ético e transparente${city}. Consultas, vacinas, exames, cirurgias e orientações aos tutores.`;

  return {
    title: {
      default: `${name} | Cuidado e Saúde Animal${city}`,
      template: `%s | ${name}`,
    },
    description: desc,
    metadataBase: new URL("https://clinicaveterinaria.com.br"),
    openGraph: {
      title: `${name} | Atendimento Veterinário e Cuidado Animal`,
      description: desc,
      type: "website",
      locale: "pt_BR",
      siteName: name,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clinic = await getClinicSettings();

  // Schema.org para Negócio Local / Veterinária usando apenas dados reais verificados
  const schemaData: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: isFilled(clinic.name) ? clinic.name : "Clínica Veterinária",
    description: isFilled(clinic.shortDescription) ? clinic.shortDescription : undefined,
    telephone: isFilled(clinic.phone) ? clinic.phone : undefined,
  };

  if (isFilled(clinic.address)) {
    schemaData.address = {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
      addressLocality: isFilled(clinic.city) ? clinic.city : undefined,
      addressCountry: "BR",
    };
  }

  if (isFilled(clinic.openingHours)) {
    schemaData.openingHours = clinic.openingHours;
  }

  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-turquoise-100 selection:text-petrol-900">
        <Header clinic={clinic} />
        <main className="flex-1">{children}</main>
        <Footer clinic={clinic} />
        <FloatingWhatsApp phone={clinic.whatsapp} />
      </body>
    </html>
  );
}
