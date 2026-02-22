import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockHistory = [
  {
    id: 1,
    source: "Bonjour, comment allez-vous ?",
    translated: "Hello, how are you?",
    sourceLang: "FR",
    targetLang: "EN",
    time: "Il y a 5 min",
  },
  {
    id: 2,
    source: "J'aime apprendre de nouvelles langues",
    translated: "I love learning new languages",
    sourceLang: "FR",
    targetLang: "EN",
    time: "Il y a 15 min",
  },
  {
    id: 3,
    source: "The weather is beautiful today",
    translated: "Il fait beaux temps aujourd'hui",
    sourceLang: "EN",
    targetLang: "FR",
    time: "Il y a 1h",
  },
  {
    id: 4,
    source: "This is a translation application",
    translated: "c'est une application de traduction",
    sourceLang: "EN",
    targetLang: "FR",
    time: "Il y a 2h",
  },
];

export function HistorySection() {
  return (
    <section className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Historique récent</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockHistory.map((item) => (
          <Card
            key={item.id}
            className="group cursor-pointer bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs font-medium">
                  {item.sourceLang}
                </Badge>
                <span className="text-muted-foreground">→</span>
                <Badge className="text-xs font-medium bg-primary/10 text-primary border-0">
                  {item.targetLang}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {item.source}
              </p>
              <p className="text-sm font-medium text-foreground line-clamp-2 mb-3">
                {item.translated}
              </p>

              <p className="text-xs text-muted-foreground">{item.time}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
