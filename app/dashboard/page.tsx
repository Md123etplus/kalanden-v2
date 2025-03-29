"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"
import { ParentDashboard } from "@/components/dashboard/parent-dashboard"
import { EnterpriseDashboard } from "@/components/dashboard/enterprise-dashboard"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { toast } = useToast()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    if (!loading && !user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour accéder à votre tableau de bord.",
        duration: 5000,
      })
      router.push("/auth/login?redirect=/dashboard")
      return
    }

    // Déterminer le rôle de l'utilisateur
    if (user) {
      // Simuler la récupération du rôle de l'utilisateur
      const role = user.role || "student"
      setUserRole(role)
    }
  }, [user, loading, router, toast])

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
          <p>Chargement du tableau de bord...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <DashboardSidebar userRole={userRole} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader userRole={userRole} />
          <div className="p-6 flex-grow bg-gray-50 dark:bg-gray-900">
            {userRole === "student" && <StudentDashboard />}
            {userRole === "parent" && <ParentDashboard />}
            {userRole === "admin" || userRole === "teacher" ? <EnterpriseDashboard /> : null}
          </div>
        </div>
      </div>
    </main>
  )
}

