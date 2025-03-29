"use client"

import { useState } from "react"
import { Download, Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash, User, Users } from "lucide-react"
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

// Données statiques pour les élèves
const students = [
  {
    id: 1,
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    class: "Terminale S",
    status: "active",
    progress: 85,
    lastActive: "2025-03-24T14:30:00",
  },
  {
    id: 2,
    name: "Lucas Dubois",
    email: "lucas.dubois@example.com",
    class: "Première ES",
    status: "active",
    progress: 72,
    lastActive: "2025-03-23T10:15:00",
  },
  {
    id: 3,
    name: "Emma Bernard",
    email: "emma.bernard@example.com",
    class: "Seconde",
    status: "inactive",
    progress: 45,
    lastActive: "2025-03-15T09:20:00",
  },
  {
    id: 4,
    name: "Thomas Petit",
    email: "thomas.petit@example.com",
    class: "Terminale L",
    status: "active",
    progress: 90,
    lastActive: "2025-03-24T11:45:00",
  },
  {
    id: 5,
    name: "Léa Moreau",
    email: "lea.moreau@example.com",
    class: "Première S",
    status: "active",
    progress: 68,
    lastActive: "2025-03-22T16:30:00",
  },
  {
    id: 6,
    name: "Hugo Leroy",
    email: "hugo.leroy@example.com",
    class: "Seconde",
    status: "pending",
    progress: 10,
    lastActive: "2025-03-20T08:15:00",
  },
  {
    id: 7,
    name: "Chloé Fournier",
    email: "chloe.fournier@example.com",
    class: "Terminale ES",
    status: "active",
    progress: 78,
    lastActive: "2025-03-23T15:20:00",
  },
  {
    id: 8,
    name: "Nathan Girard",
    email: "nathan.girard@example.com",
    class: "Première L",
    status: "inactive",
    progress: 30,
    lastActive: "2025-03-10T14:10:00",
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [classFilter, setClassFilter] = useState("all")
  const { user } = useAuth()

  // Filtrer les élèves en fonction des critères de recherche et des filtres
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    const matchesClass = classFilter === "all" || student.class === classFilter

    return matchesSearch && matchesStatus && matchesClass
  })

  // Obtenir les classes uniques pour le filtre
  const uniqueClasses = Array.from(new Set(students.map((student) => student.class)))

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle className="text-2xl">Gestion des élèves</CardTitle>
              <CardDescription>Gérez les élèves, leurs progrès et leurs accès</CardDescription>
            </div>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Ajouter un élève</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher un élève..."
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
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les classes</SelectItem>
                    {uniqueClasses.map((className) => (
                      <SelectItem key={className} value={className}>
                        {className}
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
                    <TableHead>Nom</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Progression</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                              <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{student.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              student.status === "active"
                                ? "border-green-500 text-green-600 dark:text-green-400"
                                : student.status === "inactive"
                                  ? "border-red-500 text-red-600 dark:text-red-400"
                                  : "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                            }
                          >
                            {student.status === "active" && "Actif"}
                            {student.status === "inactive" && "Inactif"}
                            {student.status === "pending" && "En attente"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full max-w-24 rounded-full bg-gray-100 dark:bg-gray-800">
                              <div
                                className={`h-full rounded-full ${
                                  student.progress >= 70
                                    ? "bg-green-500"
                                    : student.progress >= 40
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span className="text-sm">{student.progress}%</span>
                          </div>
                        </TableCell>
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
                                <span>Voir le profil</span>
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
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Users className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                          <h3 className="mt-2 text-lg font-medium">Aucun élève trouvé</h3>
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

