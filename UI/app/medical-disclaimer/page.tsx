import { Heart, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function MedicalDisclaimerPage() {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Medical Disclaimer</h1>

        <Card className="bg-destructive/10 border-destructive/50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Important Notice</h2>
                <p className="text-muted-foreground">
                  CardioPredict is an educational machine learning project. It is NOT a medical device and should NEVER
                  be used as a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Not Medical Advice</h2>
            <p>
              The information and predictions provided by CardioPredict are for educational and informational purposes
              only. This tool:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Does not provide medical advice, diagnosis, or treatment recommendations</li>
              <li>Is not intended to replace consultation with qualified healthcare providers</li>
              <li>Should not be used to make health-related decisions</li>
              <li>Is a demonstration of machine learning technology, not a clinical tool</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Limitations of the Model</h2>
            <p>Our machine learning models have inherent limitations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Accuracy:</strong> Our models achieve approximately 73% accuracy, meaning predictions may be
                incorrect in a significant number of cases
              </li>
              <li>
                <strong>Training Data:</strong> Models are trained on historical datasets that may not represent all
                populations or conditions
              </li>
              <li>
                <strong>Limited Factors:</strong> The tool analyzes only 11 risk factors and cannot account for many
                other important health variables
              </li>
              <li>
                <strong>No Clinical Validation:</strong> This tool has not been validated in clinical settings or
                approved by medical authorities
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">What This Tool Cannot Do</h2>
            <p>CardioPredict cannot:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Diagnose cardiovascular disease or any other medical condition</li>
              <li>Predict with certainty whether you will develop heart disease</li>
              <li>Account for your complete medical history, family history, or genetic factors</li>
              <li>Consider medications you may be taking or other treatments</li>
              <li>Replace blood tests, ECGs, imaging, or other clinical assessments</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Seek Professional Medical Care</h2>
            <p>If you have concerns about your cardiovascular health, please:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Consult with a qualified healthcare provider or cardiologist</li>
              <li>Get regular health checkups and screenings</li>
              <li>Discuss your risk factors with your doctor</li>
              <li>Follow evidence-based medical recommendations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Emergency Situations</h2>
            <p className="text-foreground font-medium">
              If you are experiencing symptoms of a heart attack or cardiac emergency, call emergency services
              immediately. Do not use this tool to assess emergency situations.
            </p>
            <p>Common heart attack warning signs include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Chest pain or discomfort</li>
              <li>Shortness of breath</li>
              <li>Pain in the arm, neck, jaw, or back</li>
              <li>Nausea, lightheadedness, or cold sweats</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Acknowledgment</h2>
            <p>
              By using CardioPredict, you acknowledge that you have read and understood this disclaimer, and you agree
              that the creators of this tool bear no responsibility for any decisions made based on its predictions.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
