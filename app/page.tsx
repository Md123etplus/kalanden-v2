"use client"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import SubscriptionCards from "@/components/subscription-cards"
import PopularCourses from "@/components/popular-courses"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <main>
      <Navbar />
      <div className="bg-amber-100 dark:bg-amber-900/30 py-2 px-4 text-center">
        <p className="text-amber-800 dark:text-amber-300 inline-flex items-center">
          🚀 Accédez directement au tableau de bord de démonstration avec les identifiants admin/admin
          <Button
            variant="link"
            className="ml-2 text-amber-800 dark:text-amber-300 underline"
            onClick={() => router.push("/demo-login")}
          >
            Essayer la démo
          </Button>
        </p>
      </div>
      <HeroSection />
      <SubscriptionCards />
      <PopularCourses />
      <Footer />
    </main>
  )
}

