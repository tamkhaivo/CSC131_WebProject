import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import Footer from "../_components/footer";
import Navbar from "../_components/nav";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Contact Us - Pass the Test",
  description: "Contact Us at PassTheTest.com!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <Navbar />
            {children}
            <Footer />
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
