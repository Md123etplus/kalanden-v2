"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"
import { BarChart, Clock, Calendar, TrendingUp, BookOpen, Award, CheckCircle, Users } from "lucide-react"

export default function StatisticsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [period, setPeriod] = useState("week")
  const userRole = user?.role || "student"

  // Données statiques pour les statistiques
  const studentStats = {
    coursesCompleted: 3,
    coursesInProgress: 4,
    totalHoursLearned: 28,
    certificatesEarned: 2,
    currentStreak: 5,
    longestStreak: 12,
    weeklyProgress: [
      { day: "Lun", hours: 1.5 },
      { day: "Mar", hours: 2.0 },
      { day: "Mer", hours: 0.5 },
      { day: "Jeu", hours: 1.0 },
      { day: "Ven", hours: 2.5 },
      { day: "Sam", hours: 0.0 },
      { day: "Dim", hours: 1.0 },
    ],
    subjectProgress: [
      { subject: "Mathématiques", progress: 75 },
      { subject: "Français", progress: 60 },
      { subject: "Sciences", progress: 45 },
      { subject: "Histoire", progress: 80 },
    ],
    monthlyProgress: [
      { month: "Jan", hours: 20 },
      { month: "Fév", hours: 25 },
      { month: "Mar", hours: 28 },
    ],
  }

  const parentStats = {
    children: [
      {
        name: "Emma",
        coursesCompleted: 2,
        coursesInProgress: 3,
        totalHoursLearned: 18,
        weeklyProgress: [
          { day: "Lun", hours: 1.0 },
          { day: "Mar", hours: 1.5 },
          { day: "Mer", hours: 0.0 },
          { day: "Jeu", hours: 0.5 },
          { day: "Ven", hours: 2.0 },
          { day: "Sam", hours: 0.0 },
          { day: "Dim", hours: 0.5 },
        ],
        subjectProgress: [
          { subject: "Mathématiques", progress: 65 },
          { subject: "Français", progress: 80 },
          { subject: "Sciences", progress: 55 },
          { subject: "Histoire", progress: 70 },
        ],
      },
      {
        name: "Lucas",
        coursesCompleted: 1,
        coursesInProgress: 2,
        totalHoursLearned: 12,
        weeklyProgress: [
          { day: "Lun", hours: 0.5 },
          { day: "Mar", hours: 1.0 },
          { day: "Mer", hours: 0.5 },
          { day: "Jeu", hours: 0.0 },
          { day: "Ven", hours: 1.5 },
          { day: "Sam", hours: 0.0 },
          { day: "Dim", hours: 0.5 },
        ],
        subjectProgress: [
          { subject: "Mathématiques", progress: 85 },
          { subject: "Français", progress: 70 },
          { subject: "Sciences", progress: 90 },
          { subject: "Histoire", progress: 65 },
        ],
      },
      {
        name: "Zoé",
        coursesCompleted: 3,
        coursesInProgress: 2,
        totalHoursLearned: 22,
        weeklyProgress: [
          { day: "Lun", hours: 1.0 },
          { day: "Mar", hours: 0.5 },
          { day: "Mer", hours: 0.0 },
          { day: "Jeu", hours: 1.5 },
          { day: "Ven", hours: 1.0 },
          { day: "Sam", hours: 0.0 },
          { day: "Dim", hours: 0.5 },
        ],
        subjectProgress: [
          { subject: "Mathématiques", progress: 55 },
          { subject: "Français", progress: 90 },
          { subject: "Sciences", progress: 75 },
          { subject: "Histoire", progress: 85 },
        ],
      },
    ],
    totalHoursLearned: 52,
    monthlyProgress: [
      { month: "Jan", hours: 40 },
      { month: "Fév", hours: 45 },
      { month: "Mar", hours: 52 },
    ],
  }

  const adminStats = {
    totalStudents: 156,
    activeCourses: 24,
    completionRate: 78,
    averageScore: 82,
    newEnrollments: [
      { month: "Jan", count: 25 },
      { month: "Fév", count: 32 },
      { month: "Mar", count: 28 },
    ],
    courseCompletion: [
      { course: "Mathématiques fondamentales", completion: 85 },
      { course: "Français avancé", completion: 92 },
      { course: "Sciences physiques", completion: 78 },
      { course: "Histoire de l'art", completion: 65 },
      { course: "Programmation Python", completion: 70 },
    ],
    studentActivity: [
      { day: "Lun", count: 120 },
      { day: "Mar", count: 135 },
      { day: "Mer", count: 95 },
      { day: "Jeu", count: 110 },
      { day: "Ven", count: 125 },
      { day: "Sam", count: 60 },
      { day: "Dim", count: 45 },
    ],
    monthlyActivity: [
      { month: "Jan", count: 2500 },
      { month: "Fév", count: 2800 },
      { month: "Mar", count: 3100 },
    ],
  }

  // Fonction pour obtenir le maximum des heures d'apprentissage
  const getMaxHours = (data: any[]) => {
    return Math.max(...data.map((item) => item.hours)) + 0.5
  }

  // Fonction pour obtenir le maximum des compteurs
  const getMaxCount = (data: any[]) => {
    return Math.max(...data.map((item) => item.count)) + 10
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
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Statistiques</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {userRole === "admin"
                    ? "Analysez les performances de votre établissement"
                    : userRole === "parent"
                      ? "Suivez les progrès de vos enfants"
                      : "Suivez votre progression d'apprentissage"}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Tabs defaultValue="week" onValueChange={setPeriod} className="w-[300px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="week">Semaine</TabsTrigger>
                    <TabsTrigger value="month">Mois</TabsTrigger>
                    <TabsTrigger value="year">Année</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Statistiques pour les étudiants */}
            {userRole === "student" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cours terminés</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {studentStats.coursesCompleted}
                        </h3>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Heures d'apprentissage</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {studentStats.totalHoursLearned}h
                        </h3>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Certifications</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {studentStats.certificatesEarned}
                        </h3>
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
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {studentStats.currentStreak} jours
                        </h3>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Temps d'apprentissage</CardTitle>
                      <CardDescription>Heures passées à apprendre cette semaine</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-end justify-between">
                        {studentStats.weeklyProgress.map((day, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div
                              className="w-12 bg-blue-500 dark:bg-blue-600 rounded-t-md"
                              style={{
                                height: `${(day.hours / getMaxHours(studentStats.weeklyProgress)) * 200}px`,
                                minHeight: day.hours > 0 ? "20px" : "4px",
                              }}
                            ></div>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{day.day}</div>
                            <div className="text-xs font-medium">{day.hours}h</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Progression par matière</CardTitle>
                      <CardDescription>Votre avancement dans chaque matière</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {studentStats.subjectProgress.map((subject, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {subject.subject}
                              </span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {subject.progress}%
                              </span>
                            </div>
                            <Progress value={subject.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Statistiques pour les parents */}
            {userRole === "parent" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {parentStats.children.map((child, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{child.name}</CardTitle>
                        <CardDescription>Statistiques d'apprentissage</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Cours terminés</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{child.coursesCompleted}</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Heures d'apprentissage</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                              {child.totalHoursLearned}h
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Progression par matière</h4>
                          <div className="space-y-3">
                            {child.subjectProgress.map((subject, idx) => (
                              <div key={idx}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-xs text-gray-600 dark:text-gray-400">{subject.subject}</span>
                                  <span className="text-xs text-gray-600 dark:text-gray-400">{subject.progress}%</span>
                                </div>
                                <Progress value={subject.progress} className="h-1.5" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Temps d'apprentissage total</CardTitle>
                      <CardDescription>Heures totales d'apprentissage de vos enfants</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                            {parentStats.totalHoursLearned}h
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">Temps total d'apprentissage</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Progression mensuelle</CardTitle>
                      <CardDescription>Évolution du temps d'apprentissage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-end justify-between">
                        {parentStats.monthlyProgress.map((month, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div
                              className="w-16 bg-blue-500 dark:bg-blue-600 rounded-t-md"
                              style={{
                                height: `${(month.hours / Math.max(...parentStats.monthlyProgress.map((m) => m.hours))) * 150}px`,
                              }}
                            ></div>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{month.month}</div>
                            <div className="text-xs font-medium">{month.hours}h</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Statistiques pour les administrateurs */}
            {userRole === "admin" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Élèves</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {adminStats.totalStudents}
                        </h3>
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
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {adminStats.activeCourses}
                        </h3>
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
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {adminStats.completionRate}%
                        </h3>
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
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {adminStats.averageScore}/100
                        </h3>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Activité des élèves</CardTitle>
                      <CardDescription>Nombre d'élèves actifs par jour</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-end justify-between">
                        {adminStats.studentActivity.map((day, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div
                              className="w-12 bg-blue-500 dark:bg-blue-600 rounded-t-md"
                              style={{
                                height: `${(day.count / getMaxCount(adminStats.studentActivity)) * 200}px`,
                              }}
                            ></div>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{day.day}</div>
                            <div className="text-xs font-medium">{day.count}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Taux de complétion des cours</CardTitle>
                      <CardDescription>Pourcentage de complétion par cours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {adminStats.courseCompletion.map((course, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {course.course}
                              </span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {course.completion}%
                              </span>
                            </div>
                            <Progress value={course.completion} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Évolution mensuelle</CardTitle>
                    <CardDescription>Nouvelles inscriptions par mois</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-end justify-between px-12">
                      {adminStats.monthlyActivity.map((month, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="w-24 bg-blue-500 dark:bg-blue-600 rounded-t-md"
                            style={{
                              height: `${(month.count / Math.max(...adminStats.monthlyActivity.map((m) => m.count))) * 250}px`,
                            }}
                          ></div>
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{month.month}</div>
                          <div className="text-xs font-medium">{month.count}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

