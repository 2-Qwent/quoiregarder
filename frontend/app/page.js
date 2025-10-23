"use client";
import Image from "next/image";
import Form from "@/components/form";
import RandomGenerator from "@/components/randomGenerator";
import { useState, useEffect } from "react";
import DarkMode from "@/components/DarkMode";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto pt-2 grow">
        <header className="pb-2 mb-4">
          <div className="flex justify-between items-center px-2 pb-4 border-b-2 border-button">
            <h1 className="text-6xl font-extrabold">Quoi regarder ?</h1>
            <DarkMode />
          </div>
          <div>
            <p className="text-2xl mb-2 italic">
              Vous ne savez pas quel film regarder ce soir ? Rentrez vos
              critères et trouvez le film parfait à regarder selon vos envies !
            </p>
            <p className="text-2xl mb-2 italic">
              Vous n'avez vraiment aucune idée ? Laissez l'aléatoire choisir pour vous !
            </p>
          </div>
        </header>
        <main>
          <Form />
          <RandomGenerator />
        </main>
      </div>
      <footer className="mt-auto p-4 text-center">
        <p>
          Données fournies par{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            className="text-button hover:underline"
          >
            The Movie Database (TMDb)
          </a>
        </p>
        <Image
          src="/tmdb_logo.svg"
          alt="TMDB Logo"
          width={200}
          height={60}
          className="mx-auto mt-2"
        />
      </footer>
    </div>
  );
}
