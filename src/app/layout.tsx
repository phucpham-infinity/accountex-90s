import { Lexend } from "next/font/google";
import "./globals.css";
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

const lexend = Lexend({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${lexend.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
            <Toaster position="top-right" />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
