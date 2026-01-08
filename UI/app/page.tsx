import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PredictionForm } from "@/components/prediction-form"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <PredictionForm />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}
