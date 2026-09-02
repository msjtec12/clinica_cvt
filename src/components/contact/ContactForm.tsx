"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { ContactFormData } from "@/types";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    tutorName: "",
    petName: "",
    phone: "",
    subject: "Dúvida Geral / Informações",
    message: "",
    consent: false,
    honeypot: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Máscara básica para telefone do Brasil
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 10) {
      val = val.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (val.length > 5) {
      val = val.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (val.length > 2) {
      val = val.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    }

    setFormData((prev) => ({ ...prev, phone: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Proteção honeypot anti-spam: se preenchido, é um bot
    if (formData.honeypot) {
      setSubmitted(true);
      return;
    }

    if (!formData.consent) {
      setError("Por favor, confirme o consentimento para que possamos responder seu contato.");
      return;
    }

    setLoading(true);

    try {
      // Simulação de envio com fallback seguro
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch {
      setError("Ocorreu um erro ao registrar sua mensagem. Por favor, utilize nosso WhatsApp para atendimento imediato.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-emerald-950">
          Mensagem Recebida com Sucesso!
        </h3>
        <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
          Agradecemos seu contato, <strong>{formData.tutorName}</strong>. Nossa equipe responderá sua mensagem pelo telefone informado durante o horário de expediente da clínica.
        </p>
        <p className="text-xs text-emerald-700 pt-2 border-t border-emerald-100">
          Caso necessite de resposta urgente para o <strong>{formData.petName || "seu pet"}</strong>, recomendamos entrar em contato direto pelo nosso WhatsApp.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              tutorName: "",
              petName: "",
              phone: "",
              subject: "Dúvida Geral / Informações",
              message: "",
              consent: false,
              honeypot: "",
            });
          }}
          className="mt-4 text-xs font-semibold text-emerald-900 underline hover:text-emerald-950"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-5"
    >
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-lg font-bold text-slate-900">
          Formulário de Contato Administrativo
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Utilize para tirar dúvidas gerais, solicitar informações de atendimento ou agendamento.
        </p>
      </div>

      {/* Alerta ético obrigatório */}
      <div className="bg-slate-50 border-l-4 border-petrol-700 p-3 rounded-r-lg text-xs text-slate-600 leading-relaxed">
        <strong>Atenção:</strong> Este formulário não realiza triagem de emergência nem fornece diagnóstico médico veterinário. Em casos graves, ligue ou venha à clínica imediatamente.
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Campo Honeypot Oculto (Anti-spam) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Não preencha este campo</label>
        <input
          type="text"
          id="website_hp"
          value={formData.honeypot || ""}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nome do Tutor */}
        <div className="space-y-1.5">
          <label htmlFor="tutorName" className="text-xs font-semibold text-slate-700">
            Nome do Tutor <span className="text-rose-500">*</span>
          </label>
          <input
            id="tutorName"
            type="text"
            required
            value={formData.tutorName}
            onChange={(e) => setFormData({ ...formData, tutorName: e.target.value })}
            placeholder="Seu nome completo"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-petrol-600"
          />
        </div>

        {/* Nome do Pet */}
        <div className="space-y-1.5">
          <label htmlFor="petName" className="text-xs font-semibold text-slate-700">
            Nome do Pet <span className="text-rose-500">*</span>
          </label>
          <input
            id="petName"
            type="text"
            required
            value={formData.petName}
            onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
            placeholder="Nome do seu cão ou gato"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-petrol-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Telefone / WhatsApp com máscara */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-xs font-semibold text-slate-700">
            Telefone / WhatsApp com DDD <span className="text-rose-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-petrol-600"
          />
        </div>

        {/* Assunto */}
        <div className="space-y-1.5">
          <label htmlFor="subject" className="text-xs font-semibold text-slate-700">
            Assunto Principal <span className="text-rose-500">*</span>
          </label>
          <select
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-petrol-600"
          >
            <option value="Dúvida Geral / Informações">Dúvida Geral / Informações</option>
            <option value="Consulta sobre Serviços ou Valores">Consulta sobre Serviços ou Valores</option>
            <option value="Agendamento Preventivo">Agendamento Preventivo</option>
            <option value="Campanhas Vigentes">Campanhas Vigentes</option>
            <option value="Outro Assunto">Outro Assunto</option>
          </select>
        </div>
      </div>

      {/* Mensagem */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-semibold text-slate-700">
          Sua Mensagem <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Escreva sua dúvida de forma objetiva..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-petrol-600 resize-y"
        />
      </div>

      {/* Consentimento de Contato LGPD */}
      <div className="flex items-start gap-2 pt-1">
        <input
          id="consent"
          type="checkbox"
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-petrol-700 focus:ring-petrol-600"
          required
        />
        <label htmlFor="consent" className="text-xs text-slate-600 leading-snug">
          Concordo em fornecer meus dados e contato exclusivamente para receber o retorno da clínica veterinária sobre esta solicitação.
        </label>
      </div>

      {/* Botão de Envio */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 rounded-xl bg-petrol-900 hover:bg-petrol-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-subtle hover:shadow transition-all disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? "Enviando mensagem..." : "Enviar Mensagem para a Recepção"}</span>
      </button>
    </form>
  );
}
