import type { Metadata } from "next";
import { Montserrat, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { Providers } from "../components/providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Shipon Chowdhury - Frontend Developer",
  description: "Shipon Chowdhury, a skilled Frontend Developer creating fast, responsive, and user-friendly web applications.",
  icons: {
    icon: "/profile/shipon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${poppins.variable} ${playfair.variable} antialiased bg-background`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
