-- ==============================================================================
-- Schema do Supabase para Clínica Veterinária
-- ==============================================================================
-- Este script cria as tabelas com suporte a RLS (Row Level Security),
-- permitindo leitura pública apenas para itens ativos/publicados e escrita
-- restrita exclusivamente a administradores autenticados.
-- ==============================================================================

-- 1. Extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabela: clinic_settings (Dados da clínica, responsáveis e políticas)
CREATE TABLE IF NOT EXISTS clinic_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT '[NOME DA CLÍNICA]',
  short_description TEXT DEFAULT '[DESCRIÇÃO CURTA]',
  logo_url TEXT,
  whatsapp TEXT DEFAULT '[WHATSAPP COM DDD]',
  phone TEXT DEFAULT '[TELEFONE]',
  email TEXT DEFAULT '[E-MAIL]',
  address TEXT DEFAULT '[ENDEREÇO COMPLETO]',
  maps_url TEXT DEFAULT '[LINK DO GOOGLE MAPS]',
  opening_hours TEXT DEFAULT '[HORÁRIOS]',
  emergency_care TEXT DEFAULT '[INFORMAR SE HÁ OU NÃO ATENDIMENTO DE URGÊNCIA/24H]',
  emergency_reference_contact TEXT,
  accepted_species TEXT DEFAULT '[ESPÉCIES ATENDIDAS]',
  payment_methods TEXT DEFAULT '[FORMAS DE PAGAMENTO]',
  instagram TEXT DEFAULT '[INSTAGRAM]',
  responsible_veterinarian TEXT DEFAULT '[NOME DO RESPONSÁVEL TÉCNICO]',
  crmv TEXT DEFAULT '[CRMV/UF]',
  city TEXT DEFAULT '[CIDADE/UF]',
  neighborhood TEXT,
  requires_appointment BOOLEAN DEFAULT true,
  last_price_review_date DATE DEFAULT CURRENT_DATE,
  price_disclaimer TEXT DEFAULT 'Valores podem sofrer alterações caso haja necessidade de exames, medicamentos, materiais ou procedimentos complementares, sempre informados previamente.',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela: service_categories (Categorias do catálogo)
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela: services (Catálogo de serviços e valores)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
  category_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  price_type TEXT NOT NULL CHECK (price_type IN ('exact', 'starting_at', 'on_evaluation')),
  exact_price NUMERIC(10, 2),
  starting_price NUMERIC(10, 2),
  requires_evaluation BOOLEAN DEFAULT false,
  evaluation_notes TEXT,
  included_items TEXT[],
  observations TEXT,
  availability TEXT DEFAULT 'Disponível sob agendamento',
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabela: faqs (Central de dúvidas)
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabela: articles (Informativos educativos)
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  revision_date DATE DEFAULT CURRENT_DATE,
  technical_reviewer_name TEXT,
  technical_reviewer_crmv TEXT,
  is_published BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Tabela: campaigns (Campanhas em formato de folder digital)
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  folder_image_url TEXT,
  summary TEXT NOT NULL,
  full_description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  eligible_audience TEXT,
  included_services TEXT[],
  real_price_or_condition TEXT NOT NULL,
  rules_and_limitations TEXT NOT NULL,
  download_file_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'active', 'ended')),
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Tabela: admin_profiles (Perfis autorizados a acessar o painel)
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE clinic_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Regras para clinic_settings
CREATE POLICY "Leitura pública de configurações da clínica"
  ON clinic_settings FOR SELECT
  USING (true);

CREATE POLICY "Apenas admin autenticado gerencia clinic_settings"
  ON clinic_settings FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_profiles WHERE admin_profiles.id = auth.uid()));

-- Regras para service_categories
CREATE POLICY "Leitura pública de categorias ativas"
  ON service_categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin gerencia service_categories"
  ON service_categories FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_profiles WHERE admin_profiles.id = auth.uid()));

-- Regras para services
CREATE POLICY "Leitura pública de serviços ativos"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin gerencia services"
  ON services FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_profiles WHERE admin_profiles.id = auth.uid()));

-- Regras para faqs
CREATE POLICY "Leitura pública de faqs ativas"
  ON faqs FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin gerencia faqs"
  ON faqs FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_profiles WHERE admin_profiles.id = auth.uid()));

-- Regras para articles
CREATE POLICY "Leitura pública de informativos publicados"
  ON articles FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admin gerencia articles"
  ON articles FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_profiles WHERE admin_profiles.id = auth.uid()));

-- Regras para campaigns
CREATE POLICY "Leitura pública de campanhas"
  ON campaigns FOR SELECT
  USING (status IN ('active', 'ended'));

CREATE POLICY "Admin gerencia campaigns"
  ON campaigns FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_profiles WHERE admin_profiles.id = auth.uid()));

-- Regras para admin_profiles
CREATE POLICY "Usuário autenticado lê seu próprio perfil"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
