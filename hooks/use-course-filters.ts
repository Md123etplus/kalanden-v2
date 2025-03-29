"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function useCourseFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Récupérer les filtres depuis l'URL
  const initialLevel = searchParams.get("level") || ""
  const initialMinPrice = Number(searchParams.get("minPrice") || 0)
  const initialMaxPrice = Number(searchParams.get("maxPrice") || 100)
  const initialRating = Number(searchParams.get("rating") || 0)

  const [filters, setFilters] = useState({
    level: {
      debutant: initialLevel === "debutant",
      intermediaire: initialLevel === "intermediaire",
      avance: initialLevel === "avance",
    },
    price: [initialMinPrice, initialMaxPrice],
    rating: initialRating,
  })

  // Mettre à jour l'URL lorsque les filtres changent
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    // Niveau
    const levelValues = Object.entries(filters.level)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    if (levelValues.length === 1) {
      params.set("level", levelValues[0])
    } else {
      params.delete("level")
    }

    // Prix
    params.set("minPrice", filters.price[0].toString())
    params.set("maxPrice", filters.price[1].toString())

    // Note
    if (filters.rating > 0) {
      params.set("rating", filters.rating.toString())
    } else {
      params.delete("rating")
    }

    // Mettre à jour l'URL sans recharger la page
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({ path: newUrl }, "", newUrl)
  }, [filters, router, searchParams])

  const handleLevelChange = (level: string) => {
    setFilters((prev) => ({
      ...prev,
      level: {
        ...prev.level,
        [level]: !prev.level[level],
      },
    }))
  }

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      price: value,
    }))
  }

  const handleRatingChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      rating: value[0],
    }))
  }

  const resetFilters = () => {
    setFilters({
      level: { debutant: false, intermediaire: false, avance: false },
      price: [0, 100],
      rating: 0,
    })
  }

  return {
    filters,
    handleLevelChange,
    handlePriceChange,
    handleRatingChange,
    resetFilters,
  }
}

