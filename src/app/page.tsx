import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Headphones, Repeat, Users } from "lucide-react";
import { Header } from "@/components/quran-memorizer/header";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-start">
                    احفظ القرآن بصوت الشيوخ الذين تحبهم
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl text-start">
                    تجربة فريدة ومحفزة لحفظ ومراجعة القرآن الكريم عبر الاستماع، مع أدوات تساعدك على التركيز والمتابعة.
                  </p>
                  <p className="max-w-[600px] text-muted-foreground pt-2 text-sm text-start">
                    قال رسول الله صلى الله عليه وسلم: "خيركم من تعلم القرآن وعلمه". وقال: "يقال لصاحب القرآن: اقرأ وارتق ورتل كما كنت ترتل في الدنيا، فإن منزلتك عند آخر آية تقرأ بها".
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/memorize">ابدأ الآن</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x600.png"
                width="600"
                height="600"
                alt="Hero"
                data-ai-hint="Quran book calligraphy"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-start">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">أهم المميزات</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">أدوات مصممة لإتقان الحفظ</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  نقدم لك كل ما تحتاجه لتجعل رحلة حفظك للقرآن أكثر سهولة وفعالية.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary p-3 rounded-full text-primary-foreground">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <CardTitle>استماع لآيات مختارة</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>حدد السورة والآيات التي تريد التركيز عليها بسهولة وبدقة.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary p-3 rounded-full text-primary-foreground">
                    <Users className="w-6 h-6" />
                  </div>
                  <CardTitle>اختيار عدة شيوخ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>استمع للآية بأصوات شيوخك المفضلين، ورتبهم كما تحب لتعزيز الحفظ.</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary p-3 rounded-full text-primary-foreground">
                    <Repeat className="w-6 h-6" />
                  </div>
                  <CardTitle>تكرار تلقائي ومحفز</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>تحكم في عدد مرات تكرار كل آية ومع كل شيخ، لتثبيت الحفظ دون عناء.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center h-14 border-t">
        <p className="text-sm text-muted-foreground text-start">&copy; 2024 محفّظ القرآن. كل الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
