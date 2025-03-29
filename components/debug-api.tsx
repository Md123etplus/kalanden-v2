"\"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DebugAPI() {
  const [envVars, setEnvVars] = useState<{ [key: string]: string | undefined }>({})
  const [localStorageData, setLocalStorageData] = useState<{ [key: string]: string | null }>({})

  useEffect(() => {
    // Récupérer les variables d'environnement côté client
    const clientEnvVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_API_GATEWAY_URL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
    }
    setEnvVars(clientEnvVars)

    // Récupérer les données de localStorage
    if (typeof window !== "undefined") {
      const localStorageKeys = Object.keys(localStorage)
      const localStorageData: { [key: string]: string | null } = {}
      localStorageKeys.forEach((key) => {
        localStorageData[key] = localStorage.getItem(key)
      })
      setLocalStorageData(localStorageData)
    }
  }, [])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Variables d'environnement (Client)</CardTitle>
          <CardDescription>Affiche les variables d&apos;environnement accessibles côté client.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="font-medium">{key}:</span>
              <span className="truncate">{value || <Badge variant="destructive">Non définie</Badge>}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>localStorage</CardTitle>
          <CardDescription>Affiche les données stockées dans localStorage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(localStorageData).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="font-medium">{key}:</span>
              <span className="truncate">{value || <Badge variant="destructive">Non définie</Badge>}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

