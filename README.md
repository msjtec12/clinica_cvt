# Site de Clínica Veterinária — Guia de Configuração e Publicação

Aplicação web completa, moderna e pronta para produção desenvolvida em **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** e **Supabase**, com suporte nativo a fallback estático sem dependência obrigatória inicial do banco de dados.

O projeto foi rigorosamente concebido sob as diretrizes éticas da Medicina Veterinária (CFMV):
- **Sem dados fictícios:** nenhum preço, CRMV, horário, telefone ou nome inventado.
- **Campos `[PREENCHER]`:** se ainda não cadastrados, são ocultados com elegância para os visitantes ou exibem mensagem neutra.
- **Conteúdo educativo:** sem diagnósticos, promessas de cura ou prescrição de dosagens online.

---

## 1. Como Preencher os Dados Reais da Clínica

Todo o conteúdo inicial seguro da clínica está centralizado em `src/data/clinicData.ts`. Para colocar sua clínica no ar de imediato mesmo sem conectar ao Supabase:

1. Abra o arquivo `src/data/clinicData.ts`.
2. Substitua os campos marcados como `[PREENCHER]` pelos dados oficiais da clínica:
   ```typescript
   export const defaultClinicData: ClinicSettings = {
     name: "Nome Real da Sua Clínica",
     shortDescription: "Cuidado e saúde animal humanizada",
     logo: "/images/logo.png", // ou URL da logo
     whatsapp: "(11) 99999-9999",
     phone: "(11) 3333-3333",
     email: "contato@suaclinica.com.br",
     address: "Rua Exemplo, 123 - Bairro",
     mapsUrl: "https://maps.google.com/...",
     openingHours: "Segunda a Sexta das 8h às 19h | Sábados das 8h às 13h",
     emergencyCare: "Não realizamos atendimento 24h. Urgências no horário de funcionamento.",
     emergencyReferenceContact: "Hospital Vet 24h Parceiro: (11) 99999-0000",
     acceptedSpecies: "Cães e Gatos",
     paymentMethods: "Pix, Cartões de Débito e Crédito em até 6x",
     instagram: "@suaclinicavet",
     responsibleVeterinarian: "Dra. Nome da Veterinária",
     crmv: "CRMV-SP 12.345",
     city: "São Paulo/SP",
     // ...
   };
   ```
3. O mesmo vale para o catálogo de serviços em `src/data/servicesData.ts`, perguntas em `src/data/faqsData.ts`, campanhas em `src/data/campaignsData.ts` e informativos em `src/data/articlesData.ts`.

---

## 2. Como Configurar o Supabase (Opcional / Recomendado para Gestão Dinâmica)

O site funciona 100% de forma estática sem o Supabase. No entanto, para permitir que sua equipe altere serviços, preços, campanhas e avisos pelo painel `/admin` sem editar código:

1. Crie um projeto gratuito em [supabase.com](https://supabase.com).
2. No painel do Supabase, acesse **SQL Editor** e execute o script contido em:
   ```
   supabase/schema.sql
   ```
   *(Este script cria as tabelas `clinic_settings`, `services`, `service_categories`, `faqs`, `articles`, `campaigns` e `admin_profiles`, além de configurar políticas rigorosas de Row Level Security - RLS).*
3. Em **Project Settings > API**, copie a **Project URL** e a **anon / public key**.
4. Crie um arquivo `.env.local` na raiz do projeto com esses valores:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-publica
   ```

---

## 3. Como Cadastrar o Primeiro Administrador

1. No painel do Supabase, acesse **Authentication > Users** e clique em **Add user > Create user**.
2. Insira o e-mail do administrador (ex: `admin@suaclinica.com.br`) e defina uma senha segura.
3. No **SQL Editor** do Supabase, vincule o ID do usuário criado à tabela de administradores executando:
   ```sql
   INSERT INTO admin_profiles (id, full_name, email, role)
   VALUES ('UUID_DO_USUARIO_CRIADO', 'Nome do Administrador', 'admin@suaclinica.com.br', 'admin');
   ```
4. Acesse `/admin` no seu site e faça login com essas credenciais para gerenciar a clínica.

---

## 4. Como Testar Localmente

```bash
# 1. Instalar as dependências
npm install

# 2. Executar a checagem de tipos
npm run typecheck

# 3. Rodar em ambiente de desenvolvimento
npm run dev

# 4. Testar a compilação de produção
npm run build
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 5. Como Publicar na Vercel

1. Suba o código do repositório para o GitHub ou GitLab.
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New > Project**.
3. Selecione o repositório do projeto.
4. (Caso use o Supabase) Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Clique em **Deploy**.
6. A Vercel criará automaticamente uma URL com SSL ativo, CDN global e geração estática ultrarrápida.

---

## 6. Diretrizes Éticas do CFMV Atendidas

- Não promete resultados nem comercializa pacotes com preços artificiais.
- Todos os serviços cirúrgicos e vacinais destacam a obrigatoriedade da avaliação médica prévia.
- Botões de WhatsApp utilizam mensagens contextuais e respeitosas.
- O formulário web não aceita relatos para triagem nem oferece diagnóstico à distância.
- Todos os informativos contam com aviso claro de que não substituem o atendimento presencial.
