"use client";
import Image from "next/image";
import Form from "@/components/form";
import RandomGenerator from "@/components/randomGenerator";
import DarkMode from "@/components/DarkMode";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="container mx-auto px-2 sm:px-4 pt-4 sm:pt-6 grow">
        
        {/* Header responsive */}
        <header className="pb-4 sm:pb-6 mb-6 sm:mb-8">
          {/* Version mobile */}
          <div className="block sm:hidden space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-extrabold text-foreground">
                Quoi regarder ?
              </h1>
              <DarkMode />
            </div>
            <button
              className="w-full cursor-pointer hover:opacity-90 transition-all duration-200 bg-button text-white font-bold py-3 px-4 rounded-2xl"
              onClick={() => (window.location.href = "/watchlist")}
            >
              📺 Ma watchlist
            </button>
            <div className="border-b-2 border-button"></div>
          </div>

          {/* Version desktop */}
          <div className="hidden sm:block">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-2 pb-4 border-b-2 border-button gap-4">
              <h1 className="text-4xl lg:text-6xl font-extrabold text-foreground">
                Quoi regarder ?
              </h1>
              <div className="flex items-center gap-4">
                <button
                  className="cursor-pointer hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl bg-button text-white font-bold py-2 px-4 rounded-2xl text-sm lg:text-base whitespace-nowrap"
                  onClick={() => (window.location.href = "/watchlist")}
                >
                  📺 Ma watchlist
                </button>
                <DarkMode />
              </div>
            </div>
          </div>
        </header>

        <main className="space-y-8 sm:space-y-12">
          {/* Section introduction */}
          <section>
            {/* Version mobile */}
            <div className="block sm:hidden mb-6 text-center">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Recherche personnalisée
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Définissez vos critères pour trouver le film parfait !
              </p>
            </div>

            {/* Version desktop */}
            <div className="hidden sm:block mb-6 text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Recherche personnalisée
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Définissez vos critères pour trouver le film parfait !
              </p>
            </div>
            
            <Form />
          </section>

          {/* Section aléatoire */}
          <section>
            {/* Version mobile */}
            <div className="block sm:hidden mb-6 text-center">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Film surprise
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Laissez le hasard décider pour vous !
              </p>
            </div>

            {/* Version desktop */}
            <div className="hidden sm:block mb-6 text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Film surprise
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Laissez le hasard décider pour vous !
              </p>
            </div>

            <RandomGenerator />
          </section>
        </main>
      </div>

      {/* Footer responsive */}
      <footer className="mt-auto p-4 sm:p-6 text-center border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-foreground">
            Données fournies par{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              className="text-button hover:underline font-medium"
            >
              The Movie Database (TMDB)
            </a>
          </p>
          
          <div className="flex justify-center">
            <Image
              src="/tmdb_logo.svg"
              alt="TMDB Logo"
              width={150}
              height={45}
              className="sm:w-[200px] sm:h-[60px]"
            />
          </div>
          
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>Créé par Quentin Rohart</p>
            <p>
              <a
                href="https://github.com/2-Qwent?tab=repositories"
                target="_blank"
                className="hover:underline hover:text-button transition-colors"
              >
                🔗 Le projet sur GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}