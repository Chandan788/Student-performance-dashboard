"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Brain, Target, AlertCircle } from "lucide-react"

interface PredictionResult {
  predictedScore: number
  confidence: number
  category: string
  categoryColor: string
  insights: string[]
  modelInfo: {
    features: string[]
    accuracy: string
    description: string
  }
}

export function ScorePredictionResults() {
  const [result, setResult] = useState<PredictionResult | null>(null)

  useEffect(() => {
    const handlePredictionResult = (event: CustomEvent) => {
      setResult(event.detail)
    }

    window.addEventListener("predictionResult", handlePredictionResult as EventListener)
    return () => {
      window.removeEventListener("predictionResult", handlePredictionResult as EventListener)
    }
  }, [])

  if (!result) {
    return (
      <div className="text-center py-12">
        <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-medium text-muted-foreground mb-2">No Prediction Yet</h3>
        <p className="text-sm text-muted-foreground">
          Enter cognitive skill values and click "Predict Score" to see AI-generated assessment predictions.
        </p>
      </div>
    )
  }

  const getCategoryVariant = (color: string) => {
    switch (color) {
      case "green":
        return "default"
      case "blue":
        return "secondary"
      case "yellow":
        return "outline"
      default:
        return "destructive"
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Prediction */}
      <div className="text-center p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-lg">Predicted Assessment Score</h3>
        </div>
        <div className={`text-4xl font-bold mb-2 text-${result.categoryColor}-600`}>{result.predictedScore}%</div>
        <Badge variant={getCategoryVariant(result.categoryColor) as any} className="mb-3">
          {result.category}
        </Badge>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Confidence:</span>
          <span className="font-medium">{result.confidence}%</span>
        </div>
      </div>

      {/* Confidence Indicator */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Prediction Confidence</span>
          <span className="text-sm text-muted-foreground">{result.confidence}%</span>
        </div>
        <Progress value={result.confidence} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1">
          {result.confidence >= 90
            ? "Very high confidence"
            : result.confidence >= 80
              ? "High confidence"
              : result.confidence >= 70
                ? "Moderate confidence"
                : "Lower confidence - consider additional factors"}
        </p>
      </div>

      {/* Insights */}
      {result.insights && result.insights.length > 0 && (
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-chart-1" />
            AI Insights
          </h4>
          <div className="space-y-2">
            {result.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2 p-2 rounded bg-muted/50">
                <AlertCircle className="h-4 w-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{insight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Model Information */}
      <div className="p-4 rounded-lg bg-muted/50 border">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          Model Details
        </h4>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>{result.modelInfo.description}</p>
          <p>Accuracy: {result.modelInfo.accuracy}</p>
          <p>Features: {result.modelInfo.features.join(", ")}</p>
        </div>
      </div>
    </div>
  )
}
