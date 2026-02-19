import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextTopLoader from 'nextjs-toploader';
import AuthProvider from "@/auth-provider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to Uday Clinic - Comprehensive Healthcare Services",
  description: "Discover Uday Clinic's exceptional healthcare services. We provide quality medical care, preventive health checkups, and personalized treatment plans.",
  keywords: "Uday Clinic,Uday Clinic Jhansi, healthcare, medical services, preventive care, health checkups, personalized treatment",
  authors: [{ name: "Student power club" }],
  robots: "index, follow",
  openGraph: {
    title: "Uday Clinic - Comprehensive Healthcare Services",
    description: "Experience top-notch healthcare at Uday Clinic. We offer a range of medical services and personalized care.",
    url: "https://hospital-bay-rho.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://hospital-bay-rho.vercel.app/_next/image?url=%2Ffavicon.png&w=64&q=75", // Updated image URL
        width: 32,
        height: 32,
        alt: "Uday Clinic Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@UdayClinic",
    title: "Uday Clinic - Comprehensive Healthcare Services",
    description: "Providing exceptional medical care and preventive health solutions.",
    images: "https://hospital-bay-rho.vercel.app/_next/image?url=%2Ffavicon.png&w=64&q=75", // Updated image URL
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background`} suppressHydrationWarning>

        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ToastContainer />
            {children}
            <NextTopLoader />
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
