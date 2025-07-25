
"use client";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { getSurahs, getAudioEditions, getAyahsForSurah, getTranslationForSurah, getAudioForAyah } from "@/lib/api";
import type { Surah, AudioEdition, CombinedAyahData } from "@/lib/types";
import useLocalStorage from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getTafsir } from "@/ai/flows/get-tafsir";
import { toast } from "@/hooks/use-toast";
import { Play, Pause, SkipBack, SkipForward, Repeat, Repeat1, BookOpen, ChevronUp, ChevronDown, Trash2, Eye, EyeOff } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type PlaybackMode = 'byAyah' | 'bySelection';

interface Settings {
  surah: number;
  fromAyah: number;
  toAyah: number;
  repetitions: number;
  selectedReciters: string[];
  autoScroll: boolean;
  loop: boolean;
  playbackMode: PlaybackMode;
  showAyahs: boolean;
}

interface PlaylistItem {
  surah: number;
  ayah: number;
  reciterId: string;
}

export function MemorizeView() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [audioEditions, setAudioEditions] = useState<AudioEdition[]>([]);
  const [ayahsData, setAyahsData] = useState<CombinedAyahData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [settings, setSettings] = useLocalStorage<Settings>("quran-memorizer-settings", {
    surah: 1,
    fromAyah: 1,
    toAyah: 7,
    repetitions: 3,
    selectedReciters: ["ar.alafasy"],
    autoScroll: true,
    loop: false,
    playbackMode: 'bySelection',
    showAyahs: true,
  });
  
  const { surah, fromAyah, toAyah, repetitions, selectedReciters, autoScroll, loop, playbackMode, showAyahs } = settings;

  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentAyahRef = useRef<HTMLDivElement>(null);
  
  const [tafsir, setTafsir] = useState<{ [key: string]: string }>({});
  const [isTafsirLoading, setIsTafsirLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  

  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [surahsRes, editionsRes] = await Promise.all([getSurahs(), getAudioEditions()]);
        setSurahs(surahsRes);
        setAudioEditions(editionsRes);
      } catch (error) {
        console.error("Failed to load initial data", error);
        toast({ variant: "destructive", title: "خطأ", description: "فشل تحميل البيانات الأساسية" });
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const loadAyahs = useCallback(async (surahNumber: number) => {
    if (!showAyahs) {
        setAyahsData([]);
        return;
    }
    try {
      const [ayahsRes, transRes] = await Promise.all([getAyahsForSurah(surahNumber), getTranslationForSurah(surahNumber)]);
      const combined = ayahsRes.map(ayah => ({
          numberInSurah: ayah.numberInSurah,
          arabicText: ayah.text,
          englishText: transRes.find(t => t.numberInSurah === ayah.numberInSurah)?.text || ""
      }));
      setAyahsData(combined);
    } catch (error) {
      console.error("Failed to load ayahs", error);
      toast({ variant: "destructive", title: "خطأ", description: "فشل تحميل الآيات" });
    }
  }, [showAyahs]);

  useEffect(() => {
    if (surah) {
        loadAyahs(surah);
    }
  }, [surah, loadAyahs]);
  
  useEffect(() => {
    const newPlaylist: PlaylistItem[] = [];
    if (fromAyah <= toAyah && selectedReciters.length > 0) {
        if (playbackMode === 'byAyah') {
            for (let ayah = fromAyah; ayah <= toAyah; ayah++) {
                for (let i = 0; i < repetitions; i++) {
                    for (const reciterId of selectedReciters) {
                        newPlaylist.push({ surah, ayah, reciterId });
                    }
                }
            }
        } else { // bySelection
            for (const reciterId of selectedReciters) {
                for (let i = 0; i < repetitions; i++) {
                    for (let ayah = fromAyah; ayah <= toAyah; ayah++) {
                        newPlaylist.push({ surah, ayah, reciterId });
                    }
                }
            }
        }
    }
    setPlaylist(newPlaylist);
    setCurrentTrackIndex(0);
}, [fromAyah, toAyah, selectedReciters, repetitions, surah, playbackMode]);

  const playNext = useCallback(() => {
    setCurrentTrackIndex(prevIndex => {
      if (prevIndex < playlist.length - 1) {
        return prevIndex + 1;
      }
      if (loop) {
        return 0;
      }
      setIsPlaying(false);
      return prevIndex;
    });
  }, [playlist.length, loop]);
  
  useEffect(() => {
    const playTrack = async (index: number) => {
      if (!audioRef.current || index >= playlist.length) {
        setIsPlaying(false);
        return;
      }
      
      const track = playlist[index];
      try {
        const audioData = await getAudioForAyah(track.surah, track.ayah, track.reciterId);
        if (audioData?.audio && audioRef.current) {
          audioRef.current.src = audioData.audio;
          if(isPlaying) {
             await audioRef.current.play().catch(e => {
                console.error("Audio play failed:", e);
                setIsPlaying(false);
             });
          }
        } else {
          playNext();
        }
      } catch (e) {
        toast({ variant: "destructive", title: "خطأ", description: "لا يمكن تشغيل الملف الصوتي" });
        playNext();
      }
    };

    if (isPlaying && playlist.length > 0 && currentTrackIndex < playlist.length) {
      playTrack(currentTrackIndex);
    } else if (!isPlaying) {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex, playlist, playNext]);
  
  const handleAudioEnded = useCallback(() => {
    playNext();
  }, [playNext]);

  const handlePlayPause = () => {
    if (playlist.length > 0) {
      setIsPlaying(prev => !prev);
    }
  };
  
  const handleNext = useCallback(() => {
    playNext();
  }, [playNext]);

  const handlePrev = useCallback(() => {
    setCurrentTrackIndex(prev => (prev > 0 ? prev - 1 : 0));
  }, []);

  const selectedSurah = useMemo(() => surahs.find(s => s.number === surah), [surahs, surah]);
  
  const handleShowTafsir = useCallback(async (ayahNumber: number) => {
    const key = `${surah}:${ayahNumber}`;
    if (tafsir[key]) return;

    setIsTafsirLoading(true);
    try {
      const result = await getTafsir({ surah: surah, ayah: ayahNumber });
      setTafsir(prev => ({ ...prev, [key]: result.tafsir }));
    } catch (error) {
      toast({ variant: "destructive", title: "خطأ في عرض التفسير", description: "حدث خطأ أثناء جلب التفسير. يرجى المحاولة مرة أخرى." });
    } finally {
      setIsTafsirLoading(false);
    }
  }, [surah, tafsir]);

  useEffect(() => {
    if (autoScroll && currentAyahRef.current) {
      currentAyahRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentTrackIndex, autoScroll, playlist]);
  
  const handleSettingsChange = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
      setSettings(prev => ({...prev, [key]: value}));
  }, [setSettings]);
  
  const moveReciter = useCallback((index: number, direction: 'up' | 'down') => {
      const newReciters = [...selectedReciters];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if(targetIndex >= 0 && targetIndex < newReciters.length){
        [newReciters[index], newReciters[targetIndex]] = [newReciters[targetIndex], newReciters[index]];
        handleSettingsChange('selectedReciters', newReciters);
      }
  }, [selectedReciters, handleSettingsChange]);
  
  const removeReciter = useCallback((reciterId: string) => {
      handleSettingsChange('selectedReciters', selectedReciters.filter(id => id !== reciterId));
  }, [selectedReciters, handleSettingsChange]);

  const addReciter = useCallback((reciterId: string) => {
    if (!selectedReciters.includes(reciterId)) {
        handleSettingsChange('selectedReciters', [...selectedReciters, reciterId]);
    }
  }, [selectedReciters, handleSettingsChange]);

  const handleSurahChange = useCallback((val: string) => {
      const newSurahNum = Number(val);
      const newSurah = surahs.find(s => s.number === newSurahNum);
      if (newSurah) {
        setSettings(prev => ({
          ...prev,
          surah: newSurahNum, 
          fromAyah: 1, 
          toAyah: newSurah.numberOfAyahs
        }));
      }
  }, [surahs, setSettings]);

  const displayedAyahs = useMemo(() => {
    if (!showAyahs) return [];
    return ayahsData.filter(a => a.numberInSurah >= fromAyah && a.numberInSurah <= toAyah);
  }, [ayahsData, fromAyah, toAyah, showAyahs]);

  if (!isClient) {
    return (
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4 h-[calc(100vh-56px)]">
          <Card className="w-full lg:w-1/3 lg:max-w-sm flex-shrink-0 h-full flex flex-col">
              <CardHeader><CardTitle>الإعدادات</CardTitle></CardHeader>
              <CardContent className="flex-grow overflow-y-auto">
                  <div className="space-y-6">
                      <Skeleton className="h-10 w-full" />
                      <div className="flex gap-4">
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                      </div>
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Separator />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                  </div>
              </CardContent>
          </Card>
           <div className="flex-grow h-full flex flex-col">
              <Card className="flex-grow">
                  <ScrollArea className="h-[calc(100vh-220px)] lg:h-[calc(100vh-160px)]">
                       <div className="p-6">
                          <Skeleton className="h-40 w-full" />
                       </div>
                  </ScrollArea>
              </Card>
               <div className="flex-shrink-0 p-4 border-t bg-background/80 backdrop-blur-sm rounded-b-lg">
                  <Skeleton className="h-16 w-full" />
               </div>
           </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4 h-[calc(100vh-56px)]">
      <audio ref={audioRef} onEnded={handleAudioEnded} />
      <Card className="w-full lg:w-1/3 lg:max-w-sm flex-shrink-0 h-full flex flex-col">
        <CardHeader><CardTitle className="text-right">الإعدادات</CardTitle></CardHeader>
        <CardContent className="flex-grow overflow-y-auto">
          <div className="space-y-6 text-right">
            <div>
              <Label htmlFor="surah" className="text-start w-full block text-right">السورة</Label>
              {isLoading ? <Skeleton className="h-10 w-full" /> :
              <Select value={String(surah)} onValueChange={handleSurahChange}>
                <SelectTrigger id="surah" className="text-right"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {surahs.map(s => <SelectItem key={s.number} value={String(s.number)}>{s.number}. {s.name} ({s.englishName})</SelectItem>)}
                </SelectContent>
              </Select>
              }
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="fromAyah" className="text-start w-full block text-right">من آية</Label>
                <Input id="fromAyah" type="number" min="1" max={selectedSurah?.numberOfAyahs} value={fromAyah} onChange={e => handleSettingsChange('fromAyah', Math.max(1, Number(e.target.value)))} />
              </div>
              <div className="flex-1">
                <Label htmlFor="toAyah" className="text-start w-full block text-right">إلى آية</Label>
                <Input id="toAyah" type="number" min={fromAyah} max={selectedSurah?.numberOfAyahs} value={toAyah} onChange={e => handleSettingsChange('toAyah', Math.min(selectedSurah?.numberOfAyahs || 1, Number(e.target.value)))} />
              </div>
            </div>
            <div>
              <Label htmlFor="repetitions" className="text-start w-full block text-right">تكرار الآية</Label>
              <Input id="repetitions" type="number" min="0" value={repetitions} onChange={e => handleSettingsChange('repetitions', Math.max(0, Number(e.target.value)))} />
            </div>

            <div>
              <Label className="text-start w-full block text-right">نمط التشغيل</Label>
              <RadioGroup value={playbackMode} onValueChange={(value) => handleSettingsChange('playbackMode', value as PlaybackMode)} className="mt-2 space-y-2">
                <div className="flex items-center justify-end gap-2">
                  <Label htmlFor="byAyah" className="font-normal">كل آية منفردة</Label>
                  <RadioGroupItem value="byAyah" id="byAyah" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Label htmlFor="bySelection" className="font-normal">قراءة المقطع كاملاً</Label>
                  <RadioGroupItem value="bySelection" id="bySelection" />
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
                <Label className="text-start w-full block text-right">القراء المختارون</Label>
                 <ScrollArea className="h-40 border rounded-md p-2">
                    <div className="space-y-2">
                        {selectedReciters.map((reciterId, index) => {
                            const reciter = audioEditions.find(e => e.identifier === reciterId);
                            return (
                                <div key={reciterId} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => moveReciter(index, 'up')} disabled={index===0}><ChevronUp className="h-4 w-4"/></Button>
                                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => moveReciter(index, 'down')} disabled={index === selectedReciters.length-1}><ChevronDown className="h-4 w-4"/></Button>
                                        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeReciter(reciterId)}><Trash2 className="h-4 w-4"/></Button>
                                    </div>
                                    <span className="truncate flex-1 text-right">{reciter?.name || reciterId}</span>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>

            <div>
              <Label className="text-start w-full block text-right">إضافة قارئ</Label>
              {isLoading ? <Skeleton className="h-10 w-full" /> :
              <Select onValueChange={addReciter} value="">
                <SelectTrigger id="reciters" className="text-right"><SelectValue placeholder="اختر قارئًا لإضافته..." /></SelectTrigger>
                <SelectContent>
                  {audioEditions
                    .filter(e => !selectedReciters.includes(e.identifier))
                    .map(e => <SelectItem key={e.identifier} value={e.identifier}>{e.name}</SelectItem>)}
                </SelectContent>
              </Select>
              }
            </div>

            <Separator />
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-ayahs" className="flex items-center gap-2">
                {showAyahs ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                إظهار الآيات
              </Label>
              <Switch id="show-ayahs" checked={showAyahs} onCheckedChange={val => handleSettingsChange('showAyahs', val)} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-scroll" className="text-right">التمرير التلقائي</Label>
              <Switch id="auto-scroll" checked={autoScroll} onCheckedChange={val => handleSettingsChange('autoScroll', val)} disabled={!showAyahs} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="loop" className="text-right">إعادة تشغيل المقطع</Label>
              <Switch id="loop" checked={loop} onCheckedChange={val => handleSettingsChange('loop', val)} />
            </div>

          </div>
        </CardContent>
      </Card>
      <div className="flex-grow h-full flex flex-col">
        <Card className="flex-grow">
          <ScrollArea className="h-[calc(100vh-220px)] lg:h-[calc(100vh-160px)]">
            {showAyahs ? (
                <div className="p-6 text-2xl/loose leading-loose font-serif text-right">
                  {ayahsData.length > 0 ? displayedAyahs
                    .map(ayah => {
                      const currentTrack = playlist[currentTrackIndex];
                      const isActive = isPlaying && currentTrack?.ayah === ayah.numberInSurah;
                      return (
                        <div key={ayah.numberInSurah} ref={isActive ? currentAyahRef : null} className="text-start">
                          <p className={`inline-block p-2 rounded-md transition-colors duration-300 text-start text-right ${isActive ? 'bg-primary/20' : ''}`}>
                              <span className="text-primary font-bold">﴿</span>
                              {ayah.arabicText}
                              <span className="text-primary font-bold">﴾</span>
                              <span className="text-sm text-primary-foreground bg-primary rounded-full px-2 py-1 me-2 font-sans">{ayah.numberInSurah}</span>
                          </p>
                          <p className="text-sm/relaxed text-muted-foreground font-sans mt-1 mb-4 ps-2 text-right">{ayah.englishText}</p>
                           <Dialog>
                            <DialogTrigger asChild>
                               <Button variant="ghost" size="sm" onClick={() => handleShowTafsir(ayah.numberInSurah)}><BookOpen className="w-4 h-4 me-2"/> تفسير</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="text-right">تفسير الآية {ayah.numberInSurah} من سورة {selectedSurah?.name}</DialogTitle>
                              </DialogHeader>
                              {isTafsirLoading ? <Skeleton className="h-20 w-full" /> : 
                              <ScrollArea className="max-h-96">
                                <p className="py-4 text-base/loose text-right">{tafsir[`${surah}:${ayah.numberInSurah}`] || "لا يتوفر تفسير حاليًا."}</p>
                              </ScrollArea>
                              }
                            </DialogContent>
                          </Dialog>
                          <Separator className="my-4"/>
                        </div>
                      );
                    }) : <Skeleton className="h-full w-full" />}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <EyeOff className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold">الآيات مخفية</h3>
                    <p className="text-muted-foreground">اضغط على زر "إظهار الآيات" في الإعدادات لعرضها.</p>
                </div>
              )}
          </ScrollArea>
        </Card>
        <div className="flex-shrink-0 p-4 border-t bg-background/80 backdrop-blur-sm rounded-b-lg">
          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" size="icon" onClick={handlePrev} disabled={currentTrackIndex === 0}><SkipBack /></Button>
            <Button variant="default" size="icon" className="h-16 w-16 rounded-full" onClick={handlePlayPause} disabled={playlist.length === 0}>
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNext} disabled={currentTrackIndex >= playlist.length-1 && !loop}><SkipForward /></Button>
            <Button variant="ghost" size="icon" onClick={() => handleSettingsChange('loop', !loop)}>
                {loop ? <Repeat1 className="text-primary" /> : <Repeat />}
            </Button>
          </div>
          {playlist.length > 0 && currentTrackIndex < playlist.length &&
            <div className="text-center text-sm text-muted-foreground mt-2">
                {`الآية ${playlist[currentTrackIndex]?.ayah}, القارئ: ${audioEditions.find(e => e.identifier === playlist[currentTrackIndex]?.reciterId)?.name || ''}`}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
