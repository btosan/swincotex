import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swincotex.com"),
  title: {
    default: "Swincotex Energy | Oil & Gas Engineering, EPC & Field Services",
    template: "%s | Swincotex Energy",
  },
  description:
    "Swincotex Oil and Gas Company Limited delivers process, mechanical, civil, and inspection engineering, EPC, and well head services to the Nigerian oil and gas industry from our fabrication yard in Warri, Delta State.",
  keywords: [
    "Swincotex Energy",
    "oil and gas Nigeria",
    "EPC Warri",
    "well head services",
    "pipeline construction Nigeria",
    "fabrication yard Warri",
  ],
  openGraph: {
    title: "Swincotex Energy | Oil & Gas Engineering, EPC & Field Services",
    description:
      "Technical and labour supply services to the oil and gas industry, based in Warri, Delta State, Nigeria.",
    url: "https://swincotex.com",
    siteName: "Swincotex Energy",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
