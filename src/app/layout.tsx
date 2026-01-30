import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Fadime Cenik - Physikalische Medizin & Rehabilitation",
  description: "Fachärztin für Physikalische Medizin & Rehabilitation in Wien. Spezialisierte Therapien mit modernen Technologien.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
