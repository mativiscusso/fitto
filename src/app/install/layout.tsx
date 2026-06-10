import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instalar Fitto - PWA",
  description: "Instrucciones para instalar Fitto como app en tu dispositivo",
};

export default function InstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}