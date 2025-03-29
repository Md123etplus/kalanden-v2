"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import Navbar from "@/components/navbar"

// Données statiques pour les événements
const events = [
  {
    id: 1,
    title: "Cours de mathématiques",
    date: "2025-03-25T10:00:00",
    duration: 60,
    type: "course",
  },
  {
    id: 2,
    title: "Examen de français",
    date: "2025-03-27T14:00:00",
    duration: 120,
    type: "exam",
  },
  {
    id: 3,
    title: "Réunion des enseignants",
    date: "2025-03-26T09:00:00",
    duration: 90,
    type: "meeting",
  },
  {
    id: 4,
    title: "Atelier de sciences",
    date: "2025-03-29T13:30:00",
    duration: 120,
    type: "workshop",
  },
  {
    id: 5,
    title: "Conférence éducative",
    date: "2025-03-30T15:00:00",
    duration: 180,
    type: "conference",
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const { user } = useAuth()

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  // Filtrer les événements pour la date sélectionnée
  const selectedDateEvents = selectedDate
    ? events.filter((event) => {
        const eventDate = parseISO(event.date)
        return isSameDay(eventDate, selectedDate)
      })
    : []

  // Obtenir les événements pour un jour spécifique
  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      const eventDate = parseISO(event.date)
      return isSameDay(eventDate, day)
    })
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Calendrier</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="font-medium">{format(currentDate, "MMMM yyyy", { locale: fr })}</div>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>Gérez vos cours, examens et réunions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                    <div key={day} className="text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({
                    length: new Date(monthStart).getDay() === 0 ? 6 : new Date(monthStart).getDay() - 1,
                  }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-14 rounded-md"></div>
                  ))}
                  {monthDays.map((day) => {
                    const dayEvents = getEventsForDay(day)
                    return (
                      <Button
                        key={day.toString()}
                        variant="ghost"
                        className={cn(
                          "h-14 flex flex-col items-center justify-start p-1 hover:bg-gray-100 dark:hover:bg-gray-800",
                          !isSameMonth(day, currentDate) && "text-gray-400",
                          isSameDay(day, selectedDate as Date) &&
                            "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                          isToday(day) && "border border-blue-500",
                        )}
                        onClick={() => setSelectedDate(day)}
                      >
                        <span className="text-sm">{format(day, "d")}</span>
                        {dayEvents.length > 0 && (
                          <div className="flex gap-0.5 mt-1">
                            {dayEvents.length <= 2
                              ? dayEvents.map((event) => (
                                  <div
                                    key={event.id}
                                    className={cn(
                                      "w-1.5 h-1.5 rounded-full",
                                      event.type === "course" && "bg-green-500",
                                      event.type === "exam" && "bg-red-500",
                                      event.type === "meeting" && "bg-blue-500",
                                      event.type === "workshop" && "bg-purple-500",
                                      event.type === "conference" && "bg-yellow-500",
                                    )}
                                  />
                                ))
                              : [
                                  <div key="indicator" className="text-xs font-medium">
                                    {dayEvents.length}
                                  </div>,
                                ]}
                          </div>
                        )}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: fr }) : "Sélectionnez une date"}
                </CardTitle>
                <CardDescription>
                  {selectedDateEvents.length
                    ? `${selectedDateEvents.length} événement${selectedDateEvents.length > 1 ? "s" : ""}`
                    : "Aucun événement"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <div
                          className={cn(
                            "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full",
                            event.type === "course" &&
                              "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                            event.type === "exam" && "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                            event.type === "meeting" &&
                              "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                            event.type === "workshop" &&
                              "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                            event.type === "conference" &&
                              "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
                          )}
                        >
                          <CalendarIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{event.title}</h4>
                            <Badge
                              variant="outline"
                              className={cn(
                                event.type === "course" && "border-green-500 text-green-600 dark:text-green-400",
                                event.type === "exam" && "border-red-500 text-red-600 dark:text-red-400",
                                event.type === "meeting" && "border-blue-500 text-blue-600 dark:text-blue-400",
                                event.type === "workshop" && "border-purple-500 text-purple-600 dark:text-purple-400",
                                event.type === "conference" && "border-yellow-500 text-yellow-600 dark:text-yellow-400",
                              )}
                            >
                              {event.type === "course" && "Cours"}
                              {event.type === "exam" && "Examen"}
                              {event.type === "meeting" && "Réunion"}
                              {event.type === "workshop" && "Atelier"}
                              {event.type === "conference" && "Conférence"}
                            </Badge>
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>
                              {format(parseISO(event.date), "HH:mm", { locale: fr })} ({event.duration} min)
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CalendarIcon className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                    <h3 className="mt-4 text-lg font-medium">Aucun événement</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Il n'y a pas d'événements prévus pour cette date.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

