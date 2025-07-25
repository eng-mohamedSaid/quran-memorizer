import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Flame, Gift, Headphones, Milestone, Repeat, ShieldCheck, Speaker, Star, Users, BrainCircuit, HeartHandshake } from "lucide-react";
import { Header } from "@/components/quran-memorizer/header";

export default function LandingPage() {
  const virtues = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "أهل الله وخاصّته",
      description: 'قال ﷺ: "إنَّ للهِ أهلين منَ الناسِ... أهلُ القرآنِ هم أهلُ اللهِ وخاصَّتُه".',
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: "نجاة من النار",
      description: 'قال ﷺ: "لو جُمع القرآنُ في إهابٍ ما أحرقه الله بالنار".',
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "شفيع يوم القيامة",
      description: "قال ﷺ: “اقرَؤوا القرآنَ، فإنَّهُ يأتي يومَ القيامةِ شفيعًا لأصحابِه”.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "الرفعة في الدنيا والآخرة",
      description: "قال ﷺ: “إنَّ اللهَ يرفعُ بهذا الكتابِ أقوامًا، ويضعُ به آخرين”.",
    },
    {
      icon: <Speaker className="w-8 h-8" />,
      title: "الإمامة لمن قرأ أكثر",
      description: "قال ﷺ: “يؤمُّ القومَ أقرؤهم لكتابِ اللهِ”.",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "خير من الدنيا وما فيها",
      description: 'قال ﷺ: "لأن يغدو أحدكم فيتعلم آيتين من كتاب الله خير له من ناقتين...".',
    },
  ];

  const howItWorks = [
    {
      icon: <Headphones className="w-10 h-10" />,
      step: "استمع",
      description: "اختر السورة والآيات والقارئ المفضل لديك."
    },
    {
      icon: <BrainCircuit className="w-10 h-10" />,
      step: "ركّز",
      description: "عش مع الآيات بقلبك وسمعك."
    },
    {
      icon: <Repeat className="w-10 h-10" />,
      step: "كرّر",
      description: "استخدم نظام التكرار لترسيخ الحفظ."
    },
    {
      icon: <Milestone className="w-10 h-10" />,
      step: "احفظ",
      description: "تابع تقدمك اليومي وحقق أهدافك."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-24 pb-32 md:pt-32 md:pb-40 text-center overflow-hidden">
            <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
                style={{backgroundImage: "url('/islamic-pattern.svg')"}}
            />
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
            <div className="container px-4 md:px-6 relative z-20">
                <div className="flex flex-col items-center space-y-6">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline text-primary">
                        القرآن جَنّةٌ في صدر حافظه
                    </h1>
                    <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                        تجربة فريدة ومُلهمة لحفظ ومراجعة القرآن الكريم عبر الاستماع، مع أدوات ذكية تُعينك على التركيز، وتُسهّل عليك متابعة الحفظ والمراجعة.
                    </p>
                    <div className="flex items-center gap-4 text-lg sm:text-xl font-semibold text-primary">
                      <span>🔊 استمع</span>
                      <span className="text-muted-foreground/50">·</span>
                      <span>🧠 ركّز</span>
                      <span className="text-muted-foreground/50">·</span>
                      <span>💬 كرّر</span>
                       <span className="text-muted-foreground/50">·</span>
                      <span>🕋 احفظ</span>
                    </div>
                    <Button asChild size="lg" className="group mt-4">
                        <Link href="/memorize">
                            ابدأ رحلتك المباركة الآن
                            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Virtues Section */}
        <section id="virtues" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                 <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm font-medium">﴿ إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ ﴾</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">من فضائل حفظ القرآن</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    حفظ القرآن الكريم هو تحقيق لوعد الله بحفظ كتابه في الصدور، كما في السطور. حافظ القرآن يقيم الحُجّة، ويرفع الله به أقواماً.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-none gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:max-w-none mt-12">
              {virtues.map((virtue, index) => (
                <Card key={index} className="flex flex-col items-center text-center p-6 bg-card hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                  <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                    {virtue.icon}
                  </div>
                  <CardTitle className="mb-2 text-xl font-headline">{virtue.title}</CardTitle>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">{virtue.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
         <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">احفظ القرآن... بقلبك وأُذنك</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        خطوات بسيطة ومنهجية لتجعل الحفظ أسهل وأكثر ثباتًا.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {howItWorks.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center space-y-3">
                        <div className="flex items-center justify-center bg-primary/10 text-primary rounded-full w-20 h-20 mb-4">
                           {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold font-headline">{index + 1}. {item.step}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
            </div>
        </section>

        {/* About Us Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="flex flex-col justify-center space-y-4 text-center lg:text-right">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">من نحن؟</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                           صاحب القرآن هو موقع يهدف إلى نشر حفظ كتاب الله بأسلوب سهل وفعّال، مستمد من السنة المطهّرة، يساعد المسلم على بناء علاقة يومية مع القرآن، ويجعله "صاحبًا" حقيقيًا له في الدنيا والآخرة.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <HeartHandshake className="w-32 h-32 text-primary/20" />
                </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-20">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">انضم الآن وكن من أهل الله وخاصّته</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        ابدأ رحلتك المباركة اليوم.
                    </p>
                    <Button asChild size="lg" className="group">
                        <Link href="/memorize">
                            ابدأ الحفظ الآن
                            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <footer className="flex flex-col items-center justify-center h-20 border-t bg-card space-y-2">
        <p className="text-sm text-muted-foreground text-center">© 2025 صاحب القرآن. جميع الحقوق محفوظة.</p>
        <p className="text-xs text-muted-foreground/80">📍 صنع بحب في بلاد المسلمين</p>
      </footer>
    </div>
  );
}
