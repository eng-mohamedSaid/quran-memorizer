import Link from "next/link";
import { BookHeart } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-card/50 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
        <BookHeart className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg font-headline">صاحب القرآن</span>
      </Link>
      <nav className="ms-auto flex gap-4 sm:gap-6 items-center">
        <Button variant="ghost" asChild>
          <Link href="/" prefetch={false}>
            الرئيسية
          </Link>
        </Button>
         <Button asChild>
          <Link href="/memorize" prefetch={false}>
            ابدأ الحفظ
          </Link>
        </Button>
        <ThemeToggle />
      </nav>
    </header>
  );
}
