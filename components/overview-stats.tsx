"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, TrendingUp, Users, BookOpen } from "@/components/simple-icons"
import { useEffect, useState } from "react"

interface DashboardSummary {
  total_students: number
  average_assessment_score: number
  average_engagement_time: number
  average_attendance_rate: number
  cognitive_skills_avg: {
    comprehension: number
    attention: number
    focus: number
    retention: number
  }
}

export function OverviewStats() {
  const [stats, setStats] = useState<DashboardSummary | null>(null)

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use mock data based on our generated dataset
    const mockStats: DashboardSummary = {
      total_students: 200,
      average_assessment_score: 74.2,
      average_engagement_time: 47.8,
      average_attendance_rate: 87.3,
      cognitive_skills_avg: {
        comprehension: 75.1,
        attention: 69.8,
        focus: 71.4,
        retention: 77.9,
      },
    }
    setStats(mockStats)
  }, [])

  if (!stats) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: "Excellent", variant: "default" as const, className: "bg-emerald-600 text-white" }
    if (score >= 70) return { text: "Good", variant: "secondary" as const, className: "bg-blue-600 text-white" }
    return { text: "Needs Improvement", variant: "destructive" as const, className: "bg-red-600 text-white" }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_students}</div>
          <p className="text-xs text-muted-foreground">Active learners in system</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Assessment Score</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getScoreColor(stats.average_assessment_score)}`}>
            {stats.average_assessment_score}%
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant={getScoreBadge(stats.average_assessment_score).variant}
              className={`text-xs ${getScoreBadge(stats.average_assessment_score).className}`}
            >
              {getScoreBadge(stats.average_assessment_score).text}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.average_engagement_time}</div>
          <p className="text-xs text-muted-foreground">minutes per day</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getScoreColor(stats.average_attendance_rate)}`}>
            {stats.average_attendance_rate}%
          </div>
          <p className="text-xs text-muted-foreground">average attendance</p>
        </CardContent>
      </Card>

      {/* Cognitive Skills Overview */}
      <Card className="md:col-span-2 lg:col-span-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Cognitive Skills Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(stats.cognitive_skills_avg).map(([skill, score]) => (
              <div key={skill} className="text-center">
                <div className={`text-xl font-bold ${getScoreColor(score)}`}>{score}%</div>
                <div className="text-sm text-muted-foreground capitalize">{skill}</div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
