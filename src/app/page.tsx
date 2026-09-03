import React from "react";
import Link from "next/link";
import {
  Stethoscope,
  Syringe,
  Microscope,
  Scissors,
  Sparkles,
  AlertOctagon,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
} from "lucide-react";
import {
  getClinicSettings,
  getServices,
  getFaqs,
} from "@/lib/data-service";
import { isFilled, formatCurrency } from "@/lib/utils";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ServiceCard } from "@/components/services/ServiceCard";
import { TutorGuidanceWizard } from "@/components/faq/TutorGuidanceWizard";
import { LocationSection } from "@/components/contact/LocationSection";

export default async function HomePage() {
  const [clinic, allServices, allFaqs] = await Promise.all([
    getClinicSettings(),
    getServices(),
    getFaqs(),
  ]);

  // Serviços em destaque direto para o tutor (Consultas, Vacinas, Castração, Banho & Tosa)
  const topServices = allServices.slice(0, 4);

  // 6 Atalhos essenciais diretos
  const shortcuts = [
    {
      label: "Consultas",
      desc: "Geral e especialidades",
      icon: Stethoscope,
      href: "/servicos?cat=consultas",
      color: "bg-blue-50 text-blue-700 border-blue-100",
    },
    {
      label: "Vacinas",
      desc: "Cães e gatos",
      icon: Syringe,
      href: "/servicos?cat=vacinas",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      label: "Castração",
      desc: "Cirurgia com anestesista",
      icon: Scissors,
      href: "/servicos?cat=cirurgias",
      color: "bg-teal-50 text-teal-700 border-teal-100",
    },
    {
      label: "Banho & Tosa",
      desc: "Higiene com carinho",
      icon: Sparkles,
      href: "/servicos?cat=estetica",
      color: "bg-purple-50 text-purple-700 border-purple-100",
    },
    {
      label: "Exames",
      desc: "Sangue e ultrassom",
      icon: Microscope,
      href: "/servicos?cat=exames",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    },
    {
      label: "Urgência",
      desc: "O que fazer agora",
      icon: AlertOctagon,
      href: "/duvidas?cat=urgencia",
      color: "bg-rose-50 text-rose-700 border-rose-100",
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-16 pt-4 sm:pt-6">
      {/* ========================================================================= */}
      {/* 1. TOPO OTIMIZADO: CARTÃO ESSENCIAL DIRETO FIEL AO FLYER OFICIAL */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-petrol-200/80 bg-white p-5 sm:p-7 shadow-card space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Identificação da Clínica e Médica Responsável */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-petrol-50 text-petrol-900 text-xs font-semibold border border-petrol-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-petrol-700" />
                  <span>Dra. Priscila Villanova Nunes • CRMV-SP 19.394</span>
                </span>
                <span className="text-xs text-petrol-800 font-semibold italic">
                  Cuidar é o nosso compromisso! ❤️
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Clínica Veterinária Thieres (CVT)
              </h1>

              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-petrol-700 flex-shrink-0" />
                  <span className="font-medium">Rua Cachoeira do Limão, 10 - casa 2 - Inácio Monteiro</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-petrol-700 flex-shrink-0" />
                  <span>Seg a Sex: <strong>9:30h às 17:30h</strong> | Sáb: <strong>9:30h às 14h</strong></span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-petrol-100 text-petrol-900">
                  Atendimento por ordem de chegada
                </span>
              </div>
            </div>

            {/* Ações Imediatas (WhatsApp, Ligar e Como Chegar) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <WhatsAppButton
                phone={clinic.whatsapp}
                message="Olá! Gostaria de falar com a recepção da Clínica Veterinária Thieres para confirmar o atendimento."
                variant="primary"
                size="md"
                className="w-full sm:w-auto shadow-sm"
              >
                Chamar no WhatsApp
              </WhatsAppButton>

              <a
                href="tel:1121538100"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-petrol-50 hover:bg-petrol-100 text-petrol-900 text-xs sm:text-sm font-bold border border-petrol-200 transition-colors w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 text-petrol-700" />
                <span>Ligar: (11) 2153-8100</span>
              </a>

              {isFilled(clinic.mapsUrl) && (
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-white hover:bg-slate-50 text-petrol-800 text-xs sm:text-sm font-semibold border border-slate-200 transition-colors"
                  title="Abrir rota no Google Maps"
                >
                  <Navigation className="w-4 h-4 text-petrol-700" />
                  <span>Como Chegar</span>
                </a>
              )}
            </div>
          </div>

          {/* Aviso Oficial do Flyer com Fundo Menta */}
          <div className="bg-petrol-50 border border-petrol-200/80 rounded-2xl p-3 sm:p-4 flex items-center gap-3 text-xs sm:text-sm text-petrol-950">
            <div className="w-7 h-7 rounded-full bg-petrol-900 text-white flex items-center justify-center font-bold flex-shrink-0 text-xs">
              !
            </div>
            <p className="leading-relaxed">
              <strong>Aviso aos tutores:</strong> Se possível, <strong>ligue antes</strong> para confirmar o atendimento, pois pode haver alteração no horário.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* ========================================================================= */}
        {/* 2. ATALHOS RÁPIDOS ESSENCIAIS (6 BOTÕES OBJETIVOS) */}
        {/* ========================================================================= */}
        <section aria-label="Atalhos rápidos para o tutor">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {shortcuts.map((sc, i) => {
              const Icon = sc.icon;
              return (
                <Link
                  key={i}
                  href={sc.href}
                  className="flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card hover:border-turquoise-300 transition-all group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-105 border ${sc.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-petrol-900 leading-tight">
                    {sc.label}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    {sc.desc}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. ASSISTENTE DE TRIAGEM RÁPIDA: RESPONDE DÚVIDAS & MOSTRA SERVIÇOS/VALORES */}
        {/* ========================================================================= */}
        <section aria-labelledby="triagem-heading">
          <TutorGuidanceWizard clinic={clinic} services={allServices} />
        </section>

        {/* ========================================================================= */}
        {/* 4. CATÁLOGO DIRETO: SERVIÇOS MAIS PROCURADOS COM VALORES TRANSPARENTES */}
        {/* ========================================================================= */}
        <section aria-labelledby="servicos-heading" className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <div>
              <h2 id="servicos-heading" className="text-xl font-bold text-slate-900">
                Serviços Oficiais da Clínica
              </h2>
              <p className="text-xs text-slate-500">
                Valores transparentes e o que está incluso em cada atendimento.
              </p>
            </div>
            <Link
              href="/servicos"
              className="text-xs sm:text-sm font-semibold text-petrol-700 hover:text-petrol-900 inline-flex items-center gap-1"
            >
              <span>Ver todos ({allServices.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                whatsapp={clinic.whatsapp}
              />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. RESPONSÁVEL TÉCNICA: DRA. PRISCILA VILLANOVA NUNES (21 ANOS DE EXPERIÊNCIA) */}
        {/* ========================================================================= */}
        <section aria-labelledby="veterinaria-heading" className="rounded-3xl border border-teal-100 bg-gradient-to-br from-petrol-50/50 via-white to-turquoise-50/30 p-6 sm:p-8 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turquoise-100 text-turquoise-900 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-turquoise-700" />
                <span>Responsável Técnica Oficial</span>
              </div>

              <h2 id="veterinaria-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
                Dra. Priscila Villanova Nunes • CRMV-SP 19.394
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mais de <strong>21 anos cuidando de cães e gatos</strong> com muito carinho em Inácio Monteiro. Formada pela Unicastelo Fernandópolis e <strong>especialista em Anestesiologia Veterinária</strong>, garantindo máxima segurança para castrações e procedimentos.
              </p>

              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-medium">
                  ✓ 21 anos de prática clínica
                </span>
                <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-medium">
                  ✓ Especialista em Anestesia & Cirurgia Segura
                </span>
                <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-medium">
                  ✓ Atendimento amoroso para cães e gatos
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-slate-200 shadow-subtle space-y-2">
              <div className="w-16 h-16 rounded-full bg-petrol-900 text-turquoise-300 flex items-center justify-center font-bold text-xl shadow border-2 border-white">
                PV
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Dra. Priscila Villanova Nunes</div>
                <span className="text-[11px] text-slate-500">Médica-Veterinária • CRMV-SP 19.394</span>
              </div>
              <WhatsAppButton
                phone={clinic.whatsapp}
                message="Olá, Dra. Priscila! Gostaria de agendar uma consulta para o meu pet na Clínica Veterinária Thieres."
                variant="primary"
                size="sm"
                className="w-full text-xs"
              >
                Falar com a Dra. Priscila
              </WhatsAppButton>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. ANTES DE SAIR DE CASA: 3 CUIDADOS RÁPIDOS PARA O TUTOR */}
        {/* ========================================================================= */}
        <section
          id="antes-de-vir"
          aria-labelledby="orientacoes-heading"
          className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-card space-y-4"
        >
          <div className="space-y-1">
            <h2 id="orientacoes-heading" className="text-lg sm:text-xl font-bold text-slate-900">
              Antes de sair de casa: 3 cuidados simples para proteger seu pet
            </h2>
            <p className="text-xs text-slate-500">
              Práticas simples que evitam sustos e agilizam o atendimento do seu companheiro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Transporte Seguro</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cachorros sempre com coleira e guia. Gatos SEMPRE em caixinha de transporte bem fechada.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Carteirinha & Fotos dos Remédios</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Traga a carteira de vacinação ou tire fotos das caixas de remédios e rações no celular.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Ficar sem Comer (Jejum)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Só deixe o pet em jejum se a recepção tiver orientado as horas certas para o exame ou cirurgia.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. LOCALIZAÇÃO COM FOTO REAL DA FACHADA E ROTA */}
        {/* ========================================================================= */}
        <section aria-labelledby="localizacao-heading">
          <LocationSection clinic={clinic} />
        </section>
      </div>
    </div>
  );
}
