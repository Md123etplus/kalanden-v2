import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import RegisterForm from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <main className="dark min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
        <RegisterForm />
      </div>
      <Footer />
    </main>
  )
}

