import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { getUser } from "@/services/auth/auth.server";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Spybee",
  description:
    "Spybee es una aplicacion que te ayuda a monitorear los avances de construccion de tu proyecto, con el fin de que puedas estar al tanto de todo lo que sucede en tu obra.",
};

export default async function RootLayout({ children }) {
  const user = await getUser();
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.className} h-full antialiased`}
    >
      <body className="bg-surface text-on-surface font-body-md overflow-x-hidden antialiased">
        <AuthProvider initialUser={user}>{children}</AuthProvider>
      </body>
    </html>
  );
}
