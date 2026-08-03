"use client";

import { useEffect } from "react";

/**
 * RevealObserver — the single engine behind every entrance animation.
 *
 * Rather than mounting a motion component per element, the whole site marks
 * elements with `data-reveal` on the server and this one observer adds `.is-in`
 * as they enter the viewport. The animation itself is pure CSS (see the REVEAL
 * SYSTEM block in globals.css).
 *
 * Why this shape:
 *  - Sections stay server components — no client boundary per revealed block.
 *  - Without JavaScript the copy is simply visible (the CSS that hides it is
 *    scoped to `html.js`), so crawlers and no-JS visitors see a complete page.
 *  - A MutationObserver picks up nodes added later (route changes, menus).
 */
export function RevealObserver() {
  useEffect(() => {
    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      // Fire a touch before the element is fully on screen so the motion
      // completes roughly as it settles into the reader's view.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    const register = (root: ParentNode) => {
      const nodes = root.querySelectorAll<HTMLElement>("[data-reveal]");
      for (const node of nodes) {
        if (seen.has(node) || node.classList.contains("is-in")) continue;
        seen.add(node);
        // Anything already above the fold on load reveals immediately rather
        // than waiting for a scroll that may never come.
        const box = node.getBoundingClientRect();
        if (box.top < window.innerHeight * 0.92 && box.bottom > 0) {
          node.classList.add("is-in");
          continue;
        }
        io.observe(node);
      }
    };

    register(document);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== 1) continue;
          const element = node as HTMLElement;
          if (element.hasAttribute?.("data-reveal")) register(element.parentNode ?? document);
          else register(element);
        }
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
