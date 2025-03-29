"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase-client"

export default function AuthDebugPage() {
  const { user, loading } = useAuth()
  const [supabaseStatus, setSupabaseStatus] = useState<"checking" | "connected" | "error">("checking")
  const [supabaseError, setSupabaseError] = useState<string | null>(null)
  const [envVariables, setEnvVariables] = useState<Record<string, string>>({})

  useEffect(() => {
    // Vérifier la connexion à Supabase
    async function checkSupabaseConnection() {
      try {
        const { data, error } = await supabase.from("categories").select("count").limit(1)

        if (error) {
          setSupabaseStatus("error")
          setSupabaseError(error.message)
        } else {
          setSupabaseStatus("connected")
        }
      } catch (err: any) {
        setSupabaseStatus("error")
        setSupabaseError(err.message || "Erreur inconnue")
      }
    }

    // Récupérer les variables d'environnement publiques
    const publicEnvVars: Record<string, string> = {}
    Object.keys(process.env).forEach((key) => {
      if (key.startsWith("NEXT_PUBLIC_")) {
        publicEnvVars[key] = process.env[key] || ""
      }
    })
    setEnvVariables(publicEnvVars)

    checkSupabaseConnection()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Débogage de l'authentification</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>État de l'authentification</CardTitle>
            <CardDescription>Informations sur l'utilisateur connecté</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Chargement...</p>
            ) : user ? (
              <div>
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Rôle:</strong> {(user as any).role || "Non défini"}
                </p>
                <p>
                  <strong>Nom:</strong> {(user as any).full_name || "Non défini"}
                </p>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 overflow-auto text-xs">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            ) : (
              <Alert>
                <AlertTitle>Non connecté</AlertTitle>
                <AlertDescription>Aucun utilisateur n'est actuellement connecté.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>État de Supabase</CardTitle>
            <CardDescription>Vérification de la connexion à Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            {supabaseStatus === "checking" ? (
              <p>Vérification de la connexion...</p>
            ) : supabaseStatus === "connected" ? (
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <AlertTitle>Connecté</AlertTitle>
                <AlertDescription>La connexion à Supabase fonctionne correctement.</AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertTitle>Erreur de connexion</AlertTitle>
                <AlertDescription>{supabaseError || "Impossible de se connecter à Supabase."}</AlertDescription>
              </Alert>
            )}

            <div className="mt-4">
              <h3 className="font-medium mb-2">Variables d'environnement</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto text-xs">
                {JSON.stringify(envVariables, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Actions de débogage</CardTitle>
            <CardDescription>Outils pour tester l'authentification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={async () => {
                  const { data, error } = await supabase.auth.getSession()
                  alert(JSON.stringify({ data, error }, null, 2))
                }}
              >
                Vérifier la session
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("kalanden_simulated_user")
                  window.location.reload()
                }}
              >
                Effacer l'utilisateur simulé
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  localStorage.clear()
                  window.location.reload()
                }}
              >
                Effacer tout le localStorage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

