import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookCheck, BookHeart, ChevronsRight, Crown, Feather, FileText, Gift, Handshake, ShieldCheck, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import { Header } from "@/components/quran-memorizer/header";

export default function LandingPage() {
  const features = [
    {
      icon: <BookCheck className="w-8 h-8" />,
      title: "سنة متبعة",
      description: "حفظ القرآن سنة متبعة، فالنبي ﷺ حفظه وكان يراجعه جبريل عليه السلام سنويًا.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "نجاة من النار",
      description: "قال النبي ﷺ: 'لو جمع القرآن في إهاب ما أحرقه الله بالنار'.",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "شفاعة يوم القيامة",
      description: "القرآن يأتي يوم القيامة شفيعاً لأصحابه.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "رفعة في الجنة",
      description: "يرتقي حافظ القرآن في درجات الجنة بمنزلته عند آخر آية يقرؤها.",
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "إجلال وتعظيم",
      description: "إكرام حامل القرآن من إجلال الله تعالى.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "أهل الله وخاصته",
      description: "حفظة القرآن هم أهل الله وخاصته.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "رفعة في الدنيا والآخرة",
      description: "يرفع الله بحفظ القرآن أقواماً.",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "التقديم في إمامة الصلاة",
      description: "يؤم القوم أقرؤهم لكتاب الله.",
    },
    {
      icon: <Feather className="w-8 h-8" />,
      title: "مع السفرة الكرام البررة",
      description: "الماهر بالقرآن مع السفرة الكرام البررة.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "الغبطة الحقيقية",
      description: "لا حسد إلا في اثنتين، ومنها رجل آتاه الله الكتاب وقام به آناء الليل والنهار.",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "خير من الدنيا وما فيها",
      description: "تعلم آيتين من كتاب الله خير من خير الإبل.",
    },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-24 pb-32 md:pt-32 md:pb-40">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
            <Image
                src="https://placehold.co/1920x1080.png"
                layout="fill"
                objectFit="cover"
                alt="Madinah Mosque"
                data-ai-hint="prophet mosque madinah"
                className="opacity-20"
            />
            <div className="container px-4 md:px-6 relative z-20">
                <div className="flex flex-col items-center space-y-6 text-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline text-primary">
                            القرآن جنة في صدر حافظه
                        </h1>
                        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                            تجربة فريدة ومحفزة لحفظ ومراجعة القرآن الكريم عبر الاستماع، مع أدوات تساعدك على التركيز والمتابعة.
                        </p>
                    </div>
                    <Button asChild size="lg" className="group">
                        <Link href="/memorize">
                            ابدأ رحلة الحفظ الآن
                            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Introduction Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-3 lg:gap-12 items-center">
                <div className="flex flex-col justify-center space-y-4 lg:col-span-2">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">فضل حفظ القرآن</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                            في حفظ القرآن الكريم تحقيق لوعد الله بحفظه في السطور والصدور. فلو حاول إنسان أن يحرف ما في السطور، لرده الحفاظ الذين حفظوه في الصدور. الحافظ للقرآن يقيم بما يحفظ الحجة على المخالف، والقرآن جنة في صدر حافظه أنى ذهب كانت معه.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <BookHeart className="w-32 h-32 text-primary/20" />
                </div>
            </div>
          </div>
        </section>

        {/* Virtues Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">فضائل وفوائد لا تعد</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  لحفظ القرآن الكريم فضائل عظيمة وفوائد جليلة في الدنيا والآخرة.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-none gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:max-w-none mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="flex flex-col items-center text-center p-6 bg-card hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                  <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="mb-2 text-xl font-headline">{feature.title}</CardTitle>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center mt-12 text-lg text-muted-foreground">
                <p>والله أعلم.</p>
             </div>
          </div>
        </section>

      </main>
      <footer className="flex items-center justify-center h-14 border-t bg-card">
        <p className="text-sm text-muted-foreground text-center">&copy; 2024 محفّظ القرآن. كل الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
