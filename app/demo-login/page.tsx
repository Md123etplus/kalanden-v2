"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Users, School } from "lucide-react"

export default function DemoLoginPage() {
  const [userType, setUserType] = useState("admin")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { signInWithSimulatedCredentials } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Utiliser le type d'utilisateur comme nom d'utilisateur et mot de passe
      const { error } = await signInWithSimulatedCredentials(userType, userType)

      if (error) throw error

      toast({
        title: "Connexion réussie",
        description: `Vous êtes maintenant connecté en tant que ${
          userType === "admin" ? "administrateur" : userType === "parent" ? "parent" : "étudiant"
        }.`,
        duration: 3000,
      })

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la connexion")
      toast({
        title: "Erreur de connexion",
        description: err.message || "Une erreur est survenue lors de la connexion",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Connexion Démo</CardTitle>
            <CardDescription>Choisissez un type d'utilisateur pour la démonstration</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Tabs defaultValue="admin" onValueChange={setUserType} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="admin" className="flex items-center justify-center">
                    <School className="h-4 w-4 mr-2" />
                    Admin
                  </TabsTrigger>
                  <TabsTrigger value="parent" className="flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2" />
                    Parent
                  </TabsTrigger>
                  <TabsTrigger value="student" className="flex items-center justify-center">
                    <User className="h-4 w-4 mr-2" />
                    Étudiant
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="admin" className="mt-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <h3 className="font-medium mb-2">Compte Administrateur</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Accédez au tableau de bord administrateur avec toutes les fonctionnalités de gestion des cours,
                      des élèves et des statistiques.
                    </p>
                    <div className="text-sm font-medium">Identifiants: admin / admin</div>
                  </div>
                </TabsContent>

                <TabsContent value="parent" className="mt-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                    <h3 className="font-medium mb-2">Compte Parent</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Suivez les progrès de vos enfants, consultez leurs activités et gérez leurs paramètres.
                    </p>
                    <div className="text-sm font-medium">Identifiants: parent / parent</div>
                  </div>
                </TabsContent>

                <TabsContent value="student" className="mt-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <h3 className="font-medium mb-2">Compte Étudiant</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Accédez à vos cours, suivez votre progression et consultez vos certifications.
                    </p>
                    <div className="text-sm font-medium">Identifiants: student / student</div>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                Cette page est destinée à la démonstration uniquement. Les identifiants sont automatiquement définis en
                fonction du type d'utilisateur sélectionné.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </main>
  )
}

