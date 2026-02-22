import { useState } from "react";
import { ArrowRightLeft, Copy, Volume2, X, Check, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LanguageSelector } from "@/components/LanguageSelector";
import { cn } from "@/lib/utils";
import axios from "axios";


export function TranslationPanel() {
  const [sourceText, setSourceText] = useState("Bonjour, comment allez-vous ?");
  const [translatedText, setTranslateText] = useState("hello, how are you ?");
  const [sourceLang, setSourceLang] = useState("fr");
  const [targetLang, setTargetLang] = useState("en");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading]=useState(false);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLang;
    speechSynthesis.speak(utterance);
  };

  const handleClear = () => {
    setSourceText("");
    setTranslateText("");
  };

  const translate = async ()=>{
    console.log("source language: ", sourceLang);
    console.log("target language: ", targetLang);
    console.log(import.meta.env.VITE_API_FR_EN_URL);
    const fr_en_url = import.meta.env.VITE_FR_EN_URL;
    const en_fr_url = import.meta.env.VITE_EN_FR_URL;
    setTranslateText("");

    if (sourceLang == "fr") {
      console.log("translation in english...");
      setLoading(true);
      try {
        const response = await axios.post(fr_en_url, {"text": sourceText}, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        const data = await response.data;
        setTranslateText(data["translation-text"]);

      } catch (error) {
        console.log("error : ", error);
        setLoading(false);

      } finally {
        setLoading(false);
      }


    } else if (sourceLang == "en") {
      console.log("translation in french...");
      try {
        setLoading(true);
        const response = await axios.post(en_fr_url, {"text": sourceText}, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        const data = await response.data;
        setTranslateText(data["translation-text"]);

      } catch(error) {
        console.log("error : ", error);
        setLoading(false);

      } finally {
        setLoading(false);
        console.log("end of request ..")
      }
    }

    // const response = await axios.post()
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 relative">
        {/* Source Panel */}
        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border shadow-lg transition-all hover:shadow-xl">
          <LanguageSelector
            value={sourceLang}
            onChange={setSourceLang}
            label="Source Language"
          />
          <div className="mt-4 relative">
            <Textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter a translate text..."
              className="min-h-[200px] md:min-h-[250px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50"
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-muted-foreground">
              {sourceText.length} characters
            </p>
            <Button
              onClick={()=>{translate();}}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              <Languages className="h-4 w-4 mr-2" />
              Translate
            </Button>
          </div>
        </div>

        {/* Swap Button - Desktop */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwapLanguages}
            className="h-12 w-12 rounded-full bg-card border-2 border-primary shadow-lg hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
          >
            <ArrowRightLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Swap Button - Mobile */}
        <div className="lg:hidden flex justify-center -my-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwapLanguages}
            className="h-10 w-10 rounded-full bg-card border-2 border-primary shadow-md hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <ArrowRightLeft className="h-4 w-4 rotate-90" />
          </Button>
        </div>

        {/* Target Panel */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-4 md:p-6 border border-border shadow-lg transition-all hover:shadow-xl">
          <LanguageSelector
            value={targetLang}
            onChange={setTargetLang}
            label="Target Language"
          />
          <div className="mt-4 relative">
            <Textarea
              value={loading ? "Translating ..." : translatedText}
              readOnly
              placeholder="Translation..."
              className="min-h-[200px] md:min-h-[250px] resize-none bg-background/50 border-border text-foreground cursor-default"
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSpeak}
                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className={cn(
                  "h-8 w-8 transition-colors",
                  copied
                    ? "text-success bg-success/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                )}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {translatedText.length} Characters
          </p>
        </div>
      </div>
    </div>
  );
}
