"use client"

import {
  Heart,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Brain,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useRef } from "react"

/* =========================
   TYPES
========================= */

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

interface ResultsDisplayProps {
  result: PredictionResult
  formData: FormData
  onReset: () => void
}

/* =========================
   COMPONENT
========================= */

export function ResultsDisplay({
  result,
  formData,
  onReset,
}: ResultsDisplayProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  /* =========================
     RISK CONFIG
  ========================= */

  const riskConfig = {
    low: {
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
      icon: CheckCircle,
      label: "Low Risk",
      description:
        "Your cardiovascular risk appears to be within normal range.",
      progressColor: "bg-success",
    },
    moderate: {
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
      icon: AlertTriangle,
      label: "Moderate Risk",
      description:
        "Some risk factors detected. Consider lifestyle modifications.",
      progressColor: "bg-warning",
    },
    high: {
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
      icon: XCircle,
      label: "High Risk",
      description:
        "Elevated risk detected. Please consult a healthcare provider.",
      progressColor: "bg-destructive",
    },
  }

  const config = riskConfig[result.risk]
  const Icon = config.icon

  /* =========================
     HELPERS
  ========================= */

  const calculateBMI = () => {
    const h = Number(formData.height) / 100
    const w = Number(formData.weight)
    return h && w ? (w / (h * h)).toFixed(1) : "N/A"
  }

  const getCholesterolLabel = (v: string) =>
    ({ "1": "Normal", "2": "Above Normal", "3": "Well Above Normal" }[v] ??
    "N/A")

  const getGlucoseLabel = (v: string) =>
    ({ "1": "Normal", "2": "Above Normal", "3": "Well Above Normal" }[v] ??
    "N/A")

  /* =========================
     PDF GENERATION (FIXED)
  ========================= */

  const handleDownloadReport = async () => {
    const { jsPDF } = await import("jspdf")
    const doc = new jsPDF()

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const bottomMargin = 30
    let y = 20

    const checkPage = (space = 10) => {
      if (y + space > pageHeight - bottomMargin) {
        doc.addPage()
        y = 20
      }
    }

    const center = (text: string, yPos: number, size = 12) => {
      doc.setFontSize(size)
      const w = doc.getTextWidth(text)
      doc.text(text, (pageWidth - w) / 2, yPos)
    }

    /* HEADER */
    doc.setFillColor(20, 184, 166)
    doc.rect(0, 0, pageWidth, 40, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    center("CardioPredict", 18, 24)
    doc.setFont("helvetica", "normal")
    center("Cardiovascular Risk Assessment Report", 30, 12)

    y = 55
    doc.setTextColor(100)
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y)
    doc.text(`Model Used: ${result.modelUsed}`, margin, y + 6)
    y += 20

    /* RISK SUMMARY */
    const riskColors: any = {
      low: [34, 197, 94],
      moderate: [234, 179, 8],
      high: [239, 68, 68],
    }

    checkPage(40)
    doc.setFillColor(...riskColors[result.risk])
    doc.roundedRect(
      margin,
      y,
      pageWidth - margin * 2,
      35,
      3,
      3,
      "F"
    )

    doc.setTextColor(255)
    doc.setFont("helvetica", "bold")
    center(config.label.toUpperCase(), y + 15, 18)
    doc.setFont("helvetica", "normal")
    center(
      `Risk Probability: ${(result.probability * 100).toFixed(1)}%`,
      y + 27,
      14
    )

    y += 45
    doc.setTextColor(0)

    /* SECTIONS */
    const section = (title: string) => {
      checkPage(20)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(14)
      doc.text(title, margin, y)
      y += 4
      doc.line(margin, y, pageWidth - margin, y)
      y += 10
    }

    section("Patient Information")
    const patient = [
      ["Age", `${formData.age} yrs`],
      ["Gender", formData.gender],
      ["Height", `${formData.height} cm`],
      ["Weight", `${formData.weight} kg`],
      ["BMI", calculateBMI()],
    ]

    patient.forEach(([k, v]) => {
      checkPage(8)
      doc.setFont("helvetica", "bold")
      doc.text(`${k}:`, margin, y)
      doc.setFont("helvetica", "normal")
      doc.text(v, margin + 50, y)
      y += 7
    })

    section("Clinical Measurements")
    ;[
      ["Systolic BP", `${formData.apHi} mmHg`],
      ["Diastolic BP", `${formData.apLo} mmHg`],
      ["Cholesterol", getCholesterolLabel(formData.cholesterol)],
      ["Glucose", getGlucoseLabel(formData.glucose)],
    ].forEach(([k, v]) => {
      checkPage(8)
      doc.setFont("helvetica", "bold")
      doc.text(`${k}:`, margin, y)
      doc.setFont("helvetica", "normal")
      doc.text(v, margin + 60, y)
      y += 7
    })

    section("Lifestyle Factors")
    ;[
      ["Smoker", formData.smoke === "yes" ? "Yes" : "No"],
      ["Alcohol", formData.alcohol === "yes" ? "Yes" : "No"],
      ["Active", formData.active === "yes" ? "Yes" : "No"],
    ].forEach(([k, v]) => {
      checkPage(8)
      doc.setFont("helvetica", "bold")
      doc.text(`${k}:`, margin, y)
      doc.setFont("helvetica", "normal")
      doc.text(v, margin + 60, y)
      y += 7
    })

    if (result.factors.length) {
      section("Identified Risk Factors")
      result.factors.forEach((f) => {
        checkPage(8)
        doc.circle(margin + 3, y - 2, 1.5, "F")
        doc.text(f, margin + 10, y)
        y += 7
      })
    }

    section("Recommendations")
    ;[
      "Consult a healthcare provider.",
      "Monitor blood pressure regularly.",
      "Maintain a heart-healthy diet.",
      "Exercise regularly.",
    ].forEach((r) => {
      const lines = doc.splitTextToSize(
        r,
        pageWidth - margin * 2 - 10
      )
      checkPage(lines.length * 6)
      doc.text(lines, margin + 10, y)
      y += lines.length * 6
    })

    /* DISCLAIMER */
    doc.addPage()
    y = pageHeight - 40
    doc.setFillColor(245)
    doc.rect(margin, y - 5, pageWidth - margin * 2, 30, "F")
    doc.setFontSize(8)
    doc.setTextColor(100)
    doc.text(
      doc.splitTextToSize(
        "Medical Disclaimer: This report is generated by a machine learning model for educational purposes only. It is not a medical diagnosis.",
        pageWidth - margin * 2 - 10
      ),
      margin + 5,
      y + 3
    )

    doc.save(
      `CardioPredict_Report_${new Date().toISOString().split("T")[0]}.pdf`
    )
  }

  /* =========================
     JSX UI (UNCHANGED)
  ========================= */

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className={`border-2 ${config.borderColor}`}>
          <CardContent className="p-8 text-center">
            <Icon className={`mx-auto h-16 w-16 ${config.color}`} />
            <h3 className="text-3xl font-bold mt-4">{config.label}</h3>
            <p className="text-muted-foreground">{config.description}</p>
            <Progress
              value={result.probability * 100}
              className="mt-4 h-3"
            />
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={onReset} className="flex-1">
            <RefreshCw className="mr-2 h-5 w-5" /> New Assessment
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadReport}
            className="flex-1"
          >
            <FileText className="mr-2 h-5 w-5" /> Download Report
          </Button>
        </div>
      </div>
    </section>
  )
}