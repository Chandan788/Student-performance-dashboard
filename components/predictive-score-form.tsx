"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calculator, Loader2, RotateCcw } from "lucide-react"

interface PredictiveScoreFormProps {
  onPrediction?: (result: any) => void
}

export function PredictiveScoreForm({ onPrediction }: PredictiveScoreFormProps) {
  const [values, setValues] = useState({
    comprehension: 75,
    attention: 70,
    focus: 72,
    retention: 78,
    engagement_time: 45,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSliderChange = (field: string, newValue: number[]) => {
    setValues((prev) => ({ ...prev, [field]: newValue[0] }))
  }

  const handleInputChange = (field: string, value: string) => {
    const numValue = Math.max(0, Math.min(100, Number.parseInt(value) || 0))
    setValues((prev) => ({ ...prev, [field]: numValue }))
  }

  const handlePredict = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/predict-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const result = await response.json()
      if (onPrediction) {
        onPrediction(result)
      }

      // Trigger custom event for results component
      window.dispatchEvent(new CustomEvent("predictionResult", { detail: result }))
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setValues({
      comprehension: 75,
      attention: 70,
      focus: 72,
      retention: 78,
      engagement_time: 45,
    })
  }

  const fields = [
    { key: "comprehension", label: "Comprehension", description: "Reading and understanding ability" },
    { key: "attention", label: "Attention", description: "Ability to focus on tasks" },
    { key: "focus", label: "Focus", description: "Sustained concentration skills" },
    { key: "retention", label: "Retention", description: "Memory and recall ability" },
    { key: "engagement_time", label: "Engagement Time", description: "Daily study time (minutes)" },
  ]

  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <div key={field.key} className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor={field.key} className="text-sm font-medium">
                {field.label}
              </Label>
              <p className="text-xs text-muted-foreground">{field.description}</p>
            </div>
            <Input
              id={field.key}
              type="number"
              min="0"
              max={field.key === "engagement_time" ? "90" : "100"}
              value={values[field.key as keyof typeof values]}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className="w-20 text-center"
            />
          </div>
          <Slider
            value={[values[field.key as keyof typeof values]]}
            onValueChange={(value) => handleSliderChange(field.key, value)}
            max={field.key === "engagement_time" ? 90 : 100}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span className="font-medium">{values[field.key as keyof typeof values]}</span>
            <span>{field.key === "engagement_time" ? "90" : "100"}</span>
          </div>
        </div>
      ))}

      <div className="flex gap-3 pt-4">
        <Button onClick={handlePredict} disabled={isLoading} className="flex-1 gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Predicting...
            </>
          ) : (
            <>
              <Calculator className="h-4 w-4" />
              Predict Score
            </>
          )}
        </Button>
        <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  )
}
