import { Header } from "@/components/Header";
import { TranslationPanel } from "@/components/TranslationPanel";
import { HistorySection } from "@/components/HistorySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      <main className="py-6 md:py-10">
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Traduisez en un instant
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Saisissez votre texte et découvrez la traduction instantanée dans plus de 9 langues
          </p>
        </div>
        <TranslationPanel />
        <div className="mt-12">
          <HistorySection />
        </div>
      </main>
      <footer className="py-6 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          © 2026 TransLingo. Design moderne pour une traduction simplifiée.
        </p>
      </footer>
    </div>
  );
};

export default Index;
