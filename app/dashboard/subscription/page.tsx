"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, CheckCircle, Download, FileText } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function SubscriptionPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  // Simuler les données d'abonnement en fonction du rôle de l'utilisateur
  const subscriptionData =
    user?.role === "parent"
      ? {
          name: "Pack Famille",
          price: "15€",
          badge: "Parent-Enfant",
          badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
          nextPayment: "22 juin 2023",
          startDate: "22 mars 2023",
          status: "Actif",
          paymentMethod: "Visa se terminant par 4242",
          features: [
            "Jusqu'à 3 enfants",
            "Tableau de bord parental",
            "Suivi des progrès de l'enfant",
            "Contrôle parental",
          ],
          children: [
            { name: "Emma Dupont", status: "Actif" },
            { name: "Lucas Dupont", status: "Actif" },
            { name: "Zoé Dupont", status: "Actif" },
          ],
        }
      : {
          name: "Premium Étudiant",
          price: "10€",
          badge: "Individuel",
          badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
          nextPayment: "15 juin 2023",
          startDate: "15 mars 2023",
          status: "Actif",
          paymentMethod: "Mastercard se terminant par 5678",
          features: [
            "Accès illimité aux cours payants",
            "Évaluations et certifications",
            "Suivi de la progression",
            "Contenu téléchargeable",
          ],
        }

  const paymentHistory = [
    {
      id: "INV-001",
      date: "15 mai 2023",
      amount: user?.role === "parent" ? "15€" : "10€",
      status: "Payé",
      statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    {
      id: "INV-002",
      date: "15 avril 2023",
      amount: user?.role === "parent" ? "15€" : "10€",
      status: "Payé",
      statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    {
      id: "INV-003",
      date: "15 mars 2023",
      amount: user?.role === "parent" ? "15€" : "10€",
      status: "Payé",
      statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
  ]

  const handleCancelSubscription = () => {
    setLoading(true)
    // Simuler une requête API
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Demande reçue",
        description: "Votre demande d'annulation a été reçue. Un conseiller va vous contacter.",
        duration: 5000,
      })
    }, 1500)
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Téléchargement de la facture",
      description: `La facture ${invoiceId} est en cours de téléchargement.`,
      duration: 3000,
    })
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <DashboardSidebar userRole={user?.role} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader userRole={user?.role} />
          <div className="p-6 flex-grow bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion de l&apos;abonnement</h1>
                  <p className="text-gray-600 dark:text-gray-400">Consultez et gérez les détails de votre abonnement</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button variant="outline" onClick={() => router.push("/abonnements")}>
                    Changer d&apos;abonnement
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="billing">Facturation</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <CardTitle>Abonnement actuel</CardTitle>
                          <CardDescription>Détails de votre abonnement</CardDescription>
                        </div>
                        <Badge className={subscriptionData.badgeColor}>{subscriptionData.badge}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Formule</h3>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              {subscriptionData.name}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Prix</h3>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              {subscriptionData.price}/mois
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Statut</h3>
                            <div className="flex items-center">
                              <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {subscriptionData.status}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date de début</h3>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              {subscriptionData.startDate}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Prochain paiement</h3>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              {subscriptionData.nextPayment}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Méthode de paiement
                            </h3>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              {subscriptionData.paymentMethod}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                          Fonctionnalités incluses
                        </h3>
                        <ul className="space-y-2">
                          {subscriptionData.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {user?.role === "parent" && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Profils enfants</h3>
                          <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                              <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                  >
                                    Nom
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                  >
                                    Statut
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                {subscriptionData.children?.map((child, index) => (
                                  <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                      {child.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                      <span className="inline-flex items-center">
                                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                        {child.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => router.push("/dashboard/payment-methods")}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Méthodes de paiement
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1"
                          onClick={handleCancelSubscription}
                          disabled={loading}
                        >
                          {loading ? "Traitement..." : "Annuler l'abonnement"}
                        </Button>
                      </div>
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                        Votre abonnement sera renouvelé automatiquement le {subscriptionData.nextPayment}. Vous pouvez
                        annuler à tout moment.
                      </p>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="billing" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Historique de paiement</CardTitle>
                      <CardDescription>Vos factures et transactions récentes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Facture
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Montant
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Statut
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {paymentHistory.map((payment, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                  {payment.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {payment.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {payment.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Badge className={payment.statusColor}>{payment.status}</Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(payment.id)}>
                                    <Download className="h-4 w-4 mr-1" />
                                    Télécharger
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="documents" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Documents</CardTitle>
                      <CardDescription>Vos documents et contrats</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Contrat d&apos;abonnement</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF • 245 KB • Mis à jour le 15 mars 2023
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                Conditions générales d&apos;utilisation
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF • 320 KB • Mis à jour le 1 janvier 2023
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Politique de confidentialité</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF • 180 KB • Mis à jour le 1 janvier 2023
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

