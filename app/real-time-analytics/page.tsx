"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Activity, Users, TrendingUp, AlertCircle, Zap, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function RealTimeAnalyticsPage() {
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [metrics, setMetrics] = useState({
    activeStudents: 47,
    avgAttention: 82.3,
    avgEngagement: 76.8,
    alertsCount: 3,
    improvementTrend: 5.2,
  })

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        activeStudents: prev.activeStudents + Math.floor(Math.random() * 3) - 1,
        avgAttention: Math.max(70, Math.min(95, prev.avgAttention + (Math.random() - 0.5) * 2)),
        avgEngagement: Math.max(65, Math.min(90, prev.avgEngagement + (Math.random() - 0.5) * 1.5)),
        alertsCount: Math.max(0, prev.alertsCount + Math.floor(Math.random() * 2) - 1),
        improvementTrend: prev.improvementTrend + (Math.random() - 0.5) * 0.5,
      }))
      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  const alerts = [
    { student: "STU045", issue: "Attention drop detected", severity: "medium", time: "2 min ago" },
    { student: "STU023", issue: "Extended disengagement", severity: "high", time: "5 min ago" },
    { student: "STU078", issue: "Focus pattern change", severity: "low", time: "8 min ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  ← Back
                </Button>
              </Link>
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-balance">Real-Time Analytics</h1>
                <p className="text-sm text-muted-foreground">Live cognitive performance monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={isLive ? "default" : "secondary"} className="gap-1">
                <div className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
                {isLive ? "Live" : "Paused"}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setIsLive(!isLive)} className="gap-2">
                {isLive ? "Pause" : "Resume"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Live Metrics */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold">{metrics.activeStudents}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Attention</p>
                  <p className="text-2xl font-bold">{metrics.avgAttention.toFixed(1)}%</p>
                </div>
                <Brain className="h-8 w-8 text-chart-1" />
              </div>
              <Progress value={metrics.avgAttention} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Engagement</p>
                  <p className="text-2xl font-bold">{metrics.avgEngagement.toFixed(1)}%</p>
                </div>
                <Zap className="h-8 w-8 text-chart-2" />
              </div>
              <Progress value={metrics.avgEngagement} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-3">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Improvement</p>
                  <p className="text-2xl font-bold">+{metrics.improvementTrend.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Alerts and Notifications */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Live Alerts ({metrics.alertsCount})
              </CardTitle>
              <CardDescription>Real-time notifications about student cognitive states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.slice(0, metrics.alertsCount).map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="capitalize"
                      >
                        {alert.severity}
                      </Badge>
                      <div>
                        <p className="font-medium">{alert.student}</p>
                        <p className="text-sm text-muted-foreground">{alert.issue}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
                {metrics.alertsCount === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No active alerts - all students performing well!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* AI Insights */}
        <section>
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Live Insights
              </CardTitle>
              <CardDescription>Real-time AI analysis of classroom cognitive patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-lg">
                  <h4 className="font-medium mb-2">Pattern Detection</h4>
                  <p className="text-sm text-muted-foreground">
                    AI detected increased attention during visual content presentation (+12% avg)
                  </p>
                </div>
                <div className="p-4 bg-card rounded-lg">
                  <h4 className="font-medium mb-2">Recommendation</h4>
                  <p className="text-sm text-muted-foreground">
                    Suggest 5-minute break in 8 minutes based on engagement patterns
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Status Footer */}
        <div className="text-center text-sm text-muted-foreground">
          Last updated: {lastUpdate.toLocaleTimeString()} •
          <Button variant="ghost" size="sm" className="h-auto p-1 ml-1">
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </main>
    </div>
  )
}
