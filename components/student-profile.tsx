"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  GraduationCap,
  Clock,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Brain,
  Sparkles,
  Download,
} from "lucide-react"
import { useState } from "react"

const mockStudent = {
  student_id: "STU001",
  name: "Emma Johnson",
  class: "10A",
  age: 16,
  comprehension: 85.2,
  attention: 78.1,
  focus: 82.3,
  retention: 88.7,
  assessment_score: 84.5,
  engagement_time: 52.3,
  study_hours_per_week: 12.5,
  attendance_rate: 92.1,
  learning_style: "Visual",
  preferred_subject: "Mathematics",
  last_assessment_date: "2024-01-15",
  strengths: ["Retention", "Comprehension"],
  improvement_areas: ["Attention", "Focus"],
  aiInsights: {
    learningPersona: "Comprehensive Thinker",
    confidenceScore: 89,
    predictedGrowth: "+12%",
    riskLevel: "Low",
  },
}

export function StudentProfile() {
  const [aiAnalysis, setAiAnalysis] = useState<string>("")
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getPerformanceBadge = (score: number) => {
    if (score >= 85) return { variant: "default" as const, text: "Excellent", color: "bg-emerald-100 text-emerald-800" }
    if (score >= 75) return { variant: "secondary" as const, text: "Good", color: "bg-blue-600 text-white" }
    if (score >= 65) return { variant: "outline" as const, text: "Average", color: "bg-amber-100 text-amber-800" }
    return { variant: "destructive" as const, text: "Needs Support", color: "bg-red-100 text-red-800" }
  }

  const generateAIAnalysis = async () => {
    setIsLoadingAnalysis(true)
    try {
      const response = await fetch("/api/analyze-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: mockStudent.student_id }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiAnalysis(data.analysis)
      }
    } catch (error) {
      console.error("Failed to generate AI analysis:", error)
    } finally {
      setIsLoadingAnalysis(false)
    }
  }

  const performanceBadge = getPerformanceBadge(mockStudent.assessment_score)

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-gradient-to-r from-card via-card to-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Student Basic Info */}
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 shadow-lg">
                <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  {mockStudent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-3">
                <div>
                  <h3 className="text-2xl font-bold text-balance">{mockStudent.name}</h3>
                  <p className="text-muted-foreground">ID: {mockStudent.student_id}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="gap-1">
                    <GraduationCap className="h-3 w-3" />
                    Class {mockStudent.class}
                  </Badge>
                  <Badge variant="outline">Age {mockStudent.age}</Badge>
                  <Badge className={performanceBadge.color}>{performanceBadge.text}</Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Brain className="h-3 w-3" />
                    {mockStudent.aiInsights.learningPersona}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <div className={`text-2xl font-bold ${getScoreColor(mockStudent.assessment_score)}`}>
                  {mockStudent.assessment_score}%
                </div>
                <div className="text-sm text-muted-foreground">Assessment Score</div>
                <Progress value={mockStudent.assessment_score} className="mt-2 h-2" />
              </div>

              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <div className="text-2xl font-bold text-foreground">{mockStudent.engagement_time}m</div>
                <div className="text-sm text-muted-foreground">Daily Engagement</div>
                <Progress value={(mockStudent.engagement_time / 60) * 100} className="mt-2 h-2" />
              </div>

              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <div className={`text-2xl font-bold ${getScoreColor(mockStudent.attendance_rate)}`}>
                  {mockStudent.attendance_rate}%
                </div>
                <div className="text-sm text-muted-foreground">Attendance Rate</div>
                <Progress value={mockStudent.attendance_rate} className="mt-2 h-2" />
              </div>

              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
                <div className="text-2xl font-bold text-green-600">{mockStudent.aiInsights.predictedGrowth}</div>
                <div className="text-sm text-muted-foreground">AI Predicted Growth</div>
                <Badge variant="outline" className="mt-2 text-xs">
                  {mockStudent.aiInsights.confidenceScore}% confidence
                </Badge>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-6 pt-6 border-t">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Learning Style:</span>
                <Badge variant="secondary">{mockStudent.learning_style}</Badge>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Preferred Subject:</span>
                <span className="font-medium">{mockStudent.preferred_subject}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Study Hours/Week:</span>
                <span className="font-medium">{mockStudent.study_hours_per_week}h</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Assessment:</span>
                <span className="font-medium">{mockStudent.last_assessment_date}</span>
              </div>
            </div>

            {/* Strengths and Improvement Areas */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Cognitive Strengths
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mockStudent.strengths.map((strength) => (
                    <Badge key={strength} className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-orange-600" />
                  Growth Opportunities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mockStudent.improvement_areas.map((area) => (
                    <Badge
                      key={area}
                      variant="outline"
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Cognitive Analysis
            </h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={generateAIAnalysis}
                disabled={isLoadingAnalysis}
                className="gap-2 bg-transparent"
              >
                {isLoadingAnalysis ? <Sparkles className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Generate Analysis
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          {aiAnalysis ? (
            <div className="prose prose-sm max-w-none">
              <div className="p-4 bg-card rounded-lg border">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{aiAnalysis}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Click "Generate Analysis" to get AI-powered insights about this student's cognitive profile</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
