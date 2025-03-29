"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"
import type { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  signInWithSimulatedCredentials: (username: string, password: string, userType?: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Mettre à jour la fonction signInWithSimulatedCredentials pour qu'elle fonctionne avec tous les types d'utilisateurs
  const signInWithSimulatedCredentials = async (username: string, password: string, userType?: string) => {
    try {
      // Si userType est fourni, l'utiliser, sinon utiliser username
      const type = userType || username

      // Vérifier si les identifiants correspondent au type d'utilisateur
      if (
        (username === type && password === type) ||
        (username === "admin" && password === "admin" && type === "admin") ||
        (username === "parent" && password === "parent" && type === "parent") ||
        (username === "student" && password === "student" && type === "student")
      ) {
        // Créer un utilisateur simulé en fonction du type
        let simulatedUser

        switch (type) {
          case "admin":
            simulatedUser = {
              id: "admin-user-id",
              email: "admin@kalanden.com",
              full_name: "Administrateur",
              role: "admin",
              avatar_url: null,
            }
            break
          case "parent":
            simulatedUser = {
              id: "parent-user-id",
              email: "parent@kalanden.com",
              full_name: "Parent Dupont",
              role: "parent",
              avatar_url: null,
            }
            break
          case "student":
            simulatedUser = {
              id: "student-user-id",
              email: "student@kalanden.com",
              full_name: "Étudiant Martin",
              role: "student",
              avatar_url: null,
            }
            break
          default:
            throw new Error("Type d'utilisateur non reconnu")
        }

        // Stocker l'utilisateur simulé dans le localStorage pour persister la session
        localStorage.setItem("kalanden_simulated_user", JSON.stringify(simulatedUser))

        // Mettre à jour l'état de l'utilisateur
        setUser(simulatedUser as any)

        return { error: null }
      }

      return {
        error: {
          message:
            "Identifiants incorrects. Utilisez le même nom d'utilisateur et mot de passe correspondant au type d'utilisateur.",
        },
      }
    } catch (error) {
      console.error("Erreur lors de la connexion simulée:", error)
      return { error: { message: "Erreur de connexion simulée." } }
    }
  }

  useEffect(() => {
    // Vérifier l'état de l'authentification au chargement
    try {
      // Vérifier d'abord s'il y a un utilisateur simulé
      const simulatedUserJson = localStorage.getItem("kalanden_simulated_user")
      if (simulatedUserJson) {
        const simulatedUser = JSON.parse(simulatedUserJson)
        setUser(simulatedUser)
        setLoading(false)
        return
      }

      // Sinon, vérifier l'authentification Supabase
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation de l'authentification:", error)
      setLoading(false)
      return () => {}
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error)
      return { error: { message: "Erreur de connexion. Vérifiez votre configuration." } }
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: userData },
      })
      return { error }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      return { error: { message: "Erreur d'inscription. Vérifiez votre configuration." } }
    }
  }

  const signOut = async () => {
    try {
      // Vérifier s'il y a un utilisateur simulé
      const simulatedUserJson = localStorage.getItem("kalanden_simulated_user")
      if (simulatedUserJson) {
        // Supprimer l'utilisateur simulé du localStorage
        localStorage.removeItem("kalanden_simulated_user")
        setUser(null)
        return { error: null }
      }

      // Sinon, déconnexion Supabase
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      return { error: { message: "Erreur de déconnexion. Vérifiez votre configuration." } }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithSimulatedCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}