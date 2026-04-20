import type { Metadata } from "next";
import { Nabla, MedievalSharp } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VideoBackground from "@/components/layout/VideoBackground";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { AudioProvider } from "@/lib/audio/AudioContext";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/animations/CustomCursor";
import LoadingScreen from "@/components/animations/LoadingScreen";

const nabla = Nabla({
  variable: "--font-nabla",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const medievalSharp = MedievalSharp({
  variable: "--font-medieval-sharp",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PISTON",
  description: "Official website of piston music collective. Experience the sound, explore the visuals.",
  keywords: ["piston", "music collective", "electronic music", "experimental"],
  authors: [{ name: "piston" }],
  openGraph: {
    title: "PISTON",
    description: "Official website of piston music collective. Experience the sound, explore the visuals.",
    type: "website",
    siteName: "piston",
  },
  twitter: {
    card: "summary_large_image",
    title: "PISTON",
    description: "Official website of piston music collective. Experience the sound, explore the visuals.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
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
      className={`${nabla.variable} ${medievalSharp.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <AudioProvider>
          <LoadingScreen />
          <VideoBackground />
          <CustomCursor />
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
            <AudioPlayer />
          </SmoothScroll>
        </AudioProvider>
      </body>
    </html>
  );
}
