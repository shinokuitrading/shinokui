import { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className }: Props) {
  return (
    <section
      id={id}
      className={`section-padding section-narrow ${className ?? ""}`}
    >
      {children}
    </section>
  );
}