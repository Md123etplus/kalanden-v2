"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowLeft, Users, Award, BookOpen, Download, Shield, BarChart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function SubscriptionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubscription = async () => {
      setLoading(true)
      try {
        // Simuler la récupération de l'abonnement
        const subscriptionId = Number.parseInt(params.id)

        // Données statiques pour les abonnements
        const subscriptions = [
          {
            id: 1,
            name: "Accès Gratuit",
            price: 0,
            badge: "Freemium",
            badgeColor: "gray",
            description: "Idéal pour découvrir la plateforme",
            features: [
              "Accès limité aux cours gratuits",
              "Consultation des ressources publiques",
              "Zone de vérification",
            ],
            benefits: [
              {
                title: "Découvrez avant de vous engager",
                description:
                  "Explorez notre plateforme et testez quelques cours gratuits pour vous faire une idée de notre approche pédagogique.",
                icon: <BookOpen className="h-8 w-8 text-blue-500" />,
              },
              {
                title: "Ressources éducatives gratuites",
                description:
                  "Accédez à notre bibliothèque de ressources publiques pour enrichir vos connaissances sans frais.",
                icon: <Download className="h-8 w-8 text-blue-500" />,
              },
            ],
            testimonials: [
              {
                name: "Thomas D.",
                role: "Étudiant",
                content:
                  "J'ai commencé avec l'accès gratuit pour tester la plateforme avant de m'abonner. Les cours disponibles m'ont convaincu de la qualité du contenu.",
                avatar: "/placeholder.svg?height=50&width=50",
              },
            ],
            buttonText: "Commencer gratuitement",
            buttonAction: "dashboard",
          },
          {
            id: 2,
            name: "Premium Étudiant",
            price: 10,
            badge: "Individuel",
            badgeColor: "blue",
            description: "Pour les apprenants sérieux",
            features: [
              "Accès illimité aux cours payants",
              "Évaluations et certifications",
              "Suivi de la progression",
              "Contenu téléchargeable",
            ],
            benefits: [
              {
                title: "Accès complet au catalogue",
                description:
                  "Profitez de tous nos cours sans restriction, des bases aux niveaux avancés dans toutes les matières.",
                icon: <BookOpen className="h-8 w-8 text-blue-500" />,
              },
              {
                title: "Certifications reconnues",
                description:
                  "Obtenez des certifications pour valoriser vos compétences auprès des employeurs et établissements.",
                icon: <Award className="h-8 w-8 text-blue-500" />,
              },
              {
                title: "Suivi personnalisé",
                description:
                  "Suivez votre progression et recevez des recommandations adaptées à votre profil d'apprentissage.",
                icon: <BarChart className="h-8 w-8 text-blue-500" />,
              },
            ],
            testimonials: [
              {
                name: "Marie L.",
                role: "Étudiante en reconversion",
                content:
                  "L'abonnement Premium m'a permis de me former à mon rythme pour ma reconversion professionnelle. Les certifications ont été un vrai plus sur mon CV.",
                avatar: "/placeholder.svg?height=50&width=50",
              },
              {
                name: "Lucas P.",
                role: "Lycéen",
                content:
                  "Grâce à l'abonnement Premium, j'ai pu approfondir mes connaissances en mathématiques et en physique. Les cours sont clairs et les exercices très formateurs.",
                avatar: "/placeholder.svg?height=50&width=50",
              },
            ],
            buttonText: "S'abonner maintenant",
            buttonAction: "checkout",
          },
          {
            id: 3,
            name: "Pack Famille",
            price: 15,
            badge: "Parent-Enfant",
            badgeColor: "purple",
            description: "Idéal pour les familles",
            features: [
              "Jusqu'à 3 enfants",
              "Tableau de bord parental",
              "Suivi des progrès de l'enfant",
              "Contrôle parental",
            ],
            benefits: [
              {
                title: "Gestion multi-profils",
                description:
                  "Créez jusqu'à 3 profils enfants avec des parcours d'apprentissage adaptés à leur âge et niveau.",
                icon: <Users className="h-8 w-8 text-purple-500" />,
              },
              {
                title: "Contrôle parental avancé",
                description:
                  "Définissez des limites de temps d'écran et contrôlez le contenu accessible à vos enfants.",
                icon: <Shield className="h-8 w-8 text-purple-500" />,
              },
              {
                title: "Suivi des progrès détaillé",
                description:
                  "Recevez des rapports hebdomadaires sur les progrès de vos enfants et identifiez leurs points forts et axes d'amélioration.",
                icon: <BarChart className="h-8 w-8 text-purple-500" />,
              },
            ],
            testimonials: [
              {
                name: "Sophie et Marc D.",
                role: "Parents de 2 enfants",
                content:
                  "Le Pack Famille nous permet d'accompagner nos enfants dans leur scolarité. Le tableau de bord parental est très pratique pour suivre leurs progrès et les aider quand ils en ont besoin.",
                avatar: "/placeholder.svg?height=50&width=50",
              },
              {
                name: "Nathalie M.",
                role: "Mère célibataire",
                content:
                  "Avec mon emploi du temps chargé, je ne pouvais pas toujours aider mes enfants pour leurs devoirs. Kalandén est devenu leur tuteur virtuel et je peux suivre leur progression même quand je ne suis pas disponible.",
                avatar: "/placeholder.svg?height=50&width=50",
              },
            ],
            buttonText: "Choisir ce forfait",
            buttonAction: "checkout",
          },
          {
            id: 4,
            name: "Accès Privé",
            price: null,
            badge: "Entreprise",
            badgeColor: "amber",
            description: "Pour les institutions",
            features: [
              "Licences en lot",
              "Tableau de bord administrateur",
              "Contenu personnalisé",
              "Support technique dédié",
            ],
            benefits: [
              {
                title: "Solution clé en main pour les écoles",
                description:
                  "Offrez à vos élèves une plateforme d'apprentissage complète avec un contenu aligné sur les programmes officiels.",
                icon: <BookOpen className="h-8 w-8 text-amber-500" />,
              },
              {
                title: "Formation continue pour entreprises",
                description:
                  "Développez les compétences de vos employés avec des parcours de formation personnalisés selon vos besoins spécifiques.",
                icon: <Users className="h-8 w-8 text-amber-500" />,
              },
              {
                title: "Analyses et rapports détaillés",
                description:
                  "Accédez à des tableaux de bord analytiques pour mesurer l'engagement et les progrès de vos apprenants.",
                icon: <BarChart className="h-8 w-8 text-amber-500" />,
              },
              {
                title: "Support dédié et personnalisation",
                description:
                  "Bénéficiez d'un accompagnement sur mesure et d'une personnalisation de la plateforme à votre image.",
                icon: <Shield className="h-8 w-8 text-amber-500" />,
              },
            ],
            testimonials: [
              {
                name: "Lycée Jean Moulin",
                role: "Établissement scolaire",
                content:
                  "Nous utilisons Kalandén comme complément pédagogique pour nos élèves. La plateforme s'est parfaitement intégrée à notre système éducatif et les résultats sont très encourageants.",
                avatar: "/placeholder.svg?height=50&width=50",
              },
              {
                name: "TechInnovate",
                role: "Entreprise de développement",
                content:
                  "La formation continue est essentielle dans notre secteur. Avec Kalandén, nous avons pu créer des parcours personnalisés pour nos développeurs et suivre leur montée en compétences.",
                avatar: "/placeholder.svg?height=50&width=50",
              },
            ],
            buttonText: "Contacter les ventes",
            buttonAction: "contact",
          },
        ]

        const foundSubscription = subscriptions.find((sub) => sub.id === subscriptionId)

        if (foundSubscription) {
          setSubscription(foundSubscription)
        } else {
          router.push("/abonnements")
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'abonnement:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [params.id, router])

  const handleButtonClick = () => {
    if (!subscription) return

    switch (subscription.buttonAction) {
      case "dashboard":
        router.push("/dashboard")
        break
      case "checkout":
        router.push(`/abonnements/${subscription.id}/checkout`)
        break
      case "contact":
        router.push("/contact?subject=Abonnement%20Accès%20Privé")
        break
      default:
        router.push("/abonnements")
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
          <p>Chargement de l&apos;abonnement...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!subscription) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
          <p>Abonnement non trouvé</p>
        </div>
        <Footer />
      </main>
    )
  }

  const getBadgeColor = (color: string) => {
    switch (color) {
      case "gray":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      case "blue":
        return "bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "purple":
        return "bg-purple-50 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "amber":
        return "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <Button variant="ghost" className="mb-6 flex items-center" onClick={() => router.push("/abonnements")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux abonnements
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{subscription.name}</h1>
            <div className="flex items-center mb-6">
              <Badge variant="outline" className={getBadgeColor(subscription.badgeColor)}>
                {subscription.badge}
              </Badge>
              <span className="ml-4 text-lg font-semibold">
                {subscription.price !== null ? `${subscription.price}€/mois` : "Tarification sur mesure"}
              </span>
            </div>

            <p className="text-lg text-gray-600 mb-8 dark:text-gray-300">{subscription.description}</p>

            <Tabs defaultValue="features" className="w-full mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
                <TabsTrigger value="benefits">Avantages</TabsTrigger>
                <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fonctionnalités incluses</CardTitle>
                    <CardDescription>
                      Tout ce que vous obtenez avec l&apos;abonnement {subscription.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {subscription.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="benefits" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pourquoi choisir cet abonnement</CardTitle>
                    <CardDescription>
                      Les avantages spécifiques de l&apos;abonnement {subscription.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {subscription.benefits.map((benefit: any, index: number) => (
                        <div key={index} className="flex flex-col items-start">
                          <div className="mb-3">{benefit.icon}</div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{benefit.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="testimonials" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ce qu&apos;en disent nos utilisateurs</CardTitle>
                    <CardDescription>
                      Témoignages d&apos;utilisateurs de l&apos;abonnement {subscription.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {subscription.testimonials.map((testimonial: any, index: number) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                          <div className="flex items-center mb-4">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                              <Image
                                src={testimonial.avatar || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 italic dark:text-gray-300">"{testimonial.content}"</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Résumé de l&apos;abonnement</CardTitle>
                <CardDescription>
                  {subscription.name} - {subscription.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {subscription.price !== null ? `${subscription.price}€` : "Sur mesure"}
                  </span>
                  {subscription.price !== null && <span className="text-gray-500 dark:text-gray-400">/mois</span>}
                </div>

                <ul className="space-y-3 mb-6">
                  {subscription.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={handleButtonClick}
                >
                  {subscription.buttonText}
                </Button>

                {subscription.id !== 1 && (
                  <p className="text-xs text-center text-gray-500 mt-4 dark:text-gray-400">
                    Abonnement sans engagement. Annulation possible à tout moment.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

