"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { SocialIcon } from "@/components/icons";
import {
  footerColumns,
  legalLinks,
  siteConfig,
  socialLinks,
} from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function Footer() {
  const year = 2026; // Rendered statically; update per build if desired.

  return (
    <footer className="mt-auto border-t border-border bg-surface-muted/40">
      <Container className="py-16 sm:py-20">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Top: brand + link columns */}
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-5 text-sm leading-relaxed text-muted">
                {siteConfig.tagline}. We help ambitious businesses evolve
                through software, AI, and modern digital experiences.
              </p>
              <div className="mt-6 flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <SocialIcon name={social.icon} width={18} height={18} />
                  </a>
                ))}
              </div>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-eyebrow font-sans text-muted">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/80 transition-colors duration-300 hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-eyebrow font-sans text-muted">Social</h3>
              <ul className="mt-5 space-y-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground/80 transition-colors duration-300 hover:text-accent"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <ul className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
