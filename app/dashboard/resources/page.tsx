"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Download, Search, Filter, Plus, Book, Video, FileImage, File } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ResourcesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  // Données statiques pour les ressources
  const resources = [
    {
      id: 1,
      title: "Guide d'étude - Mathématiques",
      description: "Guide complet pour les mathématiques du collège",
      type: "document",
      format: "PDF",
      size: "2.4 MB",
      subject: "Mathématiques",
      level: "Collège",
      date: "10 mai 2023",
      downloads: 156,
    },
    {
      id: 2,
      title: "Exercices pratiques - Français",
      description: "Exercices de grammaire et conjugaison",
      type: "document",
      format: "PDF",
      size: "1.8 MB",
      subject: "Français",
      level: "Primaire",
      date: "5 mai 2023",
      downloads: 98,
    },
    {
      id: 3,
      title: "Vidéo explicative - Physique",
      description: "Explication des lois de Newton",
      type: "video",
      format: "MP4",
      size: "45 MB",
      subject: "Physique",
      level: "Lycée",
      date: "2 mai 2023",
      downloads: 210,
    },
    {
      id: 4,
      title: "Fiches de révision - Sciences",
      description: "Fiches de révision pour les examens de sciences",
      type: "document",
      format: "PDF",
      size: "3.1 MB",
      subject: "Sciences",
      level: "Collège",
      date: "28 avril 2023",
      downloads: 175,
    },
    {
      id: 5,
      title: "Présentation - Histoire",
      description: "Présentation sur la Révolution française",
      type: "presentation",
      format: "PPTX",
      size: "8.5 MB",
      subject: "Histoire",
      level: "Lycée",
      date: "25 avril 2023",
      downloads: 87,
    },
    {
      id: 6,
      title: "Images éducatives - Géographie",
      description: "Collection d'images pour l'enseignement de la géographie",
      type: "image",
      format: "ZIP",
      size: "12 MB",
      subject: "Géographie",
      level: "Primaire",
      date: "20 avril 2023",
      downloads: 64,
    },
  ]

  // Filtrer les ressources en fonction de la recherche
  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Fonction pour obtenir l'icône en fonction du type de ressource
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-600" />
      case "video":
        return <Video className="h-5 w-5 text-red-600" />
      case "presentation":
        return <Book className="h-5 w-5 text-amber-600" />
      case "image":
        return <FileImage className="h-5 w-5 text-green-600" />
      default:
        return <File className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <DashboardSidebar userRole={user?.role} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader userRole={user?.role} />
          <div className="p-6 flex-grow bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ressources pédagogiques</h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Accédez à toutes les ressources disponibles pour votre apprentissage
                  </p>
                </div>
                {user?.role === "admin" || user?.role === "teacher" ? (
                  <Button
                    className="mt-4 md:mt-0 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => router.push("/dashboard/resources/create")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une ressource
                  </Button>
                ) : null}
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Rechercher des ressources..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtres
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredResources.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Aucune ressource trouvée
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Aucune ressource ne correspond à votre recherche. Essayez avec d&apos;autres termes.
                        </p>
                      </div>
                    ) : (
                      filteredResources.map((resource) => (
                        <div
                          key={resource.id}
                          className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{resource.title}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
                                </div>
                                <div className="flex items-center mt-2 md:mt-0">
                                  <Badge className="mr-2 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    {resource.format}
                                  </Badge>
                                  <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {resource.subject}
                                  </Badge>
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    {resource.level}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <span className="mr-4">Taille: {resource.size}</span>
                                  <span className="mr-4">Ajouté le: {resource.date}</span>
                                  <span>{resource.downloads} téléchargements</span>
                                </div>
                                <Button
                                  size="sm"
                                  className="mt-2 md:mt-0 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Télécharger
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Affichage de {filteredResources.length} ressources sur {resources.length}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Précédent
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Suivant
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

