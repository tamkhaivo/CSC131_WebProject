import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Navbar from "~/app/_components/nav";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Pass the Test",
  description: "You can pass the test~ Studying made easier and straightforward!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Navbar/>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
