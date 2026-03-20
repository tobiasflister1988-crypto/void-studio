import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThinkTank — KI-Content & Social Media",
  description: "KI-Content. Social Media. Ergebnisse. Für Unternehmen, die mehr wollen als nur Präsenz.",
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
