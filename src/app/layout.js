import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { IncidentProvider } from "../context/incidentsContext";
import { Layout } from "./components/layouts/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Spybee",
  description: "Spybee es una aplicacion que te ayuda a monitorear los avances de construccion de tu proyecto, con el fin de que puedas estar al tanto de todo lo que sucede en tu obra.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <IncidentProvider>
          <Layout pageTitle="Dashboard">{children}</Layout>
        </IncidentProvider>
      </body>
    </html>
  );
}
