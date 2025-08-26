import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

export const metadata: Metadata = {
  title: 'صاحب القرآن',
  description: 'تجربة فريدة ومُلهمة لحفظ ومراجعة القرآن الكريم عبر تكرار السماع للايات وحفظها من خلال تكرار الاية بصوت اكثر من شيخ.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Cairo:wght@400;700&display=swap" rel="stylesheet" />
        <link
          rel="icon"
          type="image/png"
          href="https://img.icons8.com/external-bzzricon-outline-bzzricon-studio/64/external-quran-ramadan-bzzricon-outline-bzzricon-outline-bzzricon-studio.png"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
