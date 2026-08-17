import type { ReactNode } from "react";

export function CvSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className="text-cv-accent border-cv-rule mb-2.5 border-b pb-1 text-[8.5pt] font-medium tracking-wide uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
