import { Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold text-foreground">CardioPredict</span>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg">Last updated: January 2026</p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using CardioPredict, you accept and agree to be bound by these Terms of Service. If you
              do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
            <p>
              CardioPredict is an educational machine learning project that provides cardiovascular disease risk
              predictions based on user-provided health data. The service uses trained ML models including Random
              Forest, Logistic Regression, and Decision Tree algorithms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. Educational Purpose Only</h2>
            <p>
              This service is provided for educational and informational purposes only. CardioPredict is a machine
              learning demonstration project and is NOT:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A medical device or diagnostic tool</li>
              <li>A substitute for professional medical advice</li>
              <li>Intended to diagnose, treat, cure, or prevent any disease</li>
              <li>Approved by any medical or regulatory authority</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. User Responsibilities</h2>
            <p>By using this service, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information to the best of your knowledge</li>
              <li>
                Understand that predictions are based on statistical models and may not reflect your actual health
                status
              </li>
              <li>Consult qualified healthcare professionals for medical advice</li>
              <li>Not rely solely on this tool for health decisions</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Limitation of Liability</h2>
            <p>
              CardioPredict and its creators shall not be liable for any direct, indirect, incidental, special, or
              consequential damages resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use or inability to use the service</li>
              <li>Any predictions or results provided by the service</li>
              <li>Any health decisions made based on the service</li>
              <li>Unauthorized access to or alteration of your data</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. No Warranty</h2>
            <p>
              The service is provided "as is" without any warranties, express or implied. We do not guarantee the
              accuracy, completeness, or usefulness of any predictions or information provided.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service after changes
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">8. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with applicable laws, without regard to
              conflict of law principles.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
