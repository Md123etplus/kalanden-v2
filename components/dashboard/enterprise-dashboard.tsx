"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  BookOpen,
  BarChart,
  TrendingUp,
  Clock,
  FileText,
  Settings,
  PlusCircle,
  School,
  UserPlus,
  CheckCircle,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function EnterpriseDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalStudents: 156,
    activeCourses: 24,
    completionRate: 78,
    averageScore: 82,
  })
  const [loading, setLoading] = useState(false)

  const recentActivity = [
    {
      type: "enrollment",
      description: "5 nouveaux élèves inscrits au cours de Mathématiques Avancées",
      time: "Il y a 2 heures",
    },
    {
      type: "completion",
      description: "La classe de 3ème B a terminé le module d'Algèbre",
      time: "Il y a 1 jour",
    },
    {
      type: "performance",
      description: "La moyenne des notes a augmenté de 8% ce mois-ci",
      time: "Il y a 3 jours",
    },
  ]

  const upcomingEvents = [
    {
      title: "Réunion pédagogique",
      date: "Demain, 14:00",
      type: "meeting",
    },
    {
      title: "Fin du semestre",
      date: "Dans 2 semaines",
      type: "deadline",
    },
    {
      title: "Publication des nouveaux cours",
      date: "15 Juin, 09:00",
      type: "release",
    },
  ]

  const topCourses = [
    {
      title: "Mathématiques - Niveau Collège",
      students: 45,
      completionRate: 85,
      averageScore: 76,
    },
    {
      title: "Français - Expression écrite",
      students: 38,
      completionRate: 92,
      averageScore: 84,
    },
    {
      title: "Sciences - Physique-Chimie",
      students: 32,
      completionRate: 78,
      averageScore: 72,
    },
  ]

  const topClasses = [
    {
      name: "Classe de 4ème A",
      students: 28,
      activeCourses: 6,
      averageScore: 81,
    },
    {
      name: "Classe de 3ème B",
      students: 26,
      activeCourses: 7,
      averageScore: 79,
    },
    {
      name: "Classe de 5ème C",
      students: 30,
      activeCourses: 5,
      averageScore: 75,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de bord administrateur</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bienvenue, {user?.full_name || "Administrateur"}. Voici un aperçu de votre établissement.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline" onClick={() => router.push("/dashboard/reports")} className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Rapports
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center"
            onClick={() => router.push("/dashboard/settings")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Élèves</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalStudents}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cours actifs</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.activeCourses}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Taux de complétion</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.completionRate}%</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <BarChart className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Note moyenne</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.averageScore}/100</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gestion des abonnements */}
      <Card>
        <CardHeader>
          <CardTitle>Gestion des abonnements</CardTitle>
          <CardDescription>Vue d'ensemble des abonnements actifs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Abonnements Gratuits</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">42</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">0€ / mois</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Premium Étudiant</p>
                    <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">78</h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">10€ / mois</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 dark:bg-purple-900/20">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Pack Famille</p>
                    <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-1">36</h3>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">15€ / mois</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-amber-50 dark:bg-amber-900/20">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Accès Privé</p>
                    <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-300 mt-1">5</h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Sur mesure</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Revenu mensuel récurrent</h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">2,340€</p>
                <div className="flex space-x-4 mt-1">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Part plateforme (30%)</p>
                    <p className="text-sm font-medium">702€</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Part clients (70%)</p>
                    <p className="text-sm font-medium">1,638€</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={() => router.push("/dashboard/revenue")}>
                <BarChart className="h-4 w-4 mr-2" />
                Voir les détails
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/subscriptions")}>
            Gérer les abonnements
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activité récente et événements à venir */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Les dernières activités de votre établissement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === "enrollment"
                          ? "bg-blue-100 dark:bg-blue-900"
                          : activity.type === "completion"
                            ? "bg-green-100 dark:bg-green-900"
                            : "bg-amber-100 dark:bg-amber-900"
                      }`}
                    >
                      {activity.type === "enrollment" ? (
                        <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      ) : activity.type === "completion" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{activity.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/activity")}>
                Voir toute l&apos;activité
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Événements à venir</CardTitle>
              <CardDescription>Prochaines échéances et activités</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        event.type === "meeting"
                          ? "bg-blue-100 dark:bg-blue-900"
                          : event.type === "deadline"
                            ? "bg-red-100 dark:bg-red-900"
                            : "bg-green-100 dark:bg-green-900"
                      }`}
                    >
                      {event.type === "meeting" ? (
                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      ) : event.type === "deadline" ? (
                        <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
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
                Voir le calendrier
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Actions rapides */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Gérez votre établissement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 justify-start"
                onClick={() => router.push("/dashboard/students/add")}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Ajouter un élève
              </Button>
              <Button
                className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 justify-start"
                onClick={() => router.push("/dashboard/courses/create")}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Créer un cours
              </Button>
              <Button
                className="w-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 justify-start"
                onClick={() => router.push("/dashboard/classes/create")}
              >
                <School className="h-4 w-4 mr-2" />
                Créer une classe
              </Button>
              <Button
                className="w-full bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 justify-start"
                onClick={() => router.push("/dashboard/reports/generate")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Générer un rapport
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statistiques d&apos;utilisation</CardTitle>
              <CardDescription>Activité des 7 derniers jours</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Statistiques détaillées</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Analysez l&apos;activité et les performances de votre établissement.
                </p>
                <Button
                  onClick={() => router.push("/dashboard/statistics")}
                  className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Voir les statistiques
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cours et classes populaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cours les plus populaires</CardTitle>
            <CardDescription>Les cours avec le plus d&apos;élèves et de participation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{course.title}</h3>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {course.students} élèves
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Taux de complétion</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={course.completionRate} className="h-1.5 flex-grow" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {course.completionRate}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Note moyenne</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={course.averageScore} className="h-1.5 flex-grow" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {course.averageScore}/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/courses-management")}>
              Gérer tous les cours
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Classes les plus actives</CardTitle>
            <CardDescription>Les classes avec le plus d&apos;activité et de performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClasses.map((classItem, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{classItem.name}</h3>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      {classItem.students} élèves
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cours actifs</p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {classItem.activeCourses} cours
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Note moyenne</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={classItem.averageScore} className="h-1.5 flex-grow" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {classItem.averageScore}/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/classes")}>
              Gérer toutes les classes
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Gestion des paiements */}
      <Card>
        <CardHeader>
          <CardTitle>Dernières transactions</CardTitle>
          <CardDescription>Aperçu des paiements récents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-gray-500 dark:text-gray-400 text-sm">ID</th>
                    <th className="text-left py-2 font-medium text-gray-500 dark:text-gray-400 text-sm">Utilisateur</th>
                    <th className="text-left py-2 font-medium text-gray-500 dark:text-gray-400 text-sm">Abonnement</th>
                    <th className="text-left py-2 font-medium text-gray-500 dark:text-gray-400 text-sm">Montant</th>
                    <th className="text-left py-2 font-medium text-gray-500 dark:text-gray-400 text-sm">Date</th>
                    <th className="text-left py-2 font-medium text-gray-500 dark:text-gray-400 text-sm">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-sm">#8742</td>
                    <td className="py-2 text-sm">Martin Dubois</td>
                    <td className="py-2 text-sm">Premium Étudiant</td>
                    <td className="py-2 text-sm">10.00€</td>
                    <td className="py-2 text-sm">15/05/2023</td>
                    <td className="py-2 text-sm">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Réussi
                      </Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-sm">#8741</td>
                    <td className="py-2 text-sm">Sophie Martin</td>
                    <td className="py-2 text-sm">Pack Famille</td>
                    <td className="py-2 text-sm">15.00€</td>
                    <td className="py-2 text-sm">14/05/2023</td>
                    <td className="py-2 text-sm">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Réussi
                      </Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-sm">#8740</td>
                    <td className="py-2 text-sm">Lycée Jean Moulin</td>
                    <td className="py-2 text-sm">Accès Privé</td>
                    <td className="py-2 text-sm">750.00€</td>
                    <td className="py-2 text-sm">12/05/2023</td>
                    <td className="py-2 text-sm">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Réussi
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm">#8739</td>
                    <td className="py-2 text-sm">Thomas Bernard</td>
                    <td className="py-2 text-sm">Premium Étudiant</td>
                    <td className="py-2 text-sm">10.00€</td>
                    <td className="py-2 text-sm">10/05/2023</td>
                    <td className="py-2 text-sm">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Échoué</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/transactions")}>
            Voir toutes les transactions
          </Button>
        </CardFooter>
      </Card>

      {/* Gestion des contenus */}
      <Card>
        <CardHeader>
          <CardTitle>Gestion des contenus</CardTitle>
          <CardDescription>Aperçu des contenus pédagogiques</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Cours</h3>
                  <Badge>{stats.activeCourses}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Button size="sm" variant="outline" onClick={() => router.push("/dashboard/courses-management")}>
                    Gérer
                  </Button>
                  <Button size="sm" onClick={() => router.push("/dashboard/courses/create")}>
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Ajouter
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Ressources</h3>
                  <Badge>42</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Button size="sm" variant="outline" onClick={() => router.push("/dashboard/resources")}>
                    Gérer
                  </Button>
                  <Button size="sm" onClick={() => router.push("/dashboard/resources/create")}>
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Ajouter
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Évaluations</h3>
                  <Badge>18</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Button size="sm" variant="outline" onClick={() => router.push("/dashboard/assessments")}>
                    Gérer
                  </Button>
                  <Button size="sm" onClick={() => router.push("/dashboard/assessments/create")}>
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/content")}>
            Centre de contenu
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

