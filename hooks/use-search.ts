"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { coursService } from "@/lib/api-service"

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const router = useRouter()

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!searchQuery.trim()) return

    setIsSearching(true)

    try {
      // Utiliser le service API pour rechercher des cours
      const { data, error } = await coursService.searchCourses(searchQuery)

      if (error) throw error

      setSearchResults(data || [])

      // Rediriger vers la page de résultats de recherche
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } catch (error) {
      console.error("Erreur lors de la recherche:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return {
    searchQuery,
    setSearchQuery,
    isSearching,
    searchResults,
    handleSearch,
  }
}

