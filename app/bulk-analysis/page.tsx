"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Users, TrendingUp, Download, Sparkles, PieChart, Target } from "lucide-react"
import { NavigationMenu } from "@/components/navigation-menu"

interface BulkAnalysisResult {
  totalStudents: number
  analysisComplete: number
  insights: {
    topPerformers: Array<{ name: string; score: number }>
    strugglingStudents: Array<{ name: string; score: number; recommendations: string }>
    classInsights: Array<{ class: string; avgScore: number; trend: string }>
    cognitivePatterns: Array<{ pattern: string; percentage: number; description: string }>
  }
  recommendations: {
    classLevel: string[]
    individual: Array<{ studentId: string; recommendations: string[] }>
  }
}

export default function BulkAnalysisPage() {
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [analysisType, setAnalysisType] = useState<string>("comprehensive")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [results, setResults] = useState<BulkAnalysisResult | null>(null)

  const classes = ["all", "9A", "9B", "10A", "10B", "10C", "11A", "11B", "12A"]

  const startBulkAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 15
      })
    }, 500)

    try {
      const response = await fetch("/api/bulk-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedClass,
          analysisType,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setResults(data)
        setAnalysisProgress(100)
      }
    } catch (error) {
      console.error("Bulk analysis failed:", error)
    } finally {
      clearInterval(progressInterval)
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-balance">Bulk AI Analysis</h1>
                  <p className="text-sm text-muted-foreground">Comprehensive class-wide cognitive analysis</p>
                </div>
              </div>
              <NavigationMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Bulk Analysis Configuration
            </CardTitle>
            <CardDescription>Analyze multiple students simultaneously with AI-powered insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose class to analyze" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls === "all" ? "All Classes" : `Class ${cls}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Analysis Type</label>
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose analysis type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                    <SelectItem value="cognitive_focus">Cognitive Skills Focus</SelectItem>
                    <SelectItem value="performance_trends">Performance Trends</SelectItem>
                    <SelectItem value="learning_personas">Learning Personas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={startBulkAnalysis} disabled={isAnalyzing} className="gap-2">
                <Sparkles className="h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : "Start AI Analysis"}
              </Button>

              {results && (
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export Results
                </Button>
              )}
            </div>

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analysis Progress</span>
                  <span>{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  AI is analyzing student profiles and generating insights...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {results && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Students Analyzed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{results.totalStudents}</div>
                    <p className="text-sm text-muted-foreground">Complete profiles processed</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {results.insights.topPerformers.slice(0, 3).map((student, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm font-medium">{student.name}</span>
                          <Badge variant="default">{student.score.toFixed(1)}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Need Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {results.insights.strugglingStudents.slice(0, 3).map((student, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm font-medium">{student.name}</span>
                          <Badge variant="destructive">{student.score.toFixed(1)}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI-Generated Class Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.insights.classInsights.map((insight, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Class {insight.class}</h4>
                        <Badge
                          variant={
                            insight.avgScore >= 80 ? "default" : insight.avgScore >= 70 ? "secondary" : "destructive"
                          }
                        >
                          {insight.avgScore.toFixed(1)}% avg
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.trend}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Cognitive Patterns Identified
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.insights.cognitivePatterns.map((pattern, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{pattern.pattern}</span>
                        <span className="text-sm text-muted-foreground">{pattern.percentage}%</span>
                      </div>
                      <Progress value={pattern.percentage} className="h-2" />
                      <p className="text-sm text-muted-foreground">{pattern.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Class-Level Recommendations</h4>
                    <div className="space-y-2">
                      {results.recommendations.classLevel.map((rec, index) => (
                        <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}
