"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

/** Prepares a message only; never claims delivery to the clinic. */
export function ContactForm({ phone }: { phone?: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const href = getWhatsAppLink(
    phone,
    `${name.trim() ? `Olá! Meu nome é ${name.trim()}. ` : "Olá! "}${message.trim()}`,
  );
  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"
      aria-labelledby="message-heading"
    >
      <h2 id="message-heading" className="text-2xl font-bold text-petrol-950">
        Quer ajuda para escrever?
      </h2>
      <p className="mt-3 text-base leading-relaxed text-slate-700">
        Prepare sua mensagem aqui. Depois, abra o WhatsApp e toque em Enviar
        para falar com a clínica.
      </p>
      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setReady(true);
        }}
      >
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-base font-semibold"
          >
            Seu nome (opcional)
          </label>
          <input
            id="contact-name"
            autoComplete="given-name"
            maxLength={100}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setReady(false);
            }}
            className="contact-input"
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-base font-semibold"
          >
            Como podemos ajudar?
          </label>
          <p id="message-hint" className="mb-2 text-base text-slate-600">
            Por exemplo: gostaria de saber o valor da consulta.
          </p>
          <textarea
            id="contact-message"
            aria-describedby="message-hint"
            required
            maxLength={1500}
            rows={4}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              setReady(false);
            }}
            className="contact-input"
          />
        </div>
        {!ready && (
          <button type="submit" className="action-secondary w-full">
            Preparar mensagem
          </button>
        )}
        <div aria-live="polite">
          {ready && (
            <div className="space-y-3">
              <p className="text-base font-semibold text-petrol-950">
                Sua mensagem está pronta. Ela ainda não foi enviada.
              </p>
              <a
                href={href}
                className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-base font-semibold text-white hover:bg-emerald-800"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
                {href === "/contato"
                  ? "Ver opções de contato"
                  : "Abrir WhatsApp para enviar"}
              </a>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
