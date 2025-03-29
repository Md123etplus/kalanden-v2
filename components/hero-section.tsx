"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useSearch } from "@/hooks/use-search"

export default function HeroSection() {
  const { searchQuery, setSearchQuery, handleSearch, isSearching } = useSearch()
  const [popularSearches] = useState([
    { id: 1, name: "Mathématiques" },
    { id: 2, name: "Français" },
    { id: 3, name: "Sciences" },
    { id: 4, name: "Préparation concours" },
  ])

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term)
    handleSearch()
  }

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Apprenez sans limites avec <span className="text-blue-600 dark:text-blue-400">Kalandén</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Développez vos compétences avec nos cours en ligne de qualité. Commencez votre parcours
              d&apos;apprentissage dès aujourd&apos;hui.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Que voulez-vous apprendre ?"
                className="pl-10 pr-4 py-6 w-full rounded-full border border-gray-300 focus:border-blue-500 text-base dark:border-gray-700 dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                disabled={isSearching}
              >
                {isSearching ? "Recherche..." : "Rechercher"}
              </Button>
            </form>

            <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Populaire:</span>
              {popularSearches.map((search) => (
                <Button
                  key={search.id}
                  variant="link"
                  className="p-0 h-auto text-blue-600 dark:text-blue-400"
                  onClick={() => handlePopularSearch(search.name)}
                >
                  {search.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Étudiants qui apprennent"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

