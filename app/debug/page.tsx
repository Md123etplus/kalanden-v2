import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DebugAPI from "@/components/debug-api"

export default function DebugPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Page de débogage</h1>
        <DebugAPI />
      </div>
      <Footer />
    </main>
  )
}

