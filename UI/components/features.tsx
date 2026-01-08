import { Brain, Shield, Zap, Database, LineChart, Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Brain,
    title: "Advanced ML Models",
    description: "Choose from Random Forest, Logistic Regression, or Decision Tree algorithms for your prediction.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get your cardiovascular risk assessment in seconds, not days. No waiting for lab results.",
  },
  {
    icon: Shield,
    title: "Data Secure",
    description: "Your health data is processed securely with no permanent storage. Your privacy is our priority.",
  },
  {
    icon: Database,
    title: "11 Risk Factors",
    description:
      "Comprehensive analysis covering age, gender, BMI, blood pressure, cholesterol, glucose, lifestyle and more.",
  },
  {
    icon: LineChart,
    title: "73% Accuracy",
    description: "Our models have been trained and validated on extensive cardiovascular disease datasets.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data is never stored or shared. All processing happens in real-time.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Choose CardioPredict?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with medical expertise to deliver reliable heart health
            insights.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
