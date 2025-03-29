"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Calendar, DollarSign, FileText } from 'lucide-react'
import { useAuth } from "@/contexts/auth-context"
import { transactionService } from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"

export default function TransactionsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: "0.00",
    platformShare: "0.00",
    clientsShare: "0.00"
  })

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      try {
        const { data, error } = await transactionService.getAllTransactions()
        if (error) throw error
        
        setTransactions(data || [])
        
        // Calculer les statistiques
        if (data && data.length > 0) {
          const total = data.reduce((sum: number, transaction: any) => sum + parseFloat(transaction.amount || "0"), 0).toFixed(2)
          const platformShare = data.reduce((sum: number, transaction: any) => sum + parseFloat(transaction.montant_plateforme || "0"), 0).toFixed(2)
          const clientsShare = data.reduce((sum: number, transaction: any) => sum + parseFloat(transaction.montant_client || "0"), 0).toFixed(2)
          
          setStats({
            total,
            platformShare,
            clientsShare
          })
        }
      } catch (error) {
        console.error("Erreur lors du chargement des transactions:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les transactions. Veuillez réessayer plus tard.",
          variant: "destructive"
        })
        setTransactions([])
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [toast])

  // Filtrer les transactions en fonction de la recherche et du statut
  const filteredTransactions = transactions.filter(
    (transaction) =>
      (transaction.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.email?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || transaction.status === statusFilter),
  )

  // Fonction pour obtenir la couleur du badge en fonction du statut
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Fonction pour obtenir le texte du statut
  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "Réussi"
      case "failed":
        return "Échoué"
      case "pending":
        return "En attente"
      default:
        return status
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <DashboardSidebar userRole={user?.role ?? null} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader userRole={user?.role ?? null} />
          <div className="p-6 flex-grow bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
                  <p className="text-gray-600 dark:text-gray-400">Historique des paiements et transactions</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-2">
                  <Button variant="outline" onClick={() => router.push("/dashboard/revenue")}>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Revenus
                  </Button>
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => router.push("/dashboard/reports/financial")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Rapport financier
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total des transactions</p>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}€</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Part plateforme (30%)</p>
                      <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">{stats.platformShare}€</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Part clients (70%)</p>
                      <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">{stats.clientsShare}€</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Rechercher par ID, nom ou email..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filtrer par statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les statuts</SelectItem>
                          <SelectItem value="success">Réussi</SelectItem>
                          <SelectItem value="failed">Échoué</SelectItem>
                          <SelectItem value="pending">En attente</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Période
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center items-center py-8">
                      <p>Chargement des transactions...</p>
                    </div>
                  ) : filteredTransactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">Aucune transaction trouvée</p>
                      {searchQuery || statusFilter !== "all" ? (
                        <Button variant="outline" onClick={() => {
                          setSearchQuery("")
                          setStatusFilter("all")
                        }}>
                          Réinitialiser les filtres
                        </Button>
                      ) : null}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                              ID
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                              Utilisateur
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                              Abonnement
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                              Montant
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                              Date
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                              Méthode
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                              Statut
                            </th>
                            <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b">
                              <td className="py-3 px-4 text-sm">{transaction.id}</td>
                              <td className="py-3 px-4 text-sm">
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{transaction.user}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.email}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm">{transaction.subscription}</td>
                              <td className="py-3 px-4 text-sm font-medium">{transaction.amount}€</td>
                              <td className="py-3 px-4 text-sm">{new Date(transaction.date).toLocaleDateString()}</td>
                              <td className="py-3 px-4 text-sm">{transaction.paymentMethod}</td>
                              <td className="py-3 px-4 text-sm">
                                <Badge className={getStatusBadgeColor(transaction.status)}>
                                  {getStatusText(transaction.status)}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-sm text-right">
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Reçu
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Affichage de {filteredTransactions.length} transactions sur {transactions.length}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Précédent
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Suivant
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}