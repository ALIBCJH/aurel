"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { footerNav, siteConfig } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-accent/20">
      <Container className="py-14 sm:py-16">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between"
        >
          <Logo />

          <nav aria-label="Footer" className="flex items-center gap-8">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-foreground/80 transition-colors duration-300 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-foreground/80 transition-colors duration-300 hover:text-accent"
          >
            {siteConfig.email}
          </a>
        </motion.div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted">{siteConfig.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
