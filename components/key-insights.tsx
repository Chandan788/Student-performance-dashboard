"use client"

import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react"

export function KeyInsights() {
  const insights = [
    {
      type: "positive",
      icon: CheckCircle,
      title: "Strong Retention Correlation",
      description: "High correlation (0.78) between retention and assessment scores",
      impact: "High",
    },
    {
      type: "warning",
      icon: AlertCircle,
      title: "Attention Gap",
      description: "15% of students show below-average attention scores",
      impact: "Medium",
    },
    {
      type: "trend",
      icon: TrendingUp,
      title: "Grade 12 Excellence",
      description: "Grade 12 students outperform by 8% on average",
      impact: "Low",
    },
    {
      type: "concern",
      icon: TrendingDown,
      title: "Engagement Variance",
      description: "Wide range in daily engagement times (10-90 min)",
      impact: "Medium",
    },
  ]

  const getInsightColor = (type: string) => {
    switch (type) {
      case "positive":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "concern":
        return "text-red-600"
      default:
        return "text-blue-600"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => {
        const IconComponent = insight.icon
        return (
          <div key={index} className="flex gap-3 p-3 rounded-lg border bg-card/50">
            <IconComponent className={`h-5 w-5 mt-0.5 ${getInsightColor(insight.type)}`} />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{insight.title}</h4>
                <Badge variant={getImpactColor(insight.impact) as any} className="text-xs">
                  {insight.impact}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
