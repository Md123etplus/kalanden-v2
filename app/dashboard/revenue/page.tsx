"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, FileText, PieChart, ArrowUpRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function RevenuePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [period, setPeriod] = useState("month")

  // Données statiques pour les revenus
  const revenueData = {
    total: "3,340€",
    platformShare: "1,002€", // 30%
    clientsShare: "2,338€", // 70%
    growth: "+12.5%",
    subscriptions: {
      "Premium Étudiant": {
        count: 78,
        price: "10€",
        total: "780€",
        platformShare: "234€", // 30%
        clientsShare: "546€", // 70%
      },
      "Pack Famille": {
        count: 36,
        price: "15€",
        total: "540€",
        platformShare: "162€", // 30%
        clientsShare: "378€", // 70%
      },
      "Accès Privé": {
        count: 5,
        price: "Sur mesure",
        total: "2,020€",
        platformShare: "606€", // 30%
        clientsShare: "1,414€", // 70%
      },
    },
    monthlyTrend: [
      { month: "Jan", total: "2,800€", platform: "840€", clients: "1,960€" },
      { month: "Fév", total: "2,950€", platform: "885€", clients: "2,065€" },
      { month: "Mar", total: "3,100€", platform: "930€", clients: "2,170€" },
      { month: "Avr", total: "3,200€", platform: "960€", clients: "2,240€" },
      { month: "Mai", total: "3,340€", platform: "1,002€", clients: "2,338€" },
    ],
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <DashboardSidebar userRole={user?.role} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader userRole={user?.role} />
          <div className="p-6 flex-grow bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Revenus</h1>
                  <p className="text-gray-600 dark:text-gray-400">Analyse des revenus et répartition</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-2">
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Ce mois</SelectItem>
                      <SelectItem value="quarter">Ce trimestre</SelectItem>
                      <SelectItem value="year">Cette année</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => router.push("/dashboard/reports/financial")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </div>

              {/* Résumé des revenus */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenu total</p>
                      <div className="flex items-center mt-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{revenueData.total}</h3>
                        <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          {revenueData.growth}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Part plateforme (30%)</p>
                      <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">
                        {revenueData.platformShare}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Part clients (70%)</p>
                      <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">
                        {revenueData.clientsShare}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                  <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
                  <TabsTrigger value="trends">Tendances</TabsTrigger>
                </TabsList>

                {/* Vue d'ensemble */}
                <TabsContent value="overview" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Répartition des revenus</CardTitle>
                      <CardDescription>Répartition des revenus par type d'abonnement</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Graphique de répartition
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Visualisation de la répartition des revenus par type d'abonnement.
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="border rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Premium Étudiant</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">780€</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">23.4% du total</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pack Famille</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">540€</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">16.2% du total</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Accès Privé</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">2,020€</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">60.4% du total</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Abonnements */}
                <TabsContent value="subscriptions" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Détails des abonnements</CardTitle>
                      <CardDescription>Revenus par type d'abonnement avec répartition</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {Object.entries(revenueData.subscriptions).map(([name, data]) => (
                          <div key={name} className="border rounded-lg p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {data.count} abonnés • {data.price}/mois
                                </p>
                              </div>
                              <div className="mt-2 md:mt-0">
                                <p className="text-xl font-bold text-gray-900 dark:text-white">{data.total}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                  Part plateforme (30%)
                                </p>
                                <p className="text-lg font-bold text-blue-700 dark:text-blue-300 mt-1">
                                  {data.platformShare}
                                </p>
                              </div>
                              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                  Part clients (70%)
                                </p>
                                <p className="text-lg font-bold text-green-700 dark:text-green-300 mt-1">
                                  {data.clientsShare}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tendances */}
                <TabsContent value="trends" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Évolution des revenus</CardTitle>
                      <CardDescription>Tendance des revenus sur les 5 derniers mois</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-center">
                          <BarChart className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Graphique d'évolution
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Visualisation de l'évolution des revenus au fil du temps.
                          </p>
                        </div>
                      </div>
                      <div className="overflow-x-auto mt-6">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                                Mois
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                                Total
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                                Part plateforme (30%)
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                                Part clients (70%)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {revenueData.monthlyTrend.map((month) => (
                              <tr key={month.month} className="border-b">
                                <td className="py-3 px-4 text-sm font-medium">{month.month}</td>
                                <td className="py-3 px-4 text-sm">{month.total}</td>
                                <td className="py-3 px-4 text-sm">{month.platform}</td>
                                <td className="py-3 px-4 text-sm">{month.clients}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

