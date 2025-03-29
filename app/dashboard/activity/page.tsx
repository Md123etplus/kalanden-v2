"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { BookOpen, Calendar, CheckCircle, Clock, FileText, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import Navbar from "@/components/navbar"

// Données statiques pour les activités
const activities = [
  {
    id: 1,
    type: "course_progress",
    title: "Progression du cours",
    description: "A terminé le module 'Algèbre linéaire'",
    date: "2025-03-24T14:30:00",
    user: {
      name: "Sophie Martin",
      role: "student",
    },
    course: "Mathématiques avancées",
  },
  {
    id: 2,
    type: "exam_completed",
    title: "Examen terminé",
    description: "A obtenu 85% à l'examen de 'Grammaire française'",
    date: "2025-03-23T10:15:00",
    user: {
      name: "Lucas Dubois",
      role: "student",
    },
    course: "Français",
  },
  {
    id: 3,
    type: "message",
    title: "Nouveau message",
    description: "A envoyé un message concernant le devoir de sciences",
    date: "2025-03-22T16:45:00",
    user: {
      name: "Emma Bernard",
      role: "parent",
    },
  },
  {
    id: 4,
    type: "enrollment",
    title: "Inscription au cours",
    description: "S'est inscrit au cours 'Introduction à la physique'",
    date: "2025-03-21T09:00:00",
    user: {
      name: "Thomas Petit",
      role: "student",
    },
    course: "Introduction à la physique",
  },
  {
    id: 5,
    type: "assignment_submitted",
    title: "Devoir soumis",
    description: "A soumis le devoir 'Analyse littéraire'",
    date: "2025-03-20T18:30:00",
    user: {
      name: "Léa Moreau",
      role: "student",
    },
    course: "Littérature française",
  },
  {
    id: 6,
    type: "course_created",
    title: "Cours créé",
    description: "A créé un nouveau cours 'Histoire de l'art'",
    date: "2025-03-19T11:20:00",
    user: {
      name: "Marc Dupont",
      role: "teacher",
    },
  },
]

export default function ActivityPage() {
  const [filter, setFilter] = useState("all")
  const { user } = useAuth()

  // Filtrer les activités en fonction de l'onglet sélectionné
  const filteredActivities = activities.filter((activity) => {
    if (filter === "all") return true
    if (filter === "students") return activity.user.role === "student"
    if (filter === "parents") return activity.user.role === "parent"
    if (filter === "teachers") return activity.user.role === "teacher"
    return true
  })

  // Fonction pour obtenir l'icône en fonction du type d'activité
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course_progress":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "exam_completed":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case "enrollment":
        return <BookOpen className="h-5 w-5 text-yellow-500" />
      case "assignment_submitted":
        return <FileText className="h-5 w-5 text-orange-500" />
      case "course_created":
        return <Calendar className="h-5 w-5 text-indigo-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Activités récentes</CardTitle>
            <CardDescription>Suivez les dernières activités sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="students">Étudiants</TabsTrigger>
                <TabsTrigger value="parents">Parents</TabsTrigger>
                <TabsTrigger value="teachers">Enseignants</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <ActivityList activities={filteredActivities} getActivityIcon={getActivityIcon} />
              </TabsContent>
              <TabsContent value="students" className="mt-6">
                <ActivityList activities={filteredActivities} getActivityIcon={getActivityIcon} />
              </TabsContent>
              <TabsContent value="parents" className="mt-6">
                <ActivityList activities={filteredActivities} getActivityIcon={getActivityIcon} />
              </TabsContent>
              <TabsContent value="teachers" className="mt-6">
                <ActivityList activities={filteredActivities} getActivityIcon={getActivityIcon} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function ActivityList({
  activities,
  getActivityIcon,
}: { activities: any[]; getActivityIcon: (type: string) => JSX.Element }) {
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="h-12 w-12 text-gray-300 dark:text-gray-600" />
        <h3 className="mt-4 text-lg font-medium">Aucune activité</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Il n'y a pas d'activités récentes dans cette catégorie.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{activity.title}</h4>
              <Badge variant="outline" className="ml-2">
                {activity.user.role === "student" && "Étudiant"}
                {activity.user.role === "parent" && "Parent"}
                {activity.user.role === "teacher" && "Enseignant"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{activity.user.name}</span> {activity.description}
            </p>
            {activity.course && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">Cours: {activity.course}</p>
            )}
            <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="mr-1 h-3 w-3" />
              <span>{format(parseISO(activity.date), "d MMMM yyyy 'à' HH:mm", { locale: fr })}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-6">
        <Button variant="outline">Charger plus d'activités</Button>
      </div>
    </div>
  )
}

