import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { getClinicSettings } from "@/lib/data-service";
import { LocationSection } from "@/components/contact/LocationSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { EmergencyNotice } from "@/components/common/EmergencyNotice";
import { isFilled } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const clinic = await getClinicSettings();
  const name = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";
  return {
    title: "Contato e Localização",
    description: `Fale com ${name} pelo WhatsApp, telefone ou envie sua dúvida pelo formulário. Confira nosso endereço, horários de atendimento e rotas no Google Maps.`,
  };
}

export default async function ContatoPage() {
  const clinic = await getClinicSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Cabeçalho */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-turquoise-50 text-turquoise-800 text-xs font-semibold">
          <Phone className="w-3.5 h-3.5 text-turquoise-600" />
          <span>Canais de Atendimento</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Fale Conosco e Encontre a Clínica
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Estamos prontos para atender você e seu pet. Utilize o WhatsApp para agendamentos rápidos ou consulte nossos dados e formulário abaixo.
        </p>
      </div>

      {/* Grid: Informações de Localização e Formulário de Contato */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 space-y-6">
          <LocationSection clinic={clinic} />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <ContactForm />
        </div>
      </div>

      {/* Aviso de Urgência */}
      <EmergencyNotice clinic={clinic} />
    </div>
  );
}
