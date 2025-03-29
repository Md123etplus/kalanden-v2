"use client"

import { useState } from "react"
import { BookOpen, Download, Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import Navbar from "@/components/navbar"

// Données statiques pour les cours
const courses = [
  {
    id: 1,
    title: "Mathématiques avancées",
    category: "Mathématiques",
    level: "Terminale",
    status: "published",
    students: 45,
    modules: 8,
    lastUpdated: "2025-03-20T14:30:00",
  },
  {
    id: 2,
    title: "Grammaire française",
    category: "Français",
    level: "Collège",
    status: "published",
    students: 78,
    modules: 12,
    lastUpdated: "2025-03-18T10:15:00",
  },
  {
    id: 3,
    title: "Introduction à la physique",
    category: "Sciences",
    level: "Lycée",
    status: "draft",
    students: 0,
    modules: 5,
    lastUpdated: "2025-03-22T09:20:00",
  },
  {
    id: 4,
    title: "Histoire de l'art",
    category: "Arts",
    level: "Lycée",
    status: "published",
    students: 32,
    modules: 10,
    lastUpdated: "2025-03-15T11:45:00",
  },
  {
    id: 5,
    title: "Littérature française",
    category: "Français",
    level: "Terminale",
    status: "published",
    students: 56,
    modules: 14,
    lastUpdated: "2025-03-19T16:30:00",
  },
  {
    id: 6,
    title: "Chimie organique",
    category: "Sciences",
    level: "Terminale",
    status: "draft",
    students: 0,
    modules: 7,
    lastUpdated: "2025-03-21T08:15:00",
  },
  {
    id: 7,
    title: "Anglais intermédiaire",
    category: "Langues",
    level: "Collège",
    status: "published",
    students: 92,
    modules: 15,
    lastUpdated: "2025-03-17T15:20:00",
  },
  {
    id: 8,
    title: "Philosophie",
    category: "Sciences humaines",
    level: "Terminale",
    status: "archived",
    students: 12,
    modules: 9,
    lastUpdated: "2025-02-28T14:10:00",
  },
]

export default function CoursesManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const { user } = useAuth()

  // Filtrer les cours en fonction des critères de recherche et des filtres
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || course.status === statusFilter

    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Obtenir les catégories uniques pour le filtre
  const uniqueCategories = Array.from(new Set(courses.map((course) => course.category)))

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle className="text-2xl">Gestion des cours</CardTitle>
              <CardDescription>Créez, modifiez et gérez les cours de la plateforme</CardDescription>
            </div>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Créer un cours</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher un cours..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="archived">Archivé</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {uniqueCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Étudiants</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                              <BookOpen className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium">{course.title}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{course.modules} modules</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>{course.level}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              course.status === "published"
                                ? "border-green-500 text-green-600 dark:text-green-400"
                                : course.status === "draft"
                                  ? "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                                  : "border-gray-500 text-gray-600 dark:text-gray-400"
                            }
                          >
                            {course.status === "published" && "Publié"}
                            {course.status === "draft" && "Brouillon"}
                            {course.status === "archived" && "Archivé"}
                          </Badge>
                        </TableCell>
                        <TableCell>{course.students}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Voir le cours</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Modifier</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Supprimer</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <BookOpen className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                          <h3 className="mt-2 text-lg font-medium">Aucun cours trouvé</h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Essayez de modifier vos critères de recherche.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

