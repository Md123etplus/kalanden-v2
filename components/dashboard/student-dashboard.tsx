"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Clock,
  Award,
  BarChart,
  Calendar,
  CheckCircle,
  Star,
  TrendingUp,
  PlayCircle,
  Download,
  FileText,
} from "lucide-react"
import { coursService } from "@/lib/api-service"
import { useAuth } from "@/contexts/auth-context"

export function StudentDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalHoursLearned: 0,
    certificatesEarned: 0,
    currentStreak: 5,
    longestStreak: 12,
  })

  useEffect(() => {
    const fetchUserCourses = async () => {
      setLoading(true)
      try {
        if (user) {
          const { data, error } = await coursService.getAllCourses()
          if (error) throw error

          // Simuler des données de progression pour chaque cours
          const coursesWithProgress = data.slice(0, 4).map((course: any, index: number) => {
            const progress = [75, 45, 20, 90][index]
            const lastAccessed = new Date()
            lastAccessed.setDate(lastAccessed.getDate() - index)

            return {
              ...course,
              progress,
              lastAccessed,
              nextLesson: {
                title: `Module ${index + 1}: ${["Introduction", "Concepts fondamentaux", "Applications pratiques", "Évaluation finale"][index]}`,
                duration: `${[20, 35, 45, 30][index]} min`,
              },
            }
          })

          setCourses(coursesWithProgress)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cours:", error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchUserCourses()
  }, [user])

  const upcomingEvents = [
    {
      title: "Évaluation: Mathématiques fondamentales",
      date: "Demain, 14:00",
      type: "evaluation",
    },
    {
      title: "Date limite: Projet de français",
      date: "Vendredi, 23:59",
      type: "deadline",
    },
    {
      title: "Session en direct: Préparation aux examens",
      date: "Samedi, 10:00",
      type: "live",
    },
  ]

  const achievements = [
    {
      title: "Premier pas",
      description: "Compléter votre premier cours",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      completed: true,
    },
    {
      title: "Assiduité",
      description: "Se connecter 7 jours consécutifs",
      icon: <Calendar className="h-8 w-8 text-blue-500" />,
      completed: true,
    },
    {
      title: "Expert en mathématiques",
      description: "Obtenir une note parfaite dans un test de mathématiques",
      icon: <Award className="h-8 w-8 text-amber-500" />,
      completed: false,
      progress: 80,
    },
  ]

  const recommendations = [
    {
      id: 1,
      title: "Physique pour débutants",
      instructor: "Dr. Thomas Blanc",
      image: "/placeholder.svg?height=100&width=150",
      match: "98% de correspondance",
    },
    {
      id: 2,
      title: "Introduction à la littérature française",
      instructor: "Prof. Claire Dubois",
      image: "/placeholder.svg?height=100&width=150",
      match: "95% de correspondance",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de bord</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bienvenue, {user?.full_name || "Étudiant"}. Voici un aperçu de votre apprentissage.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            onClick={() => router.push("/cours")}
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Explorer les cours
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cours en cours</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{courses.length}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Heures d&apos;apprentissage</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalHoursLearned}h</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Certifications</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.certificatesEarned}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Série actuelle</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.currentStreak} jours</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informations d'abonnement */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Votre abonnement</CardTitle>
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Premium Étudiant</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Statut</span>
              <span className="font-medium text-green-600 dark:text-green-400">Actif</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Prix mensuel</span>
              <span className="font-medium">10€/mois</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Prochain paiement</span>
              <span className="font-medium">15 juin 2023</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Méthode de paiement</span>
              <span className="font-medium">Carte se terminant par 4242</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1" onClick={() => router.push("/dashboard/billing")}>
              Historique
            </Button>
            <Button
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={() => router.push("/dashboard/subscription")}
            >
              Gérer
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cours en cours */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Mes cours en cours</CardTitle>
              <CardDescription>Continuez votre apprentissage là où vous vous êtes arrêté</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Chargement de vos cours...</p>
              ) : courses.length === 0 ? (
                <div className="text-center py-6">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun cours en cours</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Vous n&apos;avez pas encore commencé de cours. Explorez notre catalogue pour commencer votre
                    apprentissage.
                  </p>
                  <Button
                    onClick={() => router.push("/cours")}
                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Explorer les cours
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                      onClick={() => router.push(`/cours/${course.id}`)}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="relative h-20 w-32 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                            <Badge
                              className={`${
                                course.level === "Débutant"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : course.level === "Intermédiaire"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                    : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                              } mt-1 sm:mt-0`}
                            >
                              {course.level}
                            </Badge>
                          </div>
                          <div className="mb-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Prochaine leçon: {course.nextLesson.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              Durée: {course.nextLesson.duration}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                              <Progress value={course.progress} className="h-2 w-24" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{course.progress}%</span>
                            </div>
                            <Button
                              size="sm"
                              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/cours/${course.id}/learn`)
                              }}
                            >
                              <PlayCircle className="h-4 w-4 mr-1" />
                              Continuer
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
              <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/courses")}>
                Voir tous mes cours
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Événements à venir et réalisations */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Événements à venir</CardTitle>
              <CardDescription>Vos prochaines échéances et sessions</CardDescription>
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
                        <PlayCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
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
                Voir mon calendrier
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Réalisations</CardTitle>
              <CardDescription>Vos badges et accomplissements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                      {achievement.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 dark:text-white">{achievement.title}</p>
                        {achievement.completed ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Complété
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                            En cours
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</p>
                      {!achievement.completed && achievement.progress && (
                        <div className="mt-2 flex items-center space-x-2">
                          <Progress value={achievement.progress} className="h-2 flex-grow" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{achievement.progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/achievements")}>
                Voir toutes mes réalisations
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Ressources téléchargeables */}
      <Card>
        <CardHeader>
          <CardTitle>Ressources téléchargeables</CardTitle>
          <CardDescription>Documents et supports de cours disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Guide d'étude - Mathématiques</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF • 2.4 MB</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Télécharger
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Exercices pratiques - Français</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF • 1.8 MB</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Télécharger
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Fiches de révision - Sciences</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF • 3.1 MB</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Télécharger
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/resources")}>
            Voir toutes les ressources
          </Button>
        </CardFooter>
      </Card>

      {/* Recommandations et statistiques d'apprentissage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recommandations pour vous</CardTitle>
            <CardDescription>Basées sur vos intérêts et votre historique d&apos;apprentissage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="flex items-center space-x-4 p-3 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => router.push(`/cours/${recommendation.id}`)}
                >
                  <div className="relative h-16 w-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={recommendation.image || "/placeholder.svg"}
                      alt={recommendation.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{recommendation.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{recommendation.instructor}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                      <span className="text-xs text-amber-600 dark:text-amber-400">{recommendation.match}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/cours")}>
              Explorer plus de cours
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques d&apos;apprentissage</CardTitle>
            <CardDescription>Votre activité des 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <BarChart className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Statistiques détaillées</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Suivez votre progression et analysez vos habitudes d&apos;apprentissage.
              </p>
              <Button
                onClick={() => router.push("/dashboard/statistics")}
                className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Voir mes statistiques
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

