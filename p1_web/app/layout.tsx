import type { Metadata } from "next";
import "./globals.css";
import Header from "@/shared/ui/Header";
import Footer from "@/shared/ui/Footer";
import Notification from "@/shared/ui/Notification";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export const metadata: Metadata = {
  title: "MovieTime",
  description: "MovieTime app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Header routes={[
          { name: "Géneros", path: "/genres" },
          { name: "Plataformas", path: "/platforms" },
          { name: "Directores", path: "/directors" },
          { name: "Películas", path: "/movies" },
          { name: "Actores", path: "/actors" },
        ]} />
        <main className="flex-1 container mx-auto px-4">
          {children}
        </main>
        <Footer />
        <Notification />
      </body>
    </html>
  );
}