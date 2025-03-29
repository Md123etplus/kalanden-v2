"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { BookOpen, Award, Calendar, CheckCircle, Star, ArrowLeft, Settings, AlertTriangle, Bell } from "lucide-react"

export default function ChildProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const [child, setChild] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const userRole = user?.role || "parent"

  // Rediriger si l'utilisateur n'est pas parent
  const shouldRedirect = userRole !== "parent" && userRole !== "admin"

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/dashboard")
    }
  }, [shouldRedirect, router])

  if (shouldRedirect) {
    return null
  }

  useEffect(() => {
    // Simuler la récupération des données de l'enfant
    const fetchChildData = async () => {
      setLoading(true)
      try {
        // Données statiques pour les enfants
        const children = [
          {
            id: "1",
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
            totalTimeSpent: 28,
            alerts: [
              {
                type: "warning",
                message: "Difficulté détectée en mathématiques",
              },
            ],
            courses: [
              {
                id: 1,
                title: "Mathématiques fondamentales",
                progress: 75,
                lastAccessed: new Date(),
                nextLesson: {
                  title: "Module 1: Introduction à l'algèbre",
                  duration: "20 min",
                },
              },
              {
                id: 2,
                title: "Français avancé",
                progress: 60,
                lastAccessed: new Date(Date.now() - 86400000),
                nextLesson: {
                  title: "Module 2: Analyse de textes",
                  duration: "35 min",
                },
              },
              {
                id: 3,
                title: "Sciences physiques pour débutants",
                progress: 45,
                lastAccessed: new Date(Date.now() - 172800000),
                nextLesson: {
                  title: "Module 1: Les états de la matière",
                  duration: "25 min",
                },
              },
            ],
            achievements: [
              {
                title: "Premier pas",
                description: "Compléter le premier cours",
                date: new Date(Date.now() - 1209600000),
                icon: "CheckCircle",
              },
              {
                title: "Assiduité",
                description: "Se connecter 5 jours consécutifs",
                date: new Date(Date.now() - 345600000),
                icon: "Calendar",
              },
            ],
            weeklyActivity: [
              { day: "Lun", minutes: 45 },
              { day: "Mar", minutes: 60 },
              { day: "Mer", minutes: 0 },
              { day: "Jeu", minutes: 30 },
              { day: "Ven", minutes: 90 },
              { day: "Sam", minutes: 0 },
              { day: "Dim", minutes: 0 },
            ],
          },
          {
            id: "2",
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
            totalTimeSpent: 18,
            alerts: [],
            courses: [
              {
                id: 1,
                title: "Mathématiques fondamentales",
                progress: 85,
                lastAccessed: new Date(Date.now() - 86400000),
                nextLesson: {
                  title: "Module 3: Géométrie de base",
                  duration: "15 min",
                },
              },
              {
                id: 4,
                title: "Histoire pour les jeunes",
                progress: 65,
                lastAccessed: new Date(Date.now() - 259200000),
                nextLesson: {
                  title: "Module 2: Les grandes civilisations",
                  duration: "20 min",
                },
              },
            ],
            achievements: [
              {
                title: "Mathématicien en herbe",
                description: "Obtenir 100% à un quiz de mathématiques",
                date: new Date(Date.now() - 604800000),
                icon: "Award",
              },
            ],
            weeklyActivity: [
              { day: "Lun", minutes: 30 },
              { day: "Mar", minutes: 45 },
              { day: "Mer", minutes: 0 },
              { day: "Jeu", minutes: 0 },
              { day: "Ven", minutes: 45 },
              { day: "Sam", minutes: 20 },
              { day: "Dim", minutes: 0 },
            ],
          },
          {
            id: "3",
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
            totalTimeSpent: 22,
            alerts: [
              {
                type: "info",
                message: "Évaluation de français prévue cette semaine",
              },
            ],
            courses: [
              {
                id: 2,
                title: "Français avancé",
                progress: 90,
                lastAccessed: new Date(Date.now() - 259200000),
                nextLesson: {
                  title: "Module 4: Littérature du XIXe siècle",
                  duration: "40 min",
                },
              },
              {
                id: 5,
                title: "Histoire de l'art",
                progress: 85,
                lastAccessed: new Date(Date.now() - 345600000),
                nextLesson: {
                  title: "Module 3: La Renaissance",
                  duration: "30 min",
                },
              },
              {
                id: 6,
                title: "Physique-Chimie",
                progress: 75,
                lastAccessed: new Date(Date.now() - 432000000),
                nextLesson: {
                  title: "Module 2: Les réactions chimiques",
                  duration: "35 min",
                },
              },
              {
                id: 3,
                title: "Mathématiques avancées",
                progress: 55,
                lastAccessed: new Date(Date.now() - 518400000),
                nextLesson: {
                  title: "Module 2: Fonctions et dérivées",
                  duration: "45 min",
                },
              },
            ],
            achievements: [
              {
                title: "Expert en français",
                description: "Obtenir une note parfaite en français",
                date: new Date(Date.now() - 1209600000),
                icon: "Award",
              },
              {
                title: "Chercheur",
                description: "Compléter 10 modules d'apprentissage",
                date: new Date(Date.now() - 2419200000),
                icon: "BookOpen",
              },
            ],
            weeklyActivity: [
              { day: "Lun", minutes: 0 },
              { day: "Mar", minutes: 0 },
              { day: "Mer", minutes: 45 },
              { day: "Jeu", minutes: 0 },
              { day: "Ven", minutes: 30 },
              { day: "Sam", minutes: 15 },
              { day: "Dim", minutes: 0 },
            ],
          },
        ]

        const childId = params.id
        const foundChild = children.find((child) => child.id === childId)

        if (foundChild) {
          setChild(foundChild)
        } else {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'enfant:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChildData()
  }, [params.id, router])

  if (loading || !child) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex">
          <DashboardSidebar userRole={userRole} />
          <div className="flex-1 flex flex-col">
            <DashboardHeader userRole={userRole} />
            <div className="p-6 flex-grow bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
              <p>Chargement des données...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Fonction pour formater les minutes en heures et minutes
  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours > 0 ? `${hours}h ` : ""}${mins}min`
  }

  // Fonction pour obtenir l'icône en fonction du type
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "CheckCircle":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "Calendar":
        return <Calendar className="h-6 w-6 text-blue-500" />
      case "Award":
        return <Award className="h-6 w-6 text-amber-500" />
      case "BookOpen":
        return <BookOpen className="h-6 w-6 text-purple-500" />
      default:
        return <Star className="h-6 w-6 text-blue-500" />
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <DashboardSidebar userRole={userRole} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader userRole={userRole} />
          <div className="p-6 flex-grow bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center">
                <Button variant="ghost" className="mr-4" onClick={() => router.push("/dashboard")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profil de {child.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {child.age} ans • {child.level}
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => router.push(`/dashboard/children/${child.id}/settings`)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="md:col-span-1">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Informations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                      <Image src={child.avatar || "/placeholder.svg"} alt={child.name} fill className="object-cover" />
                    </div>
                    <h2 className="text-xl font-bold text-center">{child.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-center">{child.level}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Progression par matière
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(child.progress).map(([subject, progress]: [string, any]) => (
                          <div key={subject}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                {subject === "math"
                                  ? "Mathématiques"
                                  : subject === "french"
                                    ? "Français"
                                    : subject === "science"
                                      ? "Sciences"
                                      : subject === "history"
                                        ? "Histoire"
                                        : subject}
                              </span>
                              <span className="text-sm text-gray-700 dark:text-gray-300">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Temps d'apprentissage
                      </h3>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Cette semaine</span>
                          <span className="font-medium">{child.timeSpent}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Total</span>
                          <span className="font-medium">{child.totalTimeSpent}h</span>
                        </div>
                      </div>
                    </div>

                    {child.alerts.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Alertes</h3>
                        <div className="space-y-2">
                          {child.alerts.map((alert: any, index: number) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg flex items-start ${
                                alert.type === "warning"
                                  ? "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
                                  : "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                              }`}
                            >
                              {alert.type === "warning" ? (
                                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                              ) : (
                                <Bell className="h-5 w-5 mr-2 flex-shrink-0" />
                              )}
                              <span className="text-sm">{alert.message}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <Tabs defaultValue="activity" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="activity">Activité</TabsTrigger>
                      <TabsTrigger value="courses">Cours</TabsTrigger>
                      <TabsTrigger value="achievements">Réussites</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <TabsContent value="activity" className="mt-0">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Activité hebdomadaire</h3>
                        <div className="h-[200px] flex items-end justify-between">
                          {child.weeklyActivity.map((day: any, index: number) => (
                            <div key={index} className="flex flex-col items-center">
                              <div
                                className="w-10 bg-blue-500 dark:bg-blue-600 rounded-t-md"
                                style={{
                                  height: `${(day.minutes / Math.max(...child.weeklyActivity.map((d: any) => d.minutes || 1))) * 150}px`,
                                  minHeight: day.minutes > 0 ? "20px" : "4px",
                                }}
                              ></div>
                              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{day.day}</div>
                              <div className="text-xs font-medium">{formatMinutes(day.minutes)}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Dernière activité</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Dernière connexion: <span className="font-medium">{child.lastActivity}</span>
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="courses" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium mb-4">Cours suivis ({child.courses.length})</h3>

                      {child.courses.map((course: any) => (
                        <div key={course.id} className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{course.title}</h4>
                            <div className="flex items-center mt-2 sm:mt-0">
                              <Progress value={course.progress} className="h-2 w-24" />
                              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{course.progress}%</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Prochaine leçon: {course.nextLesson.title}
                          </p>
                          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-500">
                            <span>Durée: {course.nextLesson.duration}</span>
                            <Button size="sm" variant="outline" className="text-xs h-8">
                              Voir les détails
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="achievements" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium mb-4">Réussites ({child.achievements.length})</h3>

                      {child.achievements.length === 0 ? (
                        <div className="text-center py-8">
                          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 dark:text-gray-400">Aucune réussite pour le moment</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {child.achievements.map((achievement: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-start space-x-3">
                                <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                                  {getIcon(achievement.icon)}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    Obtenu le {achievement.date.toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommandations</CardTitle>
                <CardDescription>Suggestions personnalisées pour {child.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {child.progress.math < 70 && (
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Exercices de soutien en mathématiques
                        </h3>
                        <Button size="sm" variant="outline">
                          Assigner
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Des exercices supplémentaires pour renforcer les compétences en mathématiques.
                      </p>
                    </div>
                  )}

                  {child.weeklyActivity.reduce((total: number, day: any) => total + day.minutes, 0) < 120 && (
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Encourager plus de temps d'apprentissage
                        </h3>
                        <Button size="sm" variant="outline">
                          Définir un objectif
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Fixer un objectif de temps d'apprentissage hebdomadaire pour améliorer la progression.
                      </p>
                    </div>
                  )}

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">Cours recommandés</h3>
                      <Button size="sm" variant="outline">
                        Voir tous
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {Object.entries(child.progress)
                        .sort(([, a]: [string, any], [, b]: [string, any]) => a - b)
                        .slice(0, 2)
                        .map(([subject, progress]: [string, any]) => (
                          <div key={subject} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                            <h4 className="font-medium text-sm capitalize">
                              {subject === "math"
                                ? "Mathématiques"
                                : subject === "french"
                                  ? "Français"
                                  : subject === "science"
                                    ? "Sciences"
                                    : subject === "history"
                                      ? "Histoire"
                                      : subject}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              Cours adaptés pour améliorer les compétences en{" "}
                              {subject === "math"
                                ? "mathématiques"
                                : subject === "french"
                                  ? "français"
                                  : subject === "science"
                                    ? "sciences"
                                    : subject === "history"
                                      ? "histoire"
                                      : subject}
                            </p>
                            <Button size="sm" className="mt-2 w-full text-xs h-8">
                              Explorer
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

