import "./globals.css";

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
        <Navigation />

        <div className="container mx-auto mt-10">{children}</div>
      </body>
    </html>
  );
}
