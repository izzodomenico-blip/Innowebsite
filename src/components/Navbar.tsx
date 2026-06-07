"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatedButton } from "./AnimatedButton";
import { cn } from "@/lib/utils";
import { navigation } from "@/content/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300",
        scrolled
          ? "border-line bg-zinc-950/85 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)]"
          : "border-transparent bg-zinc-950/60"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo-innotec.png"
              alt="INNO.TEC"
              width={360}
              height={86}
              priority
              className="h-7 w-auto"
            />
          </Link>

          {/* Navigazione desktop */}
          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/area-clienti"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Area Clienti
            </Link>
            <Link href="#contatti">
              <AnimatedButton size="sm" glow>
                Contattaci
              </AnimatedButton>
            </Link>
          </div>

          {/* Toggle menu mobile */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Chiudi il menu" : "Apri il menu"}
            className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="border-b border-line bg-zinc-950 px-6 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-4 space-y-3 border-t border-line pt-4">
            <Link
              href="/area-clienti"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              Area Clienti
            </Link>
            <Link href="#contatti" onClick={() => setIsOpen(false)}>
              <AnimatedButton size="lg" glow className="w-full justify-center">
                Contattaci
              </AnimatedButton>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
