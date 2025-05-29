"use client";

import { Suspense } from "react";
import { Header } from "./header";
import { Geist } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/query-provider";
import { Toaster } from "@/shared/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          href="https://fonts.cdnfonts.com/css/gilroy-bold"
          rel="stylesheet"
        ></link>
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            {children}
            <Toaster position="top-right" />
          </Suspense>
        </QueryClientProvider>
      </body>
    </html>
  );
};
