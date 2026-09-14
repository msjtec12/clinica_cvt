"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, HelpCircle, MapPin, Stethoscope } from "lucide-react";

const items = [
  { href: "/", label: "Início", icon: HeartPulse },
  { href: "/servicos", label: "Serviços", icon: Stethoscope },
  { href: "/duvidas", label: "Dúvidas", icon: HelpCircle },
  { href: "/contato", label: "Contato", icon: MapPin },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl md:hidden"
      aria-label="Acesso rápido"
    >
      <div className="mx-auto grid max-w-md grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-lg px-1 text-[10px] font-semibold transition-colors ${
                active ? "text-petrol-900" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-petrol-800" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
