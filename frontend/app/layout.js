import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quoi regarder ? - Trouvez votre film parfait",
  description: "Découvrez des films selon vos critères ou laissez le hasard décider. Base de données TMDb avec notation et filtres avancés.",
  keywords: "films, cinéma, recommandation, TMDb, aléatoire",
  authors: [{ name: "Quentin Rohart" }],
  openGraph: {
    title: "Quoi regarder ?",
    description: "Trouvez le film parfait selon vos envies",
    type: "website",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
