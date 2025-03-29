"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function SetupGuide() {
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [supabaseKey, setSupabaseKey] = useState("")
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    if (!supabaseUrl || !supabaseKey) {
      setError("Veuillez remplir tous les champs")
      return
    }

    // En production, ces valeurs seraient enregistrées dans les variables d'environnement
    // Pour le développement, nous les stockons dans localStorage
    try {
      localStorage.setItem("NEXT_PUBLIC_SUPABASE_URL", supabaseUrl)
      localStorage.setItem("NEXT_PUBLIC_SUPABASE_ANON_KEY", supabaseKey)
      setSaved(true)
      setError(null)

      // Recharger la page pour appliquer les changements
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (err) {
      setError("Erreur lors de l'enregistrement des paramètres")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Configuration de Supabase</CardTitle>
        <CardDescription>
          Entrez vos informations d&apos;identification Supabase pour activer les fonctionnalités dynamiques
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {saved && (
          <Alert className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle>Configuration enregistrée</AlertTitle>
            <AlertDescription>Rechargement de la page...</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="supabase-url">URL Supabase</Label>
          <Input
            id="supabase-url"
            placeholder="https://your-project.supabase.co"
            value={supabaseUrl}
            onChange={(e) => setSupabaseUrl(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supabase-key">Clé anonyme Supabase</Label>
          <Input
            id="supabase-key"
            placeholder="your-anon-key"
            value={supabaseKey}
            onChange={(e) => setSupabaseKey(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full" disabled={saved}>
          {saved ? "Enregistré" : "Enregistrer la configuration"}
        </Button>
      </CardFooter>
    </Card>
  )
}

