import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <main className="dark min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
        <LoginForm />
      </div>
      <Footer />
    </main>
  )
}

