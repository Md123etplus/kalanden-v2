"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      setLoading(false)
      return
    }

    try {
      console.log("Tentative d'inscription avec:", { email, name })

      const result = await signUp(email, password, {
        full_name: name,
        avatar_url: null,
        role: "student",
      })
      
      console.log("Résultat de signUp:", result)
      
      if (result.error) throw result.error
      
      // En mode développement, simuler une inscription réussie
      if (process.env.NODE_ENV === "development") {
        console.log("Mode développement: Simulation d'inscription réussie")

        // Stocker les données utilisateur dans localStorage pour le mode démo
        localStorage.setItem(
          "kalanden_registered_user",
          JSON.stringify({
            email,
            full_name: name,
            role: "student",
          }),
        )
      }

      toast({
        title: "Inscription réussie",
        description: "Veuillez vérifier votre email pour confirmer votre compte.",
        duration: 5000,
      })

      router.push("/auth/verify-email")
    } catch (err: any) {
      console.error("Erreur d'inscription:", err)
      setError(err.message || "Une erreur est survenue lors de l'inscription")
      toast({
        title: "Erreur d'inscription",
        description: err.message || "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Inscription</CardTitle>
        <CardDescription>
          Créez votre compte Kalandén pour commencer votre parcours d&apos;apprentissage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-gray-300 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-gray-300 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-gray-300 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
            />
            <p className="text-xs text-muted-foreground">Le mot de passe doit contenir au moins 8 caractères</p>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Vous avez déjà un compte?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline dark:text-blue-400">
            Se connecter
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">Ou continuer avec</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            Google
          </Button>
          <Button variant="outline" className="w-full">
            Facebook
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

