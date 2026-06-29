import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "UnderTree Restaurant | Fresh Premium Nigerian Street Foods & Drinks",
  description: "Enjoy freshly prepared premium Akara, Awara, Roasted & Boiled Maize, Popcorn, and refreshing Cold Zobo. Pure comfort food served under a beautiful tree.",
  keywords: "UnderTree, Nigerian street food, Akara, Awara, Zobo, roasted maize, popcorn, Lagos street food, Abuja street food, fresh food",
  openGraph: {
    title: "UnderTree Restaurant | Fresh Premium Nigerian Street Foods & Drinks",
    description: "Enjoy freshly prepared premium Akara, Awara, Roasted & Boiled Maize, Popcorn, and refreshing Cold Zobo.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-[#F7F4EB] bg-[#0D1F14] bg-grain min-h-screen relative selection:bg-[#D8BE7A] selection:text-[#0D1F14]">
        {children}
      </body>
    </html>
  );
}
