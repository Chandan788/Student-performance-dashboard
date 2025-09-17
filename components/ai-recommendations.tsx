"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Lightbulb, Target, Clock, BookOpen, Zap, RefreshCw, Download } from "lucide-react"
import { useState } from "react"

export function AIRecommendations() {
  const [activeTab, setActiveTab] = useState<"strategies" | "improvements" | "tips">("strategies")
  const [recommendations, setRecommendations] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateRecommendations = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: "STU001", // This would come from context in real app
          refreshRecommendations: true,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setRecommendations(data.recommendations)
      }
    } catch (error) {
      console.error("Failed to generate recommendations:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Mock data with enhanced structure
  const mockRecommendations = {
    studyStrategies: [
      {
        title: "AI-Optimized Spaced Repetition",
        description:
          "Based on your cognitive profile, implement AI-suggested spaced repetition intervals: Review at 1 day, 4 days, 1 week, 3 weeks for optimal retention.",
        priority: "High",
        timeframe: "Immediate",
        icon: Clock,
        aiConfidence: 94,
        expectedImprovement: "+12% retention",
      },
      {
        title: "Adaptive Visual Learning Path",
        description:
          "AI analysis shows 87% visual learning preference. Create interactive mind maps and use AR/VR tools for complex concepts.",
        priority: "High",
        timeframe: "This week",
        icon: BookOpen,
        aiConfidence: 89,
        expectedImprovement: "+8% comprehension",
      },
      {
        title: "Personalized Focus Enhancement",
        description:
          "Your attention patterns suggest 23-minute optimal focus windows. Use AI-powered focus apps with biometric feedback.",
        priority: "Medium",
        timeframe: "Next 2 weeks",
        icon: Target,
        aiConfidence: 82,
        expectedImprovement: "+15% attention",
      },
    ],
    improvements: [
      {
        area: "Attention",
        currentScore: 78.1,
        targetScore: 85,
        strategies: ["AI-guided meditation", "Biofeedback training", "Cognitive load optimization"],
        timeline: "4-6 weeks",
        aiPredictedSuccess: 87,
      },
      {
        area: "Focus",
        currentScore: 82.3,
        targetScore: 88,
        strategies: ["Deep work protocols", "Environmental AI optimization", "Attention restoration therapy"],
        timeline: "3-4 weeks",
        aiPredictedSuccess: 92,
      },
    ],
    personalizedTips: [
      "AI analysis: Your peak learning time is 10-11 AM based on cognitive rhythm patterns.",
      "Recommendation: Combine your strong mathematical skills with visual learning for 23% better outcomes.",
      "Insight: Your consistent attendance (92%) creates optimal conditions for habit-based learning interventions.",
      "AI suggests: Use gamification elements - your engagement increases 34% with competitive elements.",
    ],
  }

  const currentData = recommendations || mockRecommendations

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === "strategies" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("strategies")}
            className="gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            AI Strategies
          </Button>
          <Button
            variant={activeTab === "improvements" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("improvements")}
            className="gap-2"
          >
            <Target className="h-4 w-4" />
            Smart Goals
          </Button>
          <Button
            variant={activeTab === "tips" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("tips")}
            className="gap-2"
          >
            <Brain className="h-4 w-4" />
            AI Insights
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={generateRecommendations}
            disabled={isGenerating}
            className="gap-2 bg-transparent"
          >
            {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Regenerate
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Study Strategies Tab */}
      {activeTab === "strategies" && (
        <div className="space-y-4">
          {currentData.studyStrategies.map((strategy: any, index: number) => {
            const IconComponent = strategy.icon
            return (
              <Card key={index} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{strategy.title}</h4>
                        <div className="flex gap-2">
                          <Badge variant={getPriorityColor(strategy.priority) as any}>
                            {strategy.priority} Priority
                          </Badge>
                          <Badge variant="outline">{strategy.timeframe}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{strategy.description}</p>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Brain className="h-3 w-3 text-primary" />
                            AI Confidence: {strategy.aiConfidence}%
                          </span>
                          <span className="text-green-600 font-medium">Expected: {strategy.expectedImprovement}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          Apply Strategy
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Improvement Plan Tab */}
      {activeTab === "improvements" && (
        <div className="space-y-4">
          {currentData.improvements.map((improvement: any, index: number) => (
            <Card key={index} className="border-l-4 border-l-chart-2 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-chart-2/10 to-chart-2/5 rounded-lg">
                    <Zap className="h-5 w-5 text-chart-2" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Improve {improvement.area}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline">{improvement.timeline}</Badge>
                        <Badge variant="secondary" className="gap-1">
                          <Brain className="h-3 w-3" />
                          {improvement.aiPredictedSuccess}% success rate
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          Current: <span className="font-medium">{improvement.currentScore}%</span>
                        </span>
                        <span>
                          Target: <span className="font-medium text-green-600">{improvement.targetScore}%</span>
                        </span>
                      </div>

                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-chart-2 to-chart-2/80 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(improvement.currentScore / improvement.targetScore) * 100}%` }}
                        ></div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">AI-Recommended Strategies:</p>
                        <div className="flex flex-wrap gap-2">
                          {improvement.strategies.map((strategy: string, strategyIndex: number) => (
                            <Badge key={strategyIndex} variant="secondary" className="text-xs">
                              {strategy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Personalized Tips Tab */}
      {activeTab === "tips" && (
        <div className="space-y-4">
          {currentData.personalizedTips.map((tip: string, index: number) => (
            <Card key={index} className="border-l-4 border-l-chart-3 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-chart-3/10 to-chart-3/5 rounded-lg">
                    <Brain className="h-5 w-5 text-chart-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{tip}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center p-4 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">AI-Powered Recommendations</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Generated using advanced cognitive analysis and machine learning models
        </p>
        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <span>•</span>
          <span>Confidence: 89%</span>
          <span>•</span>
          <span>Based on 200+ similar profiles</span>
        </div>
      </div>
    </div>
  )
}
