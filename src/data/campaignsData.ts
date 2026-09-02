import { CampaignItem } from "@/types";

export const defaultCampaigns: CampaignItem[] = [
  {
    id: "camp-1",
    slug: "campanha-prevencao-checkup-senior",
    title: "Ação de Prevenção e Longevidade do Pet Sênior",
    folderImageUrl: "", // Espaço reservado elegante para o folder real
    summary: "Incentivo ao diagnóstico precoce de alterações renais, cardíacas e articulares em cães e gatos com mais de 7 anos.",
    fullDescription: "Com o avanço da idade, cães e gatos tornam-se mais suscetíveis a patologias silenciosas. Nossa ação educativa busca conscientizar sobre a importância de avaliações preventivas periódicas, proporcionando mais qualidade de vida e longevidade ao animal sênior.",
    startDate: "2026-09-01",
    endDate: "2026-10-31",
    eligibleAudience: "Cães e gatos a partir de 7 anos de idade.",
    includedServices: [
      "Consulta clínica geriátrica completa",
      "Aferição de pressão arterial sistêmica",
      "Avaliação física de mobilidade articular",
      "Orientações de adaptação de ambiente e manejo nutricional para idosos",
    ],
    realPriceOrCondition: "Condição especial de incentivo com agendamento prévio (consulte na recepção)",
    rulesAndLimitations: "Vagas limitadas por dia para garantir a atenção necessária ao paciente sênior. Não inclui exames de imagem adicionais ou procedimentos cirúrgicos, que serão orçados separadamente caso indicados.",
    downloadFileUrl: "",
    status: "active",
    displayOrder: 1,
  },
  {
    id: "camp-2",
    slug: "campanha-protecao-contra-parasitas",
    title: "Campanha Educativa de Proteção Antiparasitária",
    folderImageUrl: "",
    summary: "Orientações sobre prevenção contínua contra pulgas, carrapatos, vermes e doenças transmitidas por vetores.",
    fullDescription: "O controle de ectoparasitas e endoparasitas deve ser contínuo durante todo o ano, prevenindo infecções graves como erliquiose, anaplasmose, verme do coração e zoonoses que afetam pets e suas famílias.",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    eligibleAudience: "Cães e gatos de todas as idades.",
    includedServices: [
      "Triagem dermatológica para detecção de parasitas",
      "Recomendação individualizada de princípio ativo conforme peso e estilo de vida",
    ],
    realPriceOrCondition: "Ação encerrada (Campanha de Agosto)",
    rulesAndLimitations: "Campanha finalizada. Os protocolos preventivos continuam disponíveis regularmente sob avaliação individual.",
    downloadFileUrl: "",
    status: "ended",
    displayOrder: 2,
  },
];
