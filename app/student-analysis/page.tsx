import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, ArrowLeft, Target, TrendingUp, BookOpen, Clock } from "lucide-react"
import Link from "next/link"
import { StudentSearchForm } from "@/components/student-search-form"
import { StudentProfile } from "@/components/student-profile"
import { AIRecommendations } from "@/components/ai-recommendations"
import { CognitiveSkillsChart } from "@/components/cognitive-skills-chart"
import { LearningPersonaCard } from "@/components/learning-persona-card"

export default function StudentAnalysisPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-balance">Student Analysis</h1>
                  <p className="text-sm text-muted-foreground">AI-Powered Individual Student Insights</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Brain className="h-3 w-3" />
              AI Analysis
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Student Search Section */}
        <section>
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Student Lookup
              </CardTitle>
              <CardDescription>
                Enter a student ID to get comprehensive AI-powered analysis and personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StudentSearchForm />
            </CardContent>
          </Card>
        </section>

        {/* Student Profile and Analysis Results */}
        <div id="analysis-results" className="space-y-8">
          {/* Student Profile Overview */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-balance">Student Profile</h2>
            </div>
            <StudentProfile />
          </section>

          {/* Cognitive Skills Analysis */}
          <section className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-chart-1" />
                  Cognitive Skills Breakdown
                </CardTitle>
                <CardDescription>Detailed analysis of cognitive abilities and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <CognitiveSkillsChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-chart-2" />
                  Learning Persona
                </CardTitle>
                <CardDescription>AI-identified learning pattern and characteristics</CardDescription>
              </CardHeader>
              <CardContent>
                <LearningPersonaCard />
              </CardContent>
            </Card>
          </section>

          {/* AI Recommendations */}
          <section>
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>
                  Personalized study strategies and improvement suggestions based on cognitive profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIRecommendations />
              </CardContent>
            </Card>
          </section>

          {/* Quick Actions */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Next Steps
                </CardTitle>
                <CardDescription>Recommended actions based on analysis results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                    <Clock className="h-6 w-6 text-chart-1" />
                    <span className="font-medium">Schedule Check-in</span>
                    <span className="text-xs text-muted-foreground text-center">Set up progress monitoring</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                    <BookOpen className="h-6 w-6 text-chart-2" />
                    <span className="font-medium">Create Study Plan</span>
                    <span className="text-xs text-muted-foreground text-center">Generate personalized curriculum</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                    <Target className="h-6 w-6 text-chart-3" />
                    <span className="font-medium">Track Progress</span>
                    <span className="text-xs text-muted-foreground text-center">Monitor improvement over time</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
