import { Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg">Last updated: January 2026</p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>
              CardioPredict collects health-related information that you voluntarily provide when using our
              cardiovascular disease prediction tool. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Age and gender</li>
              <li>Physical measurements (height, weight)</li>
              <li>Blood pressure readings (systolic and diastolic)</li>
              <li>Cholesterol and glucose levels</li>
              <li>Lifestyle factors (smoking, alcohol consumption, physical activity)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>
              The health data you provide is used solely for the purpose of generating your cardiovascular disease risk
              prediction. We do not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Store your personal health data on our servers</li>
              <li>Share your information with third parties</li>
              <li>Use your data for marketing purposes</li>
              <li>Create user profiles or track your usage over time</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. Data Processing</h2>
            <p>
              All data processing occurs in real-time when you submit your health information. Once your prediction is
              generated and displayed, your input data is not retained. Our machine learning models process your data
              locally to provide instant results.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your information during
              transmission. All data is transmitted over secure, encrypted connections.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
            <p>
              Since we do not store your personal data, there is no personal information to access, correct, or delete.
              Each prediction session is independent and anonymous.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
              updated revision date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us through our GitHub repository.</p>
          </section>
        </div>
      </main>
    </div>
  )
}
