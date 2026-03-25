import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ClientLayout from "../client-layout"
import TopBar from "../components/TopBar/TopBar";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";
import { ThemeProvider } from "../components/ThemeProvider/ThemeProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Aptahire",
  description: "Aptahire Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={manrope.variable}>
      <head>
        {/* Preconnect for DM Mono — loaded as non-render-blocking deferred stylesheet */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DM Mono loaded as print then swapped to all — non-render-blocking */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
          media="print"
          // @ts-ignore — onLoad on link is valid HTML5 but not in React types
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
          />
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          <ClientLayout>
             <TopBar/>
                   <Nav />
          {children}     
          <Footer/>
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
