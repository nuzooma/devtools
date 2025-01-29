import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "./components/sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevTools Hub - JSON, Time Conversion, Lorem Ipsum Generator",
  description:
    "A comprehensive suite of developer tools including JSON formatter, time converter, and Lorem Ipsum generator. Boost your productivity with our easy-to-use online tools.",
  keywords: "developer tools, JSON formatter, time converter, Lorem Ipsum generator, web development",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devtools-hub.vercel.app/",
    title: "DevTools Hub - Essential Tools for Developers",
    description:
      "Access a suite of powerful developer tools including JSON formatter, time converter, and Lorem Ipsum generator. Streamline your workflow with DevTools Hub.",
    images: [
      {
        url: "https://devtools-hub.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevTools Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Hub - Essential Tools for Developers",
    description:
      "Access a suite of powerful developer tools including JSON formatter, time converter, and Lorem Ipsum generator. Streamline your workflow with DevTools Hub.",
    images: ["https://devtools-hub.vercel.app/og-image.png"],
    creator: "@devtoolshub",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-grow p-6 transition-all duration-300 ease-in-out">
                <div className="mb-4 md:hidden">
                  <SidebarTrigger />
                </div>
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

