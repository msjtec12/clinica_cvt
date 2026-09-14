import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Clock3,
  HeartPulse,
  MapPin,
  MessageCircleQuestion,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { getClinicSettings, getServices } from "@/lib/data-service";
import { isFilled } from "@/lib/utils";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ServiceCard } from "@/components/services/ServiceCard";

export default async function HomePage() {
  const [clinic, services] = await Promise.all([
    getClinicSettings(),
    getServices(),
  ]);

  const clinicName = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";
  const phoneDigits = isFilled(clinic.phone) ? clinic.phone!.replace(/\D/g, "") : "";
  const featuredServices = services.slice(0, 3);

  const quickPaths = [
    {
      title: "Preciso de atendimento",
      description: "Veja consultas, exames, vacinas e outros serviços disponíveis.",
      href: "/servicos",
      icon: Stethoscope,
    },
    {
      title: "Tenho uma dúvida",
      description: "Pesquise orientações educativas sobre rotina, prevenção e cuidados.",
      href: "/duvidas",
      icon: MessageCircleQuestion,
    },
    {
      title: "Quero vacinar meu pet",
      description: "Consulte informações de vacinação e fale com a clínica.",
      href: "/servicos?cat=vacinas",
      icon: Syringe,
    },
    {
      title: "Quero ir até a clínica",
      description: "Confira endereço, horários e opções de contato antes de sair.",
      href: "/contato",
      icon: Navigation,
    },
  ];

  return (
    <div className="pb-20 md:pb-16">
      <section className="border-b border-slate-200/70 bg-gradient-to-b from-white via-white to-petrol-50/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-petrol-200 bg-white px-3 py-1.5 text-xs font-semibold text-petrol-800 shadow-subtle">
              <HeartPulse className="h-4 w-4 text-petrol-700" />
              Atendimento veterinário com informação clara para o tutor
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Cuidado veterinário com uma experiência mais simples para você e seu pet.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Consulte serviços, tire dúvidas frequentes, confira horários e fale com a equipe da {clinicName} sem precisar procurar informação em várias páginas.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                phone={clinic.whatsapp}
                message={`Olá! Estou no site da ${clinicName} e gostaria de informações sobre atendimento para meu pet.`}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Falar com a clínica
              </WhatsAppButton>

              <Link
                href="/servicos"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-subtle transition hover:border-petrol-300 hover:bg-petrol-50 sm:w-auto"
              >
                Ver serviços
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
              <div className="flex items-start gap-2.5 rounded-xl bg-white/80 p-3 text-sm text-slate-600">
                <Clock3 className="mt-0.5 h-4 w-4 flex-shrink-0 text-petrol-700" />
                <div>
                  <span className="block text-xs font-semibold text-slate-900">Horários</span>
                  <span className="text-xs">{isFilled(clinic.openingHours) ? clinic.openingHours : "Consulte a clínica"}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-white/80 p-3 text-sm text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-petrol-700" />
                <div>
                  <span className="block text-xs font-semibold text-slate-900">Localização</span>
                  <span className="text-xs">{isFilled(clinic.neighborhood) ? clinic.neighborhood : isFilled(clinic.city) ? clinic.city : "Veja no contato"}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-white/80 p-3 text-sm text-slate-600">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-petrol-700" />
                <div>
                  <span className="block text-xs font-semibold text-slate-900">Responsabilidade técnica</span>
                  <span className="text-xs">{isFilled(clinic.crmv) ? clinic.crmv : "Informação disponível na clínica"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-petrol-200 bg-white p-5 shadow-hover sm:p-6">
            <div className="relative mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-petrol-50">
              <Image
                src="/images/hero-veterinaria.jpg"
                alt="Ilustração de atendimento veterinário com um cão e um gato"
                width={900}
                height={507}
                priority
                className="h-40 w-full object-cover object-center sm:h-44"
              />
              <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-slate-600 shadow-sm backdrop-blur">
                Imagem ilustrativa
              </span>
            </div>

            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-petrol-700">Acesso rápido</p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">O que você precisa hoje?</h2>
              </div>
              <div className="rounded-2xl bg-petrol-50 p-3 text-petrol-800">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-2.5">
              {quickPaths.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-petrol-300 hover:bg-petrol-50/50 hover:shadow-card"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-petrol-50 text-petrol-800 transition group-hover:bg-petrol-900 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-petrol-700" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="space-y-6" aria-labelledby="servicos-home-heading">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-petrol-700">Atendimento</p>
              <h2 id="servicos-home-heading" className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Serviços mais procurados
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Informações objetivas para você entender como funciona o atendimento antes de falar com a equipe.
              </p>
            </div>
            <Link href="/servicos" className="inline-flex items-center gap-1.5 text-sm font-semibold text-petrol-800 hover:text-petrol-950">
              Ver todos os serviços
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {featuredServices.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} whatsapp={clinic.whatsapp} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              O catálogo de serviços está sendo atualizado. Fale com a clínica para consultar o atendimento disponível.
            </div>
          )}
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <Link href="/duvidas" className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-subtle transition hover:border-petrol-300 hover:shadow-card lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-petrol-50 p-3 text-petrol-800">
                <BookOpenCheck className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-petrol-700">Central de Dúvidas</p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">Antes de mandar mensagem, talvez sua dúvida já esteja respondida.</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Pesquise dúvidas sobre filhotes, alimentação, vacinação, higiene, prevenção, transporte e guarda responsável. Quando o assunto exige avaliação veterinária, o próprio site orienta procurar atendimento.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-petrol-800 group-hover:text-petrol-950">
                  Pesquisar uma dúvida <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-card">
            <CalendarDays className="h-6 w-6 text-turquoise-300" />
            <h2 className="mt-4 text-lg font-bold">Antes de ir até a clínica</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Confirme o horário de atendimento e leve carteirinha de vacinação, exames anteriores e informações dos medicamentos em uso, quando houver.
            </p>
            <Link href="/contato" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-turquoise-300 hover:text-white">
              Ver contato e localização <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-petrol-200 bg-petrol-50/70">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm font-semibold text-petrol-900">
                <ShieldCheck className="h-5 w-5" />
                Responsabilidade técnica
              </div>
              <h2 className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">
                {isFilled(clinic.responsibleVeterinarian) ? clinic.responsibleVeterinarian : "Atendimento médico-veterinário responsável"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {isFilled(clinic.crmv) ? `${clinic.crmv}. ` : ""}As orientações do site têm caráter educativo. Diagnóstico, prescrição, indicação individual de exames e definição de tratamento dependem de avaliação médico-veterinária.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
              {phoneDigits && (
                <a href={`tel:${phoneDigits}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-petrol-200 bg-white px-4 py-2.5 text-sm font-semibold text-petrol-900 hover:bg-petrol-100">
                  <Phone className="h-4 w-4" />
                  Ligar para a clínica
                </a>
              )}
              {isFilled(clinic.mapsUrl) && (
                <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-petrol-200 bg-white px-4 py-2.5 text-sm font-semibold text-petrol-900 hover:bg-petrol-100">
                  <MapPin className="h-4 w-4" />
                  Como chegar
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
