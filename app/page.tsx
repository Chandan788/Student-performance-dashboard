import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Users, TrendingUp, BookOpen, Target, BarChart3, PieChart } from "@/components/simple-icons"
import Link from "next/link"
import { OverviewStats } from "@/components/overview-stats"
import { ClassPerformanceChart } from "@/components/class-performance-chart"
import { AttentionScatterPlot } from "@/components/attention-scatter-plot"
import { LearningPersonasRadar } from "@/components/learning-personas-radar"
import { StudentTable } from "@/components/student-table"
import { KeyInsights } from "@/components/key-insights"
import { NavigationMenu } from "@/components/navigation-menu"

export default function HomePage() {
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
                  <h1 className="text-2xl font-bold text-balance text-foreground">Cognitive Skills Dashboard</h1>
                  <p className="text-sm text-muted-foreground">AI-Powered Student Performance Analytics</p>
                </div>
              </div>
              <NavigationMenu />
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                <Users className="h-3 w-3" />
                200 Students
              </Badge>
              <Link href="/ai-chat">
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                >
                  <Brain className="h-4 w-4" />
                  AI Assistant
                </Button>
              </Link>
              <Link href="/student-analysis">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent hover:bg-primary/5 text-foreground">
                  <Target className="h-4 w-4" />
                  Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-balance">Performance Overview</h2>
            </div>
            <Badge variant="outline" className="text-xs">
              Real-time Analytics
            </Badge>
          </div>
          <OverviewStats />
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-chart-1" />
                Class Performance Analysis
              </CardTitle>
              <CardDescription>Average assessment scores across different classes</CardDescription>
            </CardHeader>
            <CardContent>
              <ClassPerformanceChart />
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-chart-2" />
                Attention vs Performance
              </CardTitle>
              <CardDescription>Relationship between attention scores and assessment performance</CardDescription>
            </CardHeader>
            <CardContent>
              <AttentionScatterPlot />
            </CardContent>
          </Card>
        </section>

        {/* Learning Personas and Insights */}
        <section className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-chart-3" />
                Learning Personas Analysis
              </CardTitle>
              <CardDescription>AI-identified learning patterns and cognitive skill profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <LearningPersonasRadar />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-chart-4" />
                Key Insights
              </CardTitle>
              <CardDescription>AI-generated findings from cognitive analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <KeyInsights />
            </CardContent>
          </Card>
        </section>

        {/* Student Data Table */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Student Performance Data
              </CardTitle>
              <CardDescription>
                Comprehensive view of all students with cognitive skills and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StudentTable />
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                AI-Powered Features
              </CardTitle>
              <CardDescription>Explore advanced analytics and personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/student-analysis">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col gap-2 bg-transparent hover:bg-primary/10 transition-all hover:scale-105 border-primary/20 text-foreground"
                  >
                    <Brain className="h-6 w-6 text-primary" />
                    <span className="font-medium">Student Analysis</span>
                    <span className="text-xs text-muted-foreground text-center">
                      Get AI insights for individual students
                    </span>
                  </Button>
                </Link>
                <Link href="/predictive-scoring">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col gap-2 bg-transparent hover:bg-primary/10 transition-all hover:scale-105 border-primary/20 text-foreground"
                  >
                    <TrendingUp className="h-6 w-6 text-chart-2" />
                    <span className="font-medium">Predictive Scoring</span>
                    <span className="text-xs text-muted-foreground text-center">Simulate assessment outcomes</span>
                  </Button>
                </Link>
                <Link href="/learning-personas">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col gap-2 bg-transparent hover:bg-primary/10 transition-all hover:scale-105 border-primary/20 text-foreground"
                  >
                    <PieChart className="h-6 w-6 text-chart-3" />
                    <span className="font-medium">Learning Personas</span>
                    <span className="text-xs text-muted-foreground text-center">
                      Discover student learning patterns
                    </span>
                  </Button>
                </Link>
                <Link href="/ai-chat">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col gap-2 bg-transparent hover:bg-primary/10 transition-all hover:scale-105 border-primary/20 text-foreground"
                  >
                    <Brain className="h-6 w-6 text-primary" />
                    <span className="font-medium">AI Assistant</span>
                    <span className="text-xs text-muted-foreground text-center">Chat with AI about student data</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
