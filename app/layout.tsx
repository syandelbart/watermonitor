import "./globals.css";

import Navigation from "./components/NavBar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Inter } from "next/font/google";

import Navigation from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
        {children}
        </UserProvider>
      </body>
    </html>
  );
}
