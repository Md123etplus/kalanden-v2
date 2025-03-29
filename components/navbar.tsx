"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, Search, ChevronDown, User, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/auth-context"
import { useSearch } from "@/hooks/use-search"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Navbar() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const { searchQuery, setSearchQuery, handleSearch } = useSearch()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDevelopment, setIsDevelopment] = useState(false)

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Vérifier si nous sommes en mode développement
  useEffect(() => {
    const hasEnvVars =
      typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    setIsDevelopment(!hasEnvVars)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <>
      {isDevelopment && (
        <Alert className="rounded-none bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800">
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription>
            Mode développement actif - Les fonctionnalités dynamiques utilisent des données simulées
          </AlertDescription>
        </Alert>
      )}

      <nav
        className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-6 sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-8">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Kalandén Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Kalandén</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    Explorer
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/cours" className="w-full">
                      Tous les cours
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/cours/debutant" className="w-full">
                      Niveau débutant
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/cours/intermediaire" className="w-full">
                      Niveau intermédiaire
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/cours/avance" className="w-full">
                      Niveau avancé
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/a-propos"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                À propos
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Barre de recherche */}
          <form onSubmit={handleSearch} className="hidden md:flex relative mx-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Que voulez-vous étudier?"
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Desktop CTA Buttons or User Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      <span>Mon compte</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/dashboard" className="w-full">
                        Tableau de bord
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile" className="w-full">
                        Mon profil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/mes-cours" className="w-full">
                        Mes cours
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>Se déconnecter</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  {!user && (
                    <Button
                      variant="outline"
                      className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-gray-800 mr-2"
                      onClick={() => router.push("/demo-login")}
                    >
                      Démo
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
                    onClick={() => router.push("/auth/login")}
                  >
                    Se connecter
                  </Button>
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => router.push("/auth/register")}
                  >
                    S&apos;inscrire
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Barre de recherche mobile */}
                  <form onSubmit={handleSearch} className="relative w-full mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Que voulez-vous étudier?"
                      className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>

                  <div className="py-2">
                    <h3 className="font-medium text-sm text-gray-500 mb-2 dark:text-gray-400">Explorer</h3>
                    <div className="space-y-1">
                      <Link
                        href="/cours"
                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Tous les cours
                      </Link>
                      <Link
                        href="/cours/debutant"
                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Niveau débutant
                      </Link>
                      <Link
                        href="/cours/intermediaire"
                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Niveau intermédiaire
                      </Link>
                      <Link
                        href="/cours/avance"
                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Niveau avancé
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/a-propos"
                    className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    À propos
                  </Link>
                  <Link
                    href="/blog"
                    className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Blog
                  </Link>

                  <div className="flex items-center px-2 py-2">
                    <ThemeToggle />
                  </div>

                  <div className="pt-4 flex flex-col space-y-2">
                    {user ? (
                      <>
                        <Link
                          href="/dashboard"
                          className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          Tableau de bord
                        </Link>
                        <Link
                          href="/profile"
                          className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          Mon profil
                        </Link>
                        <Link
                          href="/mes-cours"
                          className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          Mes cours
                        </Link>
                        <Button
                          variant="outline"
                          className="mt-2 border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-gray-800"
                          onClick={handleSignOut}
                        >
                          Se déconnecter
                        </Button>
                      </>
                    ) : (
                      <>
                        {!user && (
                          <Button
                            variant="outline"
                            className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-gray-800 mb-2"
                            onClick={() => router.push("/demo-login")}
                          >
                            Démo
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
                          onClick={() => router.push("/auth/login")}
                        >
                          Se connecter
                        </Button>
                        <Button
                          className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                          onClick={() => router.push("/auth/register")}
                        >
                          S&apos;inscrire
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}

