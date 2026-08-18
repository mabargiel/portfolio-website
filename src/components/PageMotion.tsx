"use client";

import { useEffect } from "react";

const REVEAL_MARGIN = "0px 0px -15% 0px";
// A band across the middle, so one section is current rather than every
// section that happens to be on screen.
const SPY_MARGIN = "-45% 0px -45% 0px";
const COUNT_MS = 900;

function revealOnEntry(): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("reveal-in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: REVEAL_MARGIN },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  return observer;
}

function markCurrentSection(): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const link = document.querySelector(
          `nav a[href="#${entry.target.id}"]`,
        );
        if (!link) continue;
        link.classList.toggle("is-current", entry.isIntersecting);
        link.toggleAttribute("aria-current", entry.isIntersecting);
      }
    },
    { rootMargin: SPY_MARGIN },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => observer.observe(section));
  return observer;
}

function countUpToWrittenValue(): IntersectionObserver {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);

      const element = entry.target;
      const written = element.textContent ?? "";
      const digits = /^\d+/.exec(written);
      if (!digits) continue;

      const target = Number(digits[0]);
      const suffix = written.slice(digits[0].length);
      const began = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - began) / COUNT_MS);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  });
  document
    .querySelectorAll("[data-countup]")
    .forEach((el) => observer.observe(el));
  return observer;
}

export function PageMotion() {
  useEffect(() => {
    const observers = [
      revealOnEntry(),
      markCurrentSection(),
      countUpToWrittenValue(),
    ];
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return null;
}
