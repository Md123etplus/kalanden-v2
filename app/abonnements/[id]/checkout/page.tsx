"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { subscriptionService } from "@/lib/api-service"

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    if (!user && !loading) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour continuer.",
        duration: 5000,
      })
      router.push(`/auth/login?redirect=/abonnements/${params.id}/checkout`)
    }
  }, [user, loading, router, params.id, toast])

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
            description: "Idéal pour découvrir la plateforme",
          },
          {
            id: 2,
            name: "Premium Étudiant",
            price: 10,
            description: "Pour les apprenants sérieux",
          },
          {
            id: 3,
            name: "Pack Famille",
            price: 15,
            description: "Idéal pour les familles",
          },
          {
            id: 4,
            name: "Accès Privé",
            price: null,
            description: "Pour les institutions",
          },
        ]

        const foundSubscription = subscriptions.find((sub) => sub.id === subscriptionId)

        if (foundSubscription) {
          // Si c'est l'abonnement gratuit ou l'accès privé, rediriger
          if (foundSubscription.id === 1) {
            router.push("/dashboard")
            return
          } else if (foundSubscription.id === 4) {
            router.push("/contact?subject=Abonnement%20Accès%20Privé")
            return
          }

          setSubscription(foundSubscription)
        } else {
          router.push("/abonnements")
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'abonnement:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de l'abonnement.",
          variant: "destructive",
          duration: 5000,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [params.id, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour continuer.",
        variant: "destructive",
        duration: 5000,
      })
      return
    }

    // Validation basique
    if (paymentMethod === "card") {
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        toast({
          title: "Formulaire incomplet",
          description: "Veuillez remplir tous les champs du formulaire de paiement.",
          variant: "destructive",
          duration: 5000,
        })
        return
      }
    }

    setProcessing(true)

    try {
      // Simuler un délai de traitement
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simuler l'abonnement
      const result = await subscriptionService.subscribe(params.id, user.id, { paymentMethod, ...formData })

      if (result.error) throw new Error(result.error.message)

      setSuccess(true)

      toast({
        title: "Abonnement réussi",
        description: `Vous êtes maintenant abonné à ${subscription.name}.`,
        duration: 5000,
      })

      // Rediriger vers le tableau de bord après 3 secondes
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    } catch (error) {
      console.error("Erreur lors de l'abonnement:", error)
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
          <p>Chargement du processus de paiement...</p>
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

  if (success) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl">Paiement réussi</CardTitle>
              <CardDescription>Votre abonnement à {subscription.name} a été activé avec succès.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Vous allez être redirigé vers votre tableau de bord...</p>
              <Button
                onClick={() => router.push("/dashboard")}
                className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Accéder au tableau de bord
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <Button
          variant="ghost"
          className="mb-6 flex items-center"
          onClick={() => router.push(`/abonnements/${params.id}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux détails de l&apos;abonnement
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Finaliser votre abonnement</h1>

            <Card>
              <CardHeader>
                <CardTitle>Méthode de paiement</CardTitle>
                <CardDescription>Choisissez votre méthode de paiement préférée</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <RadioGroup
                    defaultValue="card"
                    className="mb-6"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Carte bancaire
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Numéro de carte</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nom sur la carte</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Date d&apos;expiration</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/AA"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      disabled={processing}
                    >
                      {processing ? "Traitement en cours..." : `Payer ${subscription.price}€/mois`}
                    </Button>
                    <p className="text-xs text-center text-gray-500 mt-4 dark:text-gray-400">
                      En cliquant sur &quot;Payer&quot;, vous acceptez nos conditions générales d&apos;utilisation et
                      notre politique de confidentialité.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">{subscription.name}</span>
                  <span>{subscription.price}€/mois</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{subscription.price}€/mois</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  <p>Abonnement sans engagement. Annulation possible à tout moment.</p>
                  <p className="mt-2">Premier prélèvement aujourd&apos;hui, puis tous les mois à la même date.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

