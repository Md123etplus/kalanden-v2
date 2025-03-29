"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, BarChart, Calendar, BookOpen, Settings, AlertTriangle, CheckCircle, Bell } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export function ParentDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [children, setChildren] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler la récupération des profils enfants
    const fetchChildren = async () => {
      setLoading(true)
      try {
        // Données statiques pour les enfants
        const mockChildren = [
          {
            id: 1,
            name: "Emma Dupont",
            age: 12,
            avatar: "/placeholder.svg?height=100&width=100",
            level: "Collège - 5ème",
            lastActivity: "Aujourd'hui, 15:30",
            progress: {
              math: 75,
              french: 60,
              science: 45,
              history: 80,
            },
            timeSpent: "3h 45min cette semaine",
            alerts: [
              {
                type: "warning",
                message: "Difficulté détectée en mathématiques",
              },
            ],
          },
          {
            id: 2,
            name: "Lucas Dupont",
            age: 9,
            avatar: "/placeholder.svg?height=100&width=100",
            level: "Primaire - CE2",
            lastActivity: "Hier, 17:15",
            progress: {
              math: 85,
              french: 70,
              science: 90,
              history: 65,
            },
            timeSpent: "2h 20min cette semaine",
            alerts: [],
          },
          {
            id: 3,
            name: "Zoé Dupont",
            age: 15,
            avatar: "/placeholder.svg?height=100&width=100",
            level: "Lycée - 2nde",
            lastActivity: "Il y a 3 jours",
            progress: {
              math: 55,
              french: 90,
              science: 75,
              history: 85,
            },
            timeSpent: "1h 30min cette semaine",
            alerts: [
              {
                type: "info",
                message: "Évaluation de français prévue cette semaine",
              },
            ],
          },
        ]

        setChildren(mockChildren)
      } catch (error) {
        console.error("Erreur lors de la récupération des profils enfants:", error)
        setChildren([])
      } finally {
        setLoading(false)
      }
    }

    fetchChildren()
  }, [])

  const upcomingEvents = [
    {
      title: "Évaluation de mathématiques - Emma",
      date: "Demain, 14:00",
      type: "evaluation",
    },
    {
      title: "Fin du module de lecture - Lucas",
      date: "Vendredi, 23:59",
      type: "deadline",
    },
    {
      title: "Réunion parents-professeurs",
      date: "Samedi, 10:00",
      type: "meeting",
    },
  ]

  const recommendations = [
    {
      title: "Exercices de soutien en mathématiques",
      description: "Recommandé pour Emma",
      action: "Assigner",
    },
    {
      title: "Lecture avancée pour les 15-16 ans",
      description: "Recommandé pour Zoé",
      action: "Assigner",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de bord parental</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bienvenue, {user?.full_name || "Parent"}. Suivez les progrès de vos enfants.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            onClick={() => router.push("/dashboard/children/add")}
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Ajouter un enfant
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Enfants</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{children.length}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Temps d&apos;apprentissage</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">7h 35min</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cours actifs</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">12</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alertes</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">2</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <Bell className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informations d'abonnement */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Votre abonnement</CardTitle>
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Pack Famille</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Statut</span>
              <span className="font-medium text-green-600 dark:text-green-400">Actif</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Prix mensuel</span>
              <span className="font-medium">15€/mois</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Prochain paiement</span>
              <span className="font-medium">22 juin 2023</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Enfants inclus</span>
              <span className="font-medium">3/3 utilisés</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1" onClick={() => router.push("/dashboard/billing")}>
              Historique
            </Button>
            <Button
              className="flex-1 bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
              onClick={() => router.push("/dashboard/subscription")}
            >
              Gérer
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Profils des enfants */}
      <Card>
        <CardHeader>
          <CardTitle>Profils des enfants</CardTitle>
          <CardDescription>Aperçu des activités et progrès de vos enfants</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Chargement des profils...</p>
          ) : children.length === 0 ? (
            <div className="text-center py-6">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun profil enfant</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Vous n&apos;avez pas encore ajouté de profil enfant. Ajoutez-en un pour commencer à suivre leurs
                progrès.
              </p>
              <Button
                onClick={() => router.push("/dashboard/children/add")}
                className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Ajouter un enfant
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => router.push(`/dashboard/children/${child.id}`)}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={child.avatar || "/placeholder.svg"} alt={child.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{child.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {child.age} ans • {child.level}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                          Dernière activité: {child.lastActivity}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Progrès par matière
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Mathématiques</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={child.progress.math} className="h-1.5 w-24" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">{child.progress.math}%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Français</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={child.progress.french} className="h-1.5 w-24" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {child.progress.french}%
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Sciences</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={child.progress.science} className="h-1.5 w-24" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {child.progress.science}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Informations</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Temps d&apos;apprentissage: {child.timeSpent}
                          </p>
                          {child.alerts.length > 0 ? (
                            <div className="space-y-1">
                              {child.alerts.map((alert: any, index: number) => (
                                <div
                                  key={index}
                                  className={`flex items-center text-xs ${
                                    alert.type === "warning"
                                      ? "text-amber-600 dark:text-amber-400"
                                      : "text-blue-600 dark:text-blue-400"
                                  }`}
                                >
                                  {alert.type === "warning" ? (
                                    <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                                  ) : (
                                    <Bell className="h-3 w-3 mr-1 flex-shrink-0" />
                                  )}
                                  {alert.message}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                              <CheckCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                              Aucune alerte
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/dashboard/children/${child.id}/settings`)
                          }}
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          Paramètres
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/dashboard/children/${child.id}/progress`)
                          }}
                        >
                          <BarChart className="h-4 w-4 mr-1" />
                          Voir les progrès
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/children")}>
            Gérer tous les profils
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Événements à venir */}
        <Card>
          <CardHeader>
            <CardTitle>Événements à venir</CardTitle>
            <CardDescription>Prochaines échéances et activités pour vos enfants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      event.type === "evaluation"
                        ? "bg-amber-100 dark:bg-amber-900"
                        : event.type === "deadline"
                          ? "bg-red-100 dark:bg-red-900"
                          : "bg-green-100 dark:bg-green-900"
                    }`}
                  >
                    {event.type === "evaluation" ? (
                      <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    ) : event.type === "deadline" ? (
                      <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />
                    ) : (
                      <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/calendar")}>
              Voir le calendrier complet
            </Button>
          </CardFooter>
        </Card>

        {/* Recommandations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommandations</CardTitle>
            <CardDescription>Suggestions personnalisées pour vos enfants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{recommendation.title}</h3>
                    <Button size="sm" variant="outline">
                      {recommendation.action}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{recommendation.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/recommendations")}>
              Voir toutes les recommandations
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Contrôle parental */}
      <Card>
        <CardHeader>
          <CardTitle>Contrôle parental</CardTitle>
          <CardDescription>Gérez l'accès et les limites pour vos enfants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">Temps d'écran</h3>
                <Switch checked={true} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Limiter le temps d'utilisation quotidien</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Emma</p>
                  <p className="text-sm font-medium">2h / jour</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Lucas</p>
                  <p className="text-sm font-medium">1h30 / jour</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Zoé</p>
                  <p className="text-sm font-medium">3h / jour</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">Contenu accessible</h3>
                <Switch checked={true} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Filtrer le contenu par âge et niveau</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Emma</p>
                  <Badge className="bg-green-100 text-green-800">Adapté 12+</Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Lucas</p>
                  <Badge className="bg-green-100 text-green-800">Adapté 9+</Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Zoé</p>
                  <Badge className="bg-green-100 text-green-800">Adapté 15+</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/parental-controls")}>
            Paramètres avancés
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

