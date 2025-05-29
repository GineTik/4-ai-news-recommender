import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "./layouts";

export const metadata: Metadata = {
  title: "NovynyAI",
  description:
    "NovynyAI - це інноваційний сервіс, який використовує штучний інтелект для надання нових, оригінальних та актуальних новин.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
