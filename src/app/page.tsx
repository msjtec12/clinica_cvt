import Link from "next/link";
import { ArrowRight, Clock3, MapPin, Phone } from "lucide-react";
import { getClinicSettings, getServices } from "@/lib/data-service";
import { isFilled } from "@/lib/utils";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ServiceCard } from "@/components/services/ServiceCard";

export default async function HomePage() {
  const [clinic, services] = await Promise.all([
    getClinicSettings(),
    getServices(),
  ]);
  const name = isFilled(clinic.name) ? clinic.name : "Clínica Veterinária";
  const phone = isFilled(clinic.phone) ? clinic.phone!.replace(/\D/g, "") : "";
  const maps = isFilled(clinic.mapsUrl)
    ? clinic.mapsUrl!
    : isFilled(clinic.address)
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address!)}`
      : "/contato";
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
          <div>
            <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-petrol-950 sm:text-4xl">
              Precisa de atendimento para seu pet?
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-700">
              Fale com a equipe da {name}. Escolha abaixo como prefere entrar em
              contato.
            </p>
            <div className="mt-6 flex max-w-xl flex-col gap-3">
              <WhatsAppButton
                phone={clinic.whatsapp}
                message="Olá! Gostaria de confirmar o atendimento para meu pet."
                size="lg"
                className="min-h-14 w-full text-lg"
              >
                Falar pelo WhatsApp
              </WhatsAppButton>
              {phone && (
                <a href={`tel:${phone}`} className="action-secondary">
                  <Phone aria-hidden="true" className="h-5 w-5 shrink-0" />
                  Ligar para a clínica
                </a>
              )}
              <a href={maps} className="action-secondary">
                <MapPin aria-hidden="true" className="h-5 w-5 shrink-0" />
                Como chegar
              </a>
            </div>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              No WhatsApp, você pode escrever ou enviar um áudio para a equipe.
            </p>
            <div className="mt-7 border-t border-slate-200 pt-5">
              <h2 className="text-lg font-bold text-petrol-950">
                {clinic.requiresAppointment === false
                  ? "Atendimento por ordem de chegada"
                  : clinic.requiresAppointment === true
                    ? "Atendimento com agendamento"
                    : "Confirme como funciona o atendimento"}
              </h2>
              <p className="mt-1 text-base text-slate-700">
                {clinic.requiresAppointment === false
                  ? "Ligue antes de sair para confirmar o atendimento."
                  : "Fale com a equipe antes de ir à clínica."}
              </p>
              <p className="mt-4 flex items-start gap-3 text-base leading-relaxed text-slate-700">
                <Clock3 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0" />
                <span>
                  {isFilled(clinic.openingHours)
                    ? clinic.openingHours
                    : "Consulte os horários com a equipe."}
                </span>
              </p>
              {isFilled(clinic.address) && (
                <p className="mt-3 flex items-start gap-3 text-base leading-relaxed text-slate-700">
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0"
                  />
                  <span>{clinic.address}</span>
                </p>
              )}
            </div>
          </div>
          <figure className="hidden lg:block">
            <img
              src="/images/hero-veterinaria.jpg"
              alt="Ilustração de atendimento veterinário com um cão e um gato"
              width="900"
              height="507"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              fetchPriority="high"
            />
            <figcaption className="mt-3 text-sm text-slate-600">
              Cuidado e saúde animal. Imagem ilustrativa.
            </figcaption>
          </figure>
        </div>
      </section>
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
        <section aria-labelledby="services-title">
          <h2
            id="services-title"
            className="text-2xl font-bold text-petrol-950"
          >
            Serviços da clínica
          </h2>
          <p className="mb-6 mt-2 text-lg text-slate-700">
            Veja as opções e consulte a equipe sobre o atendimento.
          </p>
          {services.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {services.slice(0, 2).map((service) => (
                <ServiceCard
                  key={service.id}
                  compact
                  service={service}
                  whatsapp={clinic.whatsapp}
                />
              ))}
            </div>
          ) : (
            <p className="py-5 text-base">
              Os serviços estão sendo atualizados. Fale com a equipe para saber
              mais.
            </p>
          )}
          <Link
            href="/servicos"
            className="mt-5 inline-flex min-h-12 items-center gap-2 text-lg font-semibold text-petrol-900 underline underline-offset-4"
          >
            Ver todos os serviços e valores{" "}
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </Link>
        </section>
        <section
          className="border-t border-slate-200 pt-8"
          aria-labelledby="help-title"
        >
          <h2 id="help-title" className="text-2xl font-bold text-petrol-950">
            Dúvidas sobre os cuidados com seu pet?
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-700">
            Encontre informações sobre vacinas, alimentação e outros cuidados.
            Se preferir, fale diretamente com a equipe.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/duvidas" className="action-secondary">
              Ver dúvidas frequentes
            </Link>
            <WhatsAppButton phone={clinic.whatsapp} size="lg">
              Pedir ajuda pelo WhatsApp
            </WhatsAppButton>
          </div>
        </section>
      </div>
    </div>
  );
}
