import type { Metadata } from "next";
import "igniteui-react-grids/grids/themes/light/bootstrap.css";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orders Management System",
  description:
    "Frontend for managing orders, products and customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        className="
          min-h-screen
          flex
          flex-col
          bg-slate-50
          text-slate-900
          antialiased
        "
      >
        {/* 🔝 NAVBAR */}
        <header
          className="
            sticky
            top-0
            z-50
            border-b
            border-slate-200
            bg-white/80
            backdrop-blur-md
          "
        >
          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              py-4
              flex
              items-center
              justify-between
              gap-4
            "
          >
            {/* 🔹 LOGO */}
            <Link
              href="/dashboard"
              className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              Orders System
            </Link>

            {/* 🔹 NAVIGATION */}
            <nav
              className="
                flex
                items-center
                gap-2
                flex-wrap
              "
            >
              <Link
                href="/dashboard"
                className="
                  px-4 py-2
                  rounded-xl
                  text-sm
                  font-medium
                  text-slate-700
                  transition-all
                  duration-200
                  hover:bg-slate-200
                  hover:text-slate-900
                "
              >
                Dashboard
              </Link>

              <Link
                href="/orders"
                className="
                  px-4 py-2
                  rounded-xl
                  text-sm
                  font-medium
                  text-slate-700
                  transition-all
                  duration-200
                  hover:bg-slate-200
                  hover:text-slate-900
                "
              >
                Orders
              </Link>

              <Link
                href="/products"
                className="
                  px-4 py-2
                  rounded-xl
                  text-sm
                  font-medium
                  text-slate-700
                  transition-all
                  duration-200
                  hover:bg-slate-200
                  hover:text-slate-900
                "
              >
                Products
              </Link>

               <Link
                href="/error"
                className="
                  px-4 py-2
                  rounded-xl
                  text-sm
                  font-medium
                  text-slate-700
                  transition-all
                  duration-200
                  hover:bg-slate-200
                  hover:text-slate-900
                "
              >
                Errores
              </Link>
            </nav>
          </div>
        </header>

        {/* 📦 CONTENIDO */}
        <main
          className="
            flex-1
            w-full
            max-w-7xl
            mx-auto
            px-6
            py-8
          "
        >
          {children}
        </main>

        {/* 🔻 FOOTER */}
        <footer
          className="
            border-t
            border-slate-200
            bg-white
          "
        >
          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              py-5
              flex
              items-center
              justify-between
              gap-4
              flex-wrap
            "
          >
            <p
              className="
                text-sm
                text-slate-500
              "
            >
              © 2026 Orders Management by 
            </p>

            <div
              className="
                flex
                items-center
                gap-4
                text-sm
              "
            >
              <Link
                href="/dashboard"
                className="
                  text-slate-500
                  hover:text-slate-900
                  transition-colors
                "
              >
                
              </Link>

              <Link
                href="/orders"
                className="
                  text-slate-500
                  hover:text-slate-900
                  transition-colors
                "
              >
                Samuel Sierra
              </Link>

              <Link
                href="/products"
                className="
                  text-slate-500
                  hover:text-slate-900
                  transition-colors
                "
              >
                Sergio Gomez
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}