import "../styles/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL to Video",
  description: "Make URL to Video",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background flex items-center">{children}</body>
    </html>
  );
}
