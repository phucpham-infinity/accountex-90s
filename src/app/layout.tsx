import { Outfit } from "next/font/google";
import "./globals.css";
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
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
