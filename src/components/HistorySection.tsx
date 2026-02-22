import { Clock, Trash2, Info} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import "./HistorySection.css";

const initialHistory = [
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
  {
    id: 5,
    source: "This is a translation application",
    translated: "c'est une application de traduction",
    sourceLang: "EN",
    targetLang: "FR",
    time: "Il y a 2h",
  },
  {
    id: 6,
    source: "This is a translation application",
    translated: "c'est une application de traduction",
    sourceLang: "EN",
    targetLang: "FR",
    time: "Il y a 2h",
  },
  {
    id: 7,
    source: "This is a translation application",
    translated: "c'est une application de traduction",
    sourceLang: "EN",
    targetLang: "FR",
    time: "Il y a 2h",
  },
];

export function HistorySection() {
  const [history, setHistory] = useState(initialHistory);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = (id:number)=>{
    setHistory((prev)=>prev.filter((item) => item.id !== id ));
  };

  return (
    <section className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 mb-4">
        <div className="gap-2 items-center flex">
          <Clock className="h-5 w-5 text-primary"/>
          <h2 className="text-lg font-semibold text-foreground"> Recent History </h2>
        </div>

        <Button className={"hover:bg-primary font-bold"} variant="outline" size="sm" onClick={()=> {setOpenDialog(true);}}> Display All </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {initialHistory.slice(0, 4).map((item) => (
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

      <div className={"flex items-center gap-2 mt-4 text-muted-foreground text-md"}>
        <Info className="h-3 w-3.5 shrink-0"/>
        <p>NB : All History will be delete after 1 day</p>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle> Translation History </DialogTitle>
            <DialogDescription>
              Consult and manage your recents description
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1" id="dialog-box">
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Any History are available 
              </p>
            ) : (
              history.map((item)=> (
                <div key={item.id} className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-card">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant="secondary" className="text-xs">
                        {item.sourceLang}
                      </Badge>

                      <span className="text-xs text-muted-foreground"> </span>
                      <Badge className="text-xs text-primary bg-primary/10 border-0">
                        {item.targetLang}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-auto"> {item.time} </span>
                    </div>
                    <p className="text-sm truncate text-muted-foreground">{item.source}</p>
                    <p className="text-sm font-medium text-foreground truncate">{item.translated}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"> 
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </div>
              ))
            )}
          </div>

        </DialogContent>
      </Dialog>
    </section>
  );
}
