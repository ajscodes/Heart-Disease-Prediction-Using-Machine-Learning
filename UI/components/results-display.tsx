"use client"

import { Heart, AlertTriangle, CheckCircle, XCircle, RefreshCw, Brain, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PredictionResult {
  risk: "low" | "moderate" | "high"
  probability: number
  factors: string[]
  modelUsed: string
}

interface FormData {
  age: string
  gender: string
  height: string
  weight: string
  apHi: string
  apLo: string
  cholesterol: string
  glucose: string
  smoke: string
  alcohol: string
  active: string
  model: string
}

import { useEffect, useRef } from "react"

interface ResultsDisplayProps {
  result: PredictionResult
  formData: FormData
  onReset: () => void
}

export function ResultsDisplay({ result, formData, onReset }: ResultsDisplayProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  const riskConfig = {
    low: {
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
      icon: CheckCircle,
      label: "Low Risk",
      description: "Your cardiovascular risk appears to be within normal range.",
      progressColor: "bg-success",
    },
    moderate: {
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
      icon: AlertTriangle,
      label: "Moderate Risk",
      description: "Some risk factors detected. Consider lifestyle modifications.",
      progressColor: "bg-warning",
    },
    high: {
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
      icon: XCircle,
      label: "High Risk",
      description: "Elevated risk detected. Please consult a healthcare provider.",
      progressColor: "bg-destructive",
    },
  }

  const config = riskConfig[result.risk]
  const Icon = config.icon

  // Calculate BMI for report
  const calculateBMI = () => {
    const height = Number.parseFloat(formData.height) / 100
    const weight = Number.parseFloat(formData.weight)
    if (height > 0 && weight > 0) {
      return (weight / (height * height)).toFixed(1)
    }
    return "N/A"
  }

  const getCholesterolLabel = (value: string) => {
    const labels: Record<string, string> = {
      "1": "Normal",
      "2": "Above Normal",
      "3": "Well Above Normal",
    }
    return labels[value] || "N/A"
  }

  const getGlucoseLabel = (value: string) => {
    const labels: Record<string, string> = {
      "1": "Normal",
      "2": "Above Normal",
      "3": "Well Above Normal",
    }
    return labels[value] || "N/A"
  }

  const handleDownloadReport = async () => {
    const { jsPDF } = await import("jspdf")
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    let yPos = 20

    // Helper function for centered text
    const centerText = (text: string, y: number, fontSize = 12) => {
      doc.setFontSize(fontSize)
      const textWidth = doc.getTextWidth(text)
      doc.text(text, (pageWidth - textWidth) / 2, y)
    }

    // Header
    doc.setFillColor(20, 184, 166) // Teal color
    doc.rect(0, 0, pageWidth, 40, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    centerText("CardioPredict", 18, 24)
    doc.setFont("helvetica", "normal")
    centerText("Cardiovascular Disease Risk Assessment Report", 30, 12)

    // Reset text color
    doc.setTextColor(0, 0, 0)
    yPos = 55

    // Report Info
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(
      `Report Generated: ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      margin,
      yPos,
    )
    doc.text(`ML Model Used: ${result.modelUsed}`, margin, yPos + 6)
    yPos += 20

    // Risk Assessment Result Box
    const riskColors = {
      low: { r: 34, g: 197, b: 94 },
      moderate: { r: 234, g: 179, b: 8 },
      high: { r: 239, g: 68, b: 68 },
    }
    const riskColor = riskColors[result.risk]

    doc.setFillColor(riskColor.r, riskColor.g, riskColor.b)
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 35, 3, 3, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(18)
    centerText(`${config.label.toUpperCase()}`, yPos + 15, 18)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(14)
    centerText(`Risk Probability: ${(result.probability * 100).toFixed(1)}%`, yPos + 27, 14)
    yPos += 45

    // Patient Information Section
    doc.setTextColor(0, 0, 0)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text("Patient Information", margin, yPos)
    yPos += 3
    doc.setDrawColor(20, 184, 166)
    doc.setLineWidth(0.5)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 10

    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)

    const patientInfo = [
      ["Age", `${formData.age} years`],
      ["Gender", formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)],
      ["Height", `${formData.height} cm`],
      ["Weight", `${formData.weight} kg`],
      ["BMI", calculateBMI()],
    ]

    const colWidth = (pageWidth - 2 * margin) / 2
    patientInfo.forEach((item, index) => {
      const xPos = margin + (index % 2) * colWidth
      if (index % 2 === 0 && index !== 0) yPos += 8
      doc.setFont("helvetica", "bold")
      doc.text(`${item[0]}:`, xPos, yPos)
      doc.setFont("helvetica", "normal")
      doc.text(item[1], xPos + 35, yPos)
    })
    yPos += 18

    // Clinical Measurements Section
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text("Clinical Measurements", margin, yPos)
    yPos += 3
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 10

    doc.setFontSize(11)
    const clinicalInfo = [
      ["Systolic BP (ap_hi)", `${formData.apHi} mm Hg`],
      ["Diastolic BP (ap_lo)", `${formData.apLo} mm Hg`],
      ["Cholesterol", getCholesterolLabel(formData.cholesterol)],
      ["Glucose", getGlucoseLabel(formData.glucose)],
    ]

    clinicalInfo.forEach((item, index) => {
      const xPos = margin + (index % 2) * colWidth
      if (index % 2 === 0 && index !== 0) yPos += 8
      doc.setFont("helvetica", "bold")
      doc.text(`${item[0]}:`, xPos, yPos)
      doc.setFont("helvetica", "normal")
      doc.text(item[1], xPos + 50, yPos)
    })
    yPos += 18

    // Lifestyle Factors Section
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text("Lifestyle Factors", margin, yPos)
    yPos += 3
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 10

    doc.setFontSize(11)
    const lifestyleInfo = [
      ["Smoker", formData.smoke === "yes" ? "Yes" : "No"],
      ["Alcohol Intake", formData.alcohol === "yes" ? "Yes" : "No"],
      ["Physical Activity", formData.active === "yes" ? "Yes" : "No"],
    ]

    lifestyleInfo.forEach((item, index) => {
      doc.setFont("helvetica", "bold")
      doc.text(`${item[0]}:`, margin + index * 60, yPos)
      doc.setFont("helvetica", "normal")
      doc.text(item[1], margin + index * 60 + 40, yPos)
    })
    yPos += 18

    // Identified Risk Factors Section
    if (result.factors.length > 0) {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(14)
      doc.text("Identified Risk Factors", margin, yPos)
      yPos += 3
      doc.line(margin, yPos, pageWidth - margin, yPos)
      yPos += 10

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      result.factors.forEach((factor) => {
        doc.setFillColor(239, 68, 68)
        doc.circle(margin + 3, yPos - 2, 1.5, "F")
        doc.text(factor, margin + 10, yPos)
        yPos += 7
      })
      yPos += 8
    }

    // Recommendations Section
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text("Recommendations", margin, yPos)
    yPos += 3
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 10

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    const recommendations = [
      "Consult a Doctor: Schedule an appointment with your healthcare provider to discuss these results.",
      "Monitor Blood Pressure: Regular monitoring can help track changes and manage cardiovascular health.",
      "Healthy Diet: A balanced diet low in saturated fats can help reduce heart disease risk.",
      "Regular Exercise: Aim for at least 150 minutes of moderate aerobic activity per week.",
    ]

    recommendations.forEach((rec) => {
      doc.setFillColor(20, 184, 166)
      doc.circle(margin + 3, yPos - 2, 1.5, "F")
      const lines = doc.splitTextToSize(rec, pageWidth - 2 * margin - 15)
      doc.text(lines, margin + 10, yPos)
      yPos += lines.length * 5 + 3
    })

    // Disclaimer
    yPos = doc.internal.pageSize.getHeight() - 35
    doc.setFillColor(245, 245, 245)
    doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 25, "F")
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    const disclaimer =
      "Medical Disclaimer: This prediction is generated by a machine learning model for educational purposes only. It is not a medical diagnosis. Always consult with qualified healthcare professionals for medical advice and treatment decisions."
    const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - 2 * margin - 10)
    doc.text(disclaimerLines, margin + 5, yPos + 2)

    // Footer
    doc.setFontSize(9)
    doc.setTextColor(150, 150, 150)
    centerText("CardioPredict - Cardiovascular Disease Risk Prediction", doc.internal.pageSize.getHeight() - 8, 9)

    // Save the PDF
    doc.save(`CardioPredict_Report_${new Date().toISOString().split("T")[0]}.pdf`)
  }

  return (
    <section id="predict" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Your Assessment Results</h2>
          <p className="text-muted-foreground">
            Based on the health data you provided, here is your cardiovascular disease risk assessment.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Predicted using: <span className="text-foreground font-medium">{result.modelUsed}</span>
              </span>
            </div>
          </div>

          {/* Main Result Card */}
          <Card className={`bg-card border-2 ${config.borderColor}`}>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className={`p-6 rounded-full ${config.bgColor}`}>
                  <Icon className={`h-16 w-16 ${config.color}`} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className={`text-sm font-medium ${config.color} mb-2`}>Prediction Result</div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{config.label}</h3>
                  <p className="text-muted-foreground mb-4">{config.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Risk Probability</span>
                      <span className={`font-bold ${config.color}`}>{(result.probability * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={result.probability * 100} className="h-3 bg-secondary">
                      <div
                        className={`h-full rounded-full transition-all ${config.progressColor}`}
                        style={{ width: `${result.probability * 100}%` }}
                      />
                    </Progress>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          {result.factors.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Identified Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.factors.map((factor, index) => (
                    <li key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-warning" />
                      <span className="text-foreground">{factor}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Heart className="h-5 w-5 text-primary" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Consult a Doctor",
                    description: "Schedule an appointment with your healthcare provider to discuss these results.",
                  },
                  {
                    title: "Monitor Blood Pressure",
                    description: "Regular monitoring can help track changes and manage cardiovascular health.",
                  },
                  {
                    title: "Healthy Diet",
                    description: "A balanced diet low in saturated fats can help reduce heart disease risk.",
                  },
                  {
                    title: "Regular Exercise",
                    description: "Aim for at least 150 minutes of moderate aerobic activity per week.",
                  },
                ].map((rec, index) => (
                  <div key={index} className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onReset}
              size="lg"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              New Assessment
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-border bg-transparent"
              onClick={handleDownloadReport}
            >
              <FileText className="mr-2 h-5 w-5" />
              Download Report
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-border text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Medical Disclaimer:</strong> This prediction is generated by a machine
              learning model for educational purposes only. It is not a medical diagnosis. Always consult with qualified
              healthcare professionals for medical advice and treatment decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
