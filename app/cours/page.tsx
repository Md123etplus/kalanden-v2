"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Star, Users, Filter, SortAsc, SortDesc } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { coursService } from "@/lib/api-service"
import { useCourseFilters } from "@/hooks/use-course-filters"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CoursPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortOption, setSortOption] = useState("popular") // popular, newest, price-asc, price-desc
  const { filters, handleLevelChange, handlePriceChange, handleRatingChange, resetFilters } = useCourseFilters()
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        // Utiliser le service API pour récupérer les cours
        const { data, error } = await coursService.getAllCourses()
        if (error) throw error
        setCourses(data || [])
      } catch (error) {
        console.error("Erreur lors du chargement des cours:", error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Filtrer les cours en fonction des filtres sélectionnés
  const filteredCourses = courses.filter((course) => {
    // Filtre par niveau
    if (filters.level.debutant && course.level !== "Débutant") return false
    if (filters.level.intermediaire && course.level !== "Intermédiaire") return false
    if (filters.level.avance && course.level !== "Avancé") return false

    // Si aucun niveau n'est sélectionné, on affiche tous les niveaux
    const anyLevelSelected = Object.values(filters.level).some((v) => v)
    if (anyLevelSelected && !filters.level[course.level.toLowerCase()]) return false

    // Filtre par prix
    if (course.price < filters.price[0] || course.price > filters.price[1]) return false

    // Filtre par note
    if (filters.rating > 0 && course.rating < filters.rating) return false

    return true
  })

  // Trier les cours en fonction de l'option de tri
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "popular":
      default:
        return b.students - a.students
    }
  })

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cours</h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  {sortOption === "price-asc" || sortOption === "price-desc" ? (
                    sortOption === "price-asc" ? (
                      <SortAsc className="h-4 w-4 mr-2" />
                    ) : (
                      <SortDesc className="h-4 w-4 mr-2" />
                    )
                  ) : null}
                  Trier
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOption("popular")}>Les plus populaires</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("newest")}>Les plus récents</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-asc")}>Prix croissant</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-desc")}>Prix décroissant</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtres (visible sur mobile uniquement si showFilters est true) */}
          <div className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Filtres</h2>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500" onClick={resetFilters}>
                  Réinitialiser
                </Button>
              </div>

              <div className="space-y-6">
                {/* Niveau */}
                <div>
                  <h3 className="font-medium mb-2">Niveau</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="debutant"
                        checked={filters.level.debutant}
                        onCheckedChange={() => handleLevelChange("debutant")}
                      />
                      <Label htmlFor="debutant" className="ml-2">
                        Débutant
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="intermediaire"
                        checked={filters.level.intermediaire}
                        onCheckedChange={() => handleLevelChange("intermediaire")}
                      />
                      <Label htmlFor="intermediaire" className="ml-2">
                        Intermédiaire
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="avance"
                        checked={filters.level.avance}
                        onCheckedChange={() => handleLevelChange("avance")}
                      />
                      <Label htmlFor="avance" className="ml-2">
                        Avancé
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Prix */}
                <div>
                  <h3 className="font-medium mb-2">Prix</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={filters.price}
                      onValueChange={handlePriceChange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{filters.price[0]}€</span>
                      <span>{filters.price[1]}€</span>
                    </div>
                  </div>
                </div>

                {/* Note minimale */}
                <div>
                  <h3 className="font-medium mb-2">Note minimale</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0]}
                      max={5}
                      step={0.5}
                      value={[filters.rating]}
                      onValueChange={handleRatingChange}
                    />
                    <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                      <span>{filters.rating} et plus</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="flex-grow">
            {loading ? (
              <div className="text-center py-12">Chargement des cours...</div>
            ) : sortedCourses.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">Aucun cours trouvé</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Essayez de modifier vos filtres pour voir plus de résultats.
                </p>
                <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden hover:shadow-lg transition-all border-0 bg-white dark:bg-gray-900"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge
                          className={`
                          ${
                            course.level === "Débutant"
                              ? "bg-green-600 hover:bg-green-700"
                              : course.level === "Intermédiaire"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-purple-600 hover:bg-purple-700"
                          } 
                          text-white
                          dark:bg-opacity-80 dark:hover:bg-opacity-100
                        `}
                        >
                          {course.level}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-opacity-80 dark:hover:bg-opacity-100">
                          {course.price}€
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-5">
                      <Link href={`/cours/${course.id}`}>
                        <CardTitle className="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors dark:text-white dark:hover:text-blue-400">
                          {course.title}
                        </CardTitle>
                      </Link>
                      <p className="text-gray-600 text-sm dark:text-gray-400">{course.instructor}</p>
                    </CardHeader>
                    <CardContent className="px-5 py-0">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{course.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-500 mr-1 dark:text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{course.students} étudiants</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-5">
                      <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                        S&apos;inscrire au cours
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

