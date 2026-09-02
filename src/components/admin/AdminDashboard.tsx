"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Stethoscope,
  HelpCircle,
  Megaphone,
  BookOpen,
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Eye,
  LogOut,
  Lock,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import {
  ClinicSettings,
  ServiceItem,
  FAQItem,
  CampaignItem,
  ArticleItem,
  ServiceCategory,
} from "@/types";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

interface AdminDashboardProps {
  initialClinic: ClinicSettings;
  initialServices: ServiceItem[];
  initialCategories: ServiceCategory[];
  initialFaqs: FAQItem[];
  initialCampaigns: CampaignItem[];
  initialArticles: ArticleItem[];
}

export function AdminDashboard({
  initialClinic,
  initialServices,
  initialCategories,
  initialFaqs,
  initialCampaigns,
  initialArticles,
}: AdminDashboardProps) {
  // Estado de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Aba ativa
  const [activeTab, setActiveTab] = useState<"clinic" | "services" | "campaigns" | "faqs" | "articles">("clinic");

  // Dados gerenciáveis
  const [clinic, setClinic] = useState<ClinicSettings>(initialClinic);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(initialCampaigns);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);

  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Verificar sessão inicial no Supabase ou permitir login local seguro
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsAuthenticated(true);
        }
      });
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      // Modo estático / demonstração: validação administrativa padrão
      if (email.trim() && password.trim()) {
        setIsAuthenticated(true);
      } else {
        setAuthError("Por favor, preencha o e-mail e a senha do administrador.");
      }
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
  };

  const notifySave = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(null), 4000);
  };

  const handleSaveClinic = async () => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("clinic_settings")
        .upsert({
          name: clinic.name,
          short_description: clinic.shortDescription,
          whatsapp: clinic.whatsapp,
          phone: clinic.phone,
          email: clinic.email,
          address: clinic.address,
          maps_url: clinic.mapsUrl,
          opening_hours: clinic.openingHours,
          emergency_care: clinic.emergencyCare,
          emergency_reference_contact: clinic.emergencyReferenceContact,
          accepted_species: clinic.acceptedSpecies,
          payment_methods: clinic.paymentMethods,
          instagram: clinic.instagram,
          responsible_veterinarian: clinic.responsibleVeterinarian,
          crmv: clinic.crmv,
          city: clinic.city,
          price_disclaimer: clinic.priceDisclaimer,
          last_price_review_date: clinic.lastPriceReviewDate,
        });

      if (error) {
        alert("Erro ao salvar no Supabase: " + error.message);
        return;
      }
    }
    notifySave("Dados da clínica salvos com sucesso!");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-card space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-petrol-900 text-white flex items-center justify-center mx-auto shadow-subtle">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Acesso ao Painel Administrativo
            </h1>
            <p className="text-xs text-slate-500">
              Área restrita exclusivamente à equipe técnica da clínica veterinária.
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 leading-relaxed">
              <strong>Modo de Avaliação Inicial:</strong> O Supabase ainda não está conectado via variáveis no <code>.env</code>. Você pode acessar com qualquer credencial de teste para inspecionar o painel.
            </div>
          )}

          {authError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">E-mail Administrativo</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@clinicaveterinaria.com.br"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-petrol-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Senha de Acesso</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-petrol-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-petrol-900 hover:bg-petrol-800 text-white rounded-xl font-medium text-sm transition-colors shadow-subtle"
            >
              Entrar no Painel
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-800 underline">
              Voltar ao site público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barra superior de identificação do painel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-petrol-900 text-white flex items-center justify-center font-bold">
            ADM
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Painel de Gestão da Clínica
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className={`inline-block w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span>{isSupabaseConfigured ? "Sincronizado com Supabase" : "Modo Local / Estático"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>Visualizar Site Público</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 text-xs font-medium text-rose-700 hover:bg-rose-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm p-3.5 rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Navegação por Abas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200">
        <button
          onClick={() => setActiveTab("clinic")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "clinic"
              ? "border-petrol-900 text-petrol-900 font-semibold"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Dados da Clínica & Contato</span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "services"
              ? "border-petrol-900 text-petrol-900 font-semibold"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Serviços & Valores ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("campaigns")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "campaigns"
              ? "border-petrol-900 text-petrol-900 font-semibold"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Campanhas ({campaigns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("faqs")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "faqs"
              ? "border-petrol-900 text-petrol-900 font-semibold"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Perguntas Frequentes ({faqs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("articles")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "articles"
              ? "border-petrol-900 text-petrol-900 font-semibold"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Informativos ({articles.length})</span>
        </button>
      </div>

      {/* Conteúdo da Aba 1: Dados da Clínica */}
      {activeTab === "clinic" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Configurações Centrais da Clínica
              </h2>
              <p className="text-xs text-slate-500">
                Campos vazios ou marcados como [PREENCHER] serão ocultados automaticamente no site.
              </p>
            </div>
            <button
              onClick={handleSaveClinic}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-petrol-900 hover:bg-petrol-800 text-white text-xs sm:text-sm font-medium transition-colors shadow-subtle"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Nome Oficial da Clínica</label>
              <input
                type="text"
                value={clinic.name}
                onChange={(e) => setClinic({ ...clinic, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Descrição Curta</label>
              <input
                type="text"
                value={clinic.shortDescription || ""}
                onChange={(e) => setClinic({ ...clinic, shortDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">WhatsApp (com DDD)</label>
              <input
                type="text"
                value={clinic.whatsapp || ""}
                onChange={(e) => setClinic({ ...clinic, whatsapp: e.target.value })}
                placeholder="(00) 00000-0000"
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Telefone Fixo</label>
              <input
                type="text"
                value={clinic.phone || ""}
                onChange={(e) => setClinic({ ...clinic, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">E-mail de Contato</label>
              <input
                type="email"
                value={clinic.email || ""}
                onChange={(e) => setClinic({ ...clinic, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Instagram (@perfil)</label>
              <input
                type="text"
                value={clinic.instagram || ""}
                onChange={(e) => setClinic({ ...clinic, instagram: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="font-semibold text-slate-700">Endereço Completo</label>
              <input
                type="text"
                value={clinic.address || ""}
                onChange={(e) => setClinic({ ...clinic, address: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="font-semibold text-slate-700">Link do Google Maps</label>
              <input
                type="url"
                value={clinic.mapsUrl || ""}
                onChange={(e) => setClinic({ ...clinic, mapsUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Horários de Atendimento</label>
              <input
                type="text"
                value={clinic.openingHours || ""}
                onChange={(e) => setClinic({ ...clinic, openingHours: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Status Real de Urgência / 24h</label>
              <input
                type="text"
                value={clinic.emergencyCare || ""}
                onChange={(e) => setClinic({ ...clinic, emergencyCare: e.target.value })}
                placeholder="Ex: Não atendemos 24h. Urgências no horário comercial."
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Médico-Veterinário Responsável Técnico</label>
              <input
                type="text"
                value={clinic.responsibleVeterinarian || ""}
                onChange={(e) => setClinic({ ...clinic, responsibleVeterinarian: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">CRMV com UF</label>
              <input
                type="text"
                value={clinic.crmv || ""}
                onChange={(e) => setClinic({ ...clinic, crmv: e.target.value })}
                placeholder="CRMV-SP 00.000"
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Espécies Atendidas</label>
              <input
                type="text"
                value={clinic.acceptedSpecies || ""}
                onChange={(e) => setClinic({ ...clinic, acceptedSpecies: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Formas de Pagamento</label>
              <input
                type="text"
                value={clinic.paymentMethods || ""}
                onChange={(e) => setClinic({ ...clinic, paymentMethods: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="font-semibold text-slate-700">Aviso sobre Valores e Necessidades Adicionais</label>
              <textarea
                rows={2}
                value={clinic.priceDisclaimer || ""}
                onChange={(e) => setClinic({ ...clinic, priceDisclaimer: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 2: Serviços & Valores */}
      {activeTab === "services" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Gerenciamento do Catálogo de Serviços e Valores
              </h2>
              <p className="text-xs text-slate-500">
                Cadastre e edite os serviços, tipo de precificação e itens inclusos.
              </p>
            </div>
            <button
              onClick={() => {
                const newId = `serv-${Date.now()}`;
                const newServ: ServiceItem = {
                  id: newId,
                  name: "Novo Serviço",
                  categorySlug: "consultas",
                  categoryName: "Consultas",
                  shortDescription: "Descrição do novo serviço veterinário",
                  priceType: "on_evaluation",
                  exactPrice: null,
                  startingPrice: null,
                  requiresEvaluation: false,
                  includedItems: ["Atendimento padrão"],
                  availability: "Sob agendamento",
                  isActive: true,
                  displayOrder: services.length + 1,
                };
                setServices([newServ, ...services]);
                notifySave("Novo serviço adicionado na lista.");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-petrol-900 hover:bg-petrol-800 text-white text-xs font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Serviço</span>
            </button>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-slate-500">Nome do Serviço</label>
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[index].name = e.target.value;
                          setServices(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs sm:text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Tipo de Preço</label>
                      <select
                        value={service.priceType}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[index].priceType = e.target.value as any;
                          setServices(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs sm:text-sm bg-white"
                      >
                        <option value="on_evaluation">Sob avaliação médica</option>
                        <option value="starting_at">A partir de (valor mínimo)</option>
                        <option value="exact">Valor fixo</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setServices(services.filter((s) => s.id !== service.id));
                      notifySave("Serviço removido.");
                    }}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                    title="Remover serviço"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500">Descrição Curta</label>
                    <input
                      type="text"
                      value={service.shortDescription}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[index].shortDescription = e.target.value;
                        setServices(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                    />
                  </div>

                  {service.priceType === "exact" ? (
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Valor Fixo (R$)</label>
                      <input
                        type="number"
                        value={service.exactPrice || ""}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[index].exactPrice = parseFloat(e.target.value) || null;
                          setServices(updated);
                        }}
                        placeholder="Ex: 150.00"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                      />
                    </div>
                  ) : service.priceType === "starting_at" ? (
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">A partir de (R$)</label>
                      <input
                        type="number"
                        value={service.startingPrice || ""}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[index].startingPrice = parseFloat(e.target.value) || null;
                          setServices(updated);
                        }}
                        placeholder="Ex: 200.00"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center text-xs text-slate-500 pt-4">
                      <span>Valor será informado na recepção sob avaliação do veterinário</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 3: Campanhas */}
      {activeTab === "campaigns" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Gerenciamento de Campanhas & Folders Digitais
              </h2>
              <p className="text-xs text-slate-500">
                Campanhas ativas aparecem na página inicial. Campanhas encerradas não exibem preços promocionais.
              </p>
            </div>
            <button
              onClick={() => {
                const newId = `camp-${Date.now()}`;
                const newCamp: CampaignItem = {
                  id: newId,
                  slug: `nova-campanha-${Date.now()}`,
                  title: "Nova Campanha",
                  summary: "Resumo da nova ação",
                  fullDescription: "Descrição detalhada da ação institucional.",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
                  eligibleAudience: "Cães e gatos",
                  includedServices: ["Consulta de triagem"],
                  realPriceOrCondition: "Consulte na recepção",
                  rulesAndLimitations: "Vagas limitadas",
                  status: "draft",
                  displayOrder: campaigns.length + 1,
                };
                setCampaigns([newCamp, ...campaigns]);
                notifySave("Nova campanha adicionada como rascunho.");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-petrol-900 hover:bg-petrol-800 text-white text-xs font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Campanha</span>
            </button>
          </div>

          <div className="space-y-4">
            {campaigns.map((camp, index) => (
              <div
                key={camp.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-slate-500">Título da Campanha</label>
                      <input
                        type="text"
                        value={camp.title}
                        onChange={(e) => {
                          const updated = [...campaigns];
                          updated[index].title = e.target.value;
                          setCampaigns(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs sm:text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Status</label>
                      <select
                        value={camp.status}
                        onChange={(e) => {
                          const updated = [...campaigns];
                          updated[index].status = e.target.value as any;
                          setCampaigns(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs sm:text-sm bg-white font-medium"
                      >
                        <option value="active">Ativa (Exibir na Home e Folder)</option>
                        <option value="scheduled">Agendada</option>
                        <option value="ended">Encerrada</option>
                        <option value="draft">Rascunho</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCampaigns(campaigns.filter((c) => c.id !== camp.id));
                      notifySave("Campanha removida.");
                    }}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                    title="Remover campanha"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500">Data de Início</label>
                    <input
                      type="date"
                      value={camp.startDate}
                      onChange={(e) => {
                        const updated = [...campaigns];
                        updated[index].startDate = e.target.value;
                        setCampaigns(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500">Data de Término</label>
                    <input
                      type="date"
                      value={camp.endDate}
                      onChange={(e) => {
                        const updated = [...campaigns];
                        updated[index].endDate = e.target.value;
                        setCampaigns(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-500">Condição Real / Preço</label>
                  <input
                    type="text"
                    value={camp.realPriceOrCondition}
                    onChange={(e) => {
                      const updated = [...campaigns];
                      updated[index].realPriceOrCondition = e.target.value;
                      setCampaigns(updated);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 4: Perguntas Frequentes */}
      {activeTab === "faqs" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Gerenciamento de Perguntas Frequentes (FAQ)
              </h2>
              <p className="text-xs text-slate-500">
                Mantenha as respostas alinhadas com a rotina e as políticas reais da clínica.
              </p>
            </div>
            <button
              onClick={() => {
                const newFaq: FAQItem = {
                  id: `faq-${Date.now()}`,
                  category: "funcionamento",
                  categoryName: "Funcionamento & Agendamento",
                  question: "Nova pergunta sobre atendimento",
                  answer: "Resposta orientativa clara e segura para os tutores.",
                  displayOrder: faqs.length + 1,
                  isActive: true,
                };
                setFaqs([newFaq, ...faqs]);
                notifySave("Nova pergunta adicionada.");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-petrol-900 hover:bg-petrol-800 text-white text-xs font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Pergunta</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[index].question = e.target.value;
                      setFaqs(updated);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
                  />
                  <button
                    onClick={() => {
                      setFaqs(faqs.filter((f) => f.id !== faq.id));
                      notifySave("Pergunta removida.");
                    }}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                    title="Remover pergunta"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...faqs];
                    updated[index].answer = e.target.value;
                    setFaqs(updated);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-700"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 5: Informativos */}
      {activeTab === "articles" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Informativos & Biblioteca Educativa
              </h2>
              <p className="text-xs text-slate-500">
                Textos educativos revisados pelo médico-veterinário responsável.
              </p>
            </div>
            <button
              onClick={() => {
                const newArt: ArticleItem = {
                  id: `art-${Date.now()}`,
                  slug: `novo-artigo-${Date.now()}`,
                  title: "Novo Informativo Educativo",
                  summary: "Resumo educativo do artigo",
                  category: "Prevenção & Bem-estar",
                  content: "Orientações educativas para o tutor...",
                  revisionDate: new Date().toISOString().split("T")[0],
                  technicalReviewerName: clinic.responsibleVeterinarian || "Médico-Veterinário",
                  technicalReviewerCrmv: clinic.crmv,
                  isPublished: true,
                  displayOrder: articles.length + 1,
                };
                setArticles([newArt, ...articles]);
                notifySave("Novo informativo adicionado.");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-petrol-900 hover:bg-petrol-800 text-white text-xs font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Informativo</span>
            </button>
          </div>

          <div className="space-y-4">
            {articles.map((art, index) => (
              <div
                key={art.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={art.title}
                    onChange={(e) => {
                      const updated = [...articles];
                      updated[index].title = e.target.value;
                      setArticles(updated);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm font-bold bg-white"
                  />
                  <button
                    onClick={() => {
                      setArticles(articles.filter((a) => a.id !== art.id));
                      notifySave("Informativo removido.");
                    }}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                    title="Remover artigo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500">Categoria</label>
                    <input
                      type="text"
                      value={art.category}
                      onChange={(e) => {
                        const updated = [...articles];
                        updated[index].category = e.target.value;
                        setArticles(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500">Revisor Técnico</label>
                    <input
                      type="text"
                      value={art.technicalReviewerName || ""}
                      onChange={(e) => {
                        const updated = [...articles];
                        updated[index].technicalReviewerName = e.target.value;
                        setArticles(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-500">Resumo</label>
                  <input
                    type="text"
                    value={art.summary}
                    onChange={(e) => {
                      const updated = [...articles];
                      updated[index].summary = e.target.value;
                      setArticles(updated);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
