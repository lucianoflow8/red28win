import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casino 24HS",
  description: "Creá tu cuenta enviándonos un WhatsApp",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
