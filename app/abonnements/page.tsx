import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SubscriptionCards from "@/components/subscription-cards"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubscriptionComparison } from "@/components/subscription-comparison"
import { SubscriptionFAQ } from "@/components/subscription-faq"

export default function AbonnementsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4 dark:text-white">
            Choisissez l&apos;abonnement qui vous convient
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Des formules adaptées à tous les besoins d&apos;apprentissage, avec un accès à des contenus de qualité et un
            suivi personnalisé.
          </p>
        </div>

        <Tabs defaultValue="cards" className="w-full mb-16">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="cards">Formules</TabsTrigger>
            <TabsTrigger value="comparison">Comparaison</TabsTrigger>
          </TabsList>
          <TabsContent value="cards" className="mt-8">
            <SubscriptionCards showDetailedButtons={true} />
          </TabsContent>
          <TabsContent value="comparison" className="mt-8">
            <SubscriptionComparison />
          </TabsContent>
        </Tabs>

        <SubscriptionFAQ />
      </div>
      <Footer />
    </main>
  )
}

