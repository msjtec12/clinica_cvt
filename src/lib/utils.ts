import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitário padrão para combinar classes do Tailwind de forma segura
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Verifica se um valor foi realmente preenchido ou se ainda é um marcador
 * como "[PREENCHER]", "[NOME DA CLÍNICA]", etc.
 * NUNCA exibe marcadores ao visitante.
 */
export function isFilled(val?: string | null): boolean {
  if (!val) return false;
  const trimmed = val.trim();
  if (!trimmed) return false;
  // Se começa com [ e termina com ] ou contém PREENCHER, considera não preenchido
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) return false;
  if (trimmed.toUpperCase().includes("PREENCHER")) return false;
  return true;
}

/**
 * Retorna o valor real ou um texto neutro e seguro caso não esteja preenchido.
 */
export function getSafeValue(val?: string | null, fallback: string = "Consulte a clínica"): string {
  return isFilled(val) ? (val as string).trim() : fallback;
}

/**
 * Formata valores monetários em Real (BRL).
 */
export function formatCurrency(val?: number | null): string {
  if (typeof val !== "number" || isNaN(val)) return "Consulte";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(val);
}

/**
 * Formata datas ISO (AAAA-MM-DD) para o padrão brasileiro (DD/MM/AAAA).
 */
export function formatDate(dateStr?: string | null): string {
  if (!dateStr || !isFilled(dateStr)) return "";
  try {
    const [year, month, day] = dateStr.split("-");
    if (year && month && day) {
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    }
    const d = new Date(dateStr);
    return d.toLocaleDateString("pt-BR");
  } catch {
    return dateStr;
  }
}

/**
 * Limpa números de telefone, mantendo apenas dígitos
 */
export function cleanPhoneNumber(phone?: string | null): string {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
}

/**
 * Gera um link direto e seguro para o WhatsApp com mensagem contextual.
 * Se o telefone da clínica não estiver cadastrado, redireciona para a página /contato.
 */
export function getWhatsAppLink(phone?: string | null, message?: string): string {
  if (!isFilled(phone)) {
    return "/contato";
  }

  let clean = cleanPhoneNumber(phone);
  // Se não tiver o DDI do Brasil (55) e tiver DDD + número (10 ou 11 dígitos), adiciona 55
  if (clean.length === 10 || clean.length === 11) {
    clean = `55${clean}`;
  }

  const encodedMsg = message ? encodeURIComponent(message.trim()) : "";
  return `https://wa.me/${clean}${encodedMsg ? `?text=${encodedMsg}` : ""}`;
}
