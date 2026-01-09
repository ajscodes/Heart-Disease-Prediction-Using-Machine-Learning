"use client"

import type React from "react"

import { useState } from "react"
import { Heart, AlertCircle, Loader2, Activity, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResultsDisplay } from "@/components/results-display"

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

interface PredictionResult {
  risk: "low" | "moderate" | "high"
  probability: number
  factors: string[]
  modelUsed: string
}

export function PredictionForm() {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    height: "",
    weight: "",
    apHi: "",
    apLo: "",
    cholesterol: "",
    glucose: "",
    smoke: "",
    alcohol: "",
    active: "",
    model: "random_forest",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)

  // Calculate BMI for display
  const calculateBMI = () => {
    const height = Number.parseFloat(formData.height) / 100 // convert cm to m
    const weight = Number.parseFloat(formData.weight)
    if (height > 0 && weight > 0) {
      return (weight / (height * height)).toFixed(1)
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("https://heart-disease-prediction-using-machine-d7ti.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: parseInt(formData.age),
          gender: formData.gender,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          apHi: parseInt(formData.apHi),
          apLo: parseInt(formData.apLo),
          cholesterol: formData.cholesterol,
          glucose: formData.glucose,
          smoke: formData.smoke,
          alcohol: formData.alcohol,
          active: formData.active,
          model: formData.model,
        }),
      })

      if (!response.ok) {
        throw new Error("Prediction failed")
      }

      const data = await response.json()
      setResult({
        risk: data.risk,
        probability: data.probability,
        factors: data.factors,
        modelUsed: data.modelUsed,
      })

    } catch (error) {
      console.error("Error making prediction:", error)
      // You might want to add a toast notification here
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setFormData({
      age: "",
      gender: "",
      height: "",
      weight: "",
      apHi: "",
      apLo: "",
      cholesterol: "",
      glucose: "",
      smoke: "",
      alcohol: "",
      active: "",
      model: "random_forest",
    })
  }

  if (result) {
    return <ResultsDisplay result={result} formData={formData} onReset={handleReset} />
  }

  const bmi = calculateBMI()

  return (
    <section id="predict" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Heart Disease Risk Assessment</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your health information below to receive an instant AI-powered prediction of your cardiovascular
            disease risk.
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Heart className="h-5 w-5 text-primary" />
              Patient Health Data
            </CardTitle>
            <CardDescription>
              All fields are required for accurate prediction. Your data is processed securely and never stored.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Demographics Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Demographics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-foreground">
                      Age (years)
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 45"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Gender</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      className="flex gap-4 pt-2"
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="text-foreground cursor-pointer">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="text-foreground cursor-pointer">
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Body Measurements Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Body Measurements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-foreground">
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 170"
                      min="50"
                      max="250"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-foreground">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 70"
                      min="20"
                      max="300"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                </div>
                {bmi && (
                  <div className="p-3 bg-secondary/50 rounded-lg flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Calculated BMI: <span className="text-foreground font-medium">{bmi}</span>
                      <span className="ml-2 text-xs">
                        (
                        {Number.parseFloat(bmi) < 18.5
                          ? "Underweight"
                          : Number.parseFloat(bmi) < 25
                            ? "Normal"
                            : Number.parseFloat(bmi) < 30
                              ? "Overweight"
                              : "Obese"}
                        )
                      </span>
                    </span>
                  </div>
                )}
              </div>

              {/* Blood Pressure Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Blood Pressure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="apHi" className="text-foreground">
                      Systolic BP (ap_hi) - mm Hg
                    </Label>
                    <Input
                      id="apHi"
                      type="number"
                      placeholder="e.g., 120"
                      min="60"
                      max="250"
                      value={formData.apHi}
                      onChange={(e) => setFormData({ ...formData, apHi: e.target.value })}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Upper number when measuring blood pressure</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apLo" className="text-foreground">
                      Diastolic BP (ap_lo) - mm Hg
                    </Label>
                    <Input
                      id="apLo"
                      type="number"
                      placeholder="e.g., 80"
                      min="40"
                      max="200"
                      value={formData.apLo}
                      onChange={(e) => setFormData({ ...formData, apLo: e.target.value })}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Lower number when measuring blood pressure</p>
                  </div>
                </div>
              </div>

              {/* Lab Results Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Lab Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cholesterol" className="text-foreground">
                      Cholesterol Level
                    </Label>
                    <Select
                      value={formData.cholesterol}
                      onValueChange={(value) => setFormData({ ...formData, cholesterol: value })}
                      required
                    >
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="Select cholesterol level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Normal</SelectItem>
                        <SelectItem value="2">Above Normal</SelectItem>
                        <SelectItem value="3">Well Above Normal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="glucose" className="text-foreground">
                      Glucose Level
                    </Label>
                    <Select
                      value={formData.glucose}
                      onValueChange={(value) => setFormData({ ...formData, glucose: value })}
                      required
                    >
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="Select glucose level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Normal</SelectItem>
                        <SelectItem value="2">Above Normal</SelectItem>
                        <SelectItem value="3">Well Above Normal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Lifestyle Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Lifestyle Factors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-foreground">Smoker</Label>
                    <RadioGroup
                      value={formData.smoke}
                      onValueChange={(value) => setFormData({ ...formData, smoke: value })}
                      className="flex gap-4 pt-2"
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="smoke-yes" />
                        <Label htmlFor="smoke-yes" className="text-foreground cursor-pointer">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="smoke-no" />
                        <Label htmlFor="smoke-no" className="text-foreground cursor-pointer">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Alcohol Intake</Label>
                    <RadioGroup
                      value={formData.alcohol}
                      onValueChange={(value) => setFormData({ ...formData, alcohol: value })}
                      className="flex gap-4 pt-2"
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="alcohol-yes" />
                        <Label htmlFor="alcohol-yes" className="text-foreground cursor-pointer">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="alcohol-no" />
                        <Label htmlFor="alcohol-no" className="text-foreground cursor-pointer">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Physical Activity</Label>
                    <RadioGroup
                      value={formData.active}
                      onValueChange={(value) => setFormData({ ...formData, active: value })}
                      className="flex gap-4 pt-2"
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="active-yes" />
                        <Label htmlFor="active-yes" className="text-foreground cursor-pointer">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="active-no" />
                        <Label htmlFor="active-no" className="text-foreground cursor-pointer">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Model Selection Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Select ML Model
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="model" className="text-foreground">
                    Prediction Model
                  </Label>
                  <Select
                    value={formData.model}
                    onValueChange={(value) => setFormData({ ...formData, model: value })}
                    required
                  >
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select ML model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="random_forest">
                        <div className="flex items-center gap-2">
                          <span>Random Forest</span>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Recommended</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="logistic_regression">Logistic Regression</SelectItem>
                      <SelectItem value="decision_tree">Decision Tree</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Random Forest typically provides the highest accuracy for cardiovascular prediction.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-5 w-5" />
                      Get Prediction
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  className="border-border bg-transparent"
                >
                  Clear Form
                </Button>
              </div>

              <div className="flex items-start gap-2 p-4 rounded-lg bg-secondary/50 border border-border">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  This tool is for educational purposes only and should not replace professional medical advice. Always
                  consult with a healthcare provider for medical decisions.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
