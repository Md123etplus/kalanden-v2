import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users } from "lucide-react"

export default function PopularCourses() {
  const courses = [
    {
      id: 1,
      title: "Mathématiques fondamentales",
      instructor: "Prof. Marie Dupont",
      level: "Débutant",
      rating: 4.8,
      students: 1245,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Français avancé et littérature",
      instructor: "Dr. Jean Martin",
      level: "Intermédiaire",
      rating: 4.6,
      students: 987,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Préparation aux concours administratifs",
      instructor: "Mme. Sophie Leclerc",
      level: "Avancé",
      rating: 4.9,
      students: 2341,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Cours populaires</h2>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700"
          >
            Voir tous les cours
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-lg transition-all border-0 bg-white dark:bg-gray-900"
            >
              <div className="relative h-48 w-full">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
                    {course.level}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <Link href={`/cours/${course.id}`}>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors dark:text-white dark:hover:text-blue-400">
                    {course.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3 dark:text-gray-400">{course.instructor}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{course.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-1 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{course.students} étudiants</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  S&apos;inscrire au cours
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

