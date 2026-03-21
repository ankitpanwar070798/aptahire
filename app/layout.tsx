import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "../client-layout"
import TopBar from "../components/TopBar/TopBar";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";


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
    <html lang="en">
      <body>
        <ClientLayout>
           <TopBar/>
                 <Nav />
        {children}     
        <Footer/>
        </ClientLayout>
      </body>
    </html>
  );
}
