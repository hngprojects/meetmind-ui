import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RightSideLayout({ children }: Props) {
  return (
    <div className="md:rounded-xl md:overflow-hidden h-full">{children}</div>
  );
}
