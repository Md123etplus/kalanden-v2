import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <main className="dark min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
            <CardTitle className="text-2xl">Vérifiez votre email</CardTitle>
            <CardDescription>Nous avons envoyé un lien de vérification à votre adresse email</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Veuillez vérifier votre boîte de réception et cliquer sur le lien de vérification pour activer votre
                compte.
              </p>
              <p className="mt-2">
                Si vous ne recevez pas l'email dans les prochaines minutes, vérifiez votre dossier spam.
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <Button variant="outline" asChild>
                <Link href="/auth/login">Retour à la connexion</Link>
              </Button>
              <Button variant="link" className="text-sm">
                Renvoyer l'email de vérification
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  )
}

