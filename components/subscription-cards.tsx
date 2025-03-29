"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SubscriptionCardsProps {
  showDetailedButtons?: boolean
}

export default function SubscriptionCards({ showDetailedButtons = false }: SubscriptionCardsProps) {
  const router = useRouter()

  const handleSubscribe = (id: number) => {
    router.push(`/abonnements/${id}/checkout`)
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {!showDetailedButtons && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
              Choisissez votre formule d&apos;apprentissage
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
              Des options flexibles pour tous les besoins et tous les budgets
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Accès Gratuit */}
          <Card className="border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md dark:border-gray-700 dark:hover:border-blue-400">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold flex items-center justify-between">
                Accès Gratuit
                <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  Freemium
                </Badge>
              </CardTitle>
              <CardDescription>Idéal pour découvrir la plateforme</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">0€</span>
                <span className="text-gray-500 dark:text-gray-400">/mois</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Accès limité aux cours gratuits</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Consultation des ressources publiques</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Zone de vérification</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {showDetailedButtons ? (
                <div className="w-full space-y-2">
                  <Button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => router.push("/dashboard")}
                  >
                    Commencer gratuitement
                  </Button>
                  <Link
                    href="/abonnements/1"
                    className="block text-center text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    En savoir plus
                  </Link>
                </div>
              ) : (
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={() => router.push("/dashboard")}
                >
                  Commencer gratuitement
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Abonnement Individuel */}
          <Card className="border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md relative dark:border-gray-700 dark:hover:border-blue-400">
            <div className="absolute top-0 right-0 left-0 bg-blue-600 text-white text-center text-sm py-1 dark:bg-blue-500">
              Le plus populaire
            </div>
            <CardHeader className="pb-4 pt-8">
              <CardTitle className="text-xl font-bold flex items-center justify-between">
                Premium Étudiant
                <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Individuel
                </Badge>
              </CardTitle>
              <CardDescription>Pour les apprenants sérieux</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">10€</span>
                <span className="text-gray-500 dark:text-gray-400">/mois</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Accès illimité aux cours payants</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Évaluations et certifications</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Suivi de la progression</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Contenu téléchargeable</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {showDetailedButtons ? (
                <div className="w-full space-y-2">
                  <Button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => handleSubscribe(2)}
                  >
                    S&apos;abonner maintenant
                  </Button>
                  <Link
                    href="/abonnements/2"
                    className="block text-center text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    En savoir plus
                  </Link>
                </div>
              ) : (
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={() => handleSubscribe(2)}
                >
                  S&apos;abonner maintenant
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Pack Parent-Enfant */}
          <Card className="border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md dark:border-gray-700 dark:hover:border-blue-400">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold flex items-center justify-between">
                Pack Famille
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  Parent-Enfant
                </Badge>
              </CardTitle>
              <CardDescription>Idéal pour les familles</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">15€</span>
                <span className="text-gray-500 dark:text-gray-400">/mois</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Jusqu&apos;à 3 enfants</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Tableau de bord parental</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Suivi des progrès de l&apos;enfant</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Contrôle parental</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {showDetailedButtons ? (
                <div className="w-full space-y-2">
                  <Button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => handleSubscribe(3)}
                  >
                    Choisir ce forfait
                  </Button>
                  <Link
                    href="/abonnements/3"
                    className="block text-center text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    En savoir plus
                  </Link>
                </div>
              ) : (
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={() => handleSubscribe(3)}
                >
                  Choisir ce forfait
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Abonnement École / Entreprise */}
          <Card className="border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md dark:border-gray-700 dark:hover:border-blue-400">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold flex items-center justify-between">
                Accès Privé
                <Badge variant="outline" className="bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                  Entreprise
                </Badge>
              </CardTitle>
              <CardDescription>Pour les institutions</CardDescription>
              <div className="mt-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Tarification sur mesure</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Licences en lot</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Tableau de bord administrateur</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Contenu personnalisé</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Support technique dédié</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {showDetailedButtons ? (
                <div className="w-full space-y-2">
                  <Button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => router.push("/abonnements/4")}
                  >
                    Contacter les ventes
                  </Button>
                  <Link
                    href="/abonnements/4"
                    className="block text-center text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    En savoir plus
                  </Link>
                </div>
              ) : (
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={() => router.push("/abonnements/4")}
                >
                  Contacter les ventes
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

