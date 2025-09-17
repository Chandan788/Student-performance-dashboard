import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, ArrowLeft, Users, Target, BookOpen } from "lucide-react"
import Link from "next/link"
import { LearningPersonasOverview } from "@/components/learning-personas-overview"
import { PersonaDetailsGrid } from "@/components/persona-details-grid"
import { PersonaRecommendations } from "@/components/persona-recommendations"

export default function LearningPersonasPage() {
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
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-balance">Learning Personas</h1>
                  <p className="text-sm text-muted-foreground">AI-Identified Student Learning Patterns</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Brain className="h-3 w-3" />
              K-Means Clustering
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <section>
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Learning Personas Analysis
              </CardTitle>
              <CardDescription>
                Our AI system has identified distinct learning patterns among students using advanced clustering
                algorithms. Each persona represents a unique combination of cognitive strengths and learning
                characteristics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-primary">4</div>
                  <div className="text-muted-foreground">Personas Identified</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-chart-1">200</div>
                  <div className="text-muted-foreground">Students Analyzed</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-chart-2">85%</div>
                  <div className="text-muted-foreground">Classification Accuracy</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-chart-3">4</div>
                  <div className="text-muted-foreground">Cognitive Dimensions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Personas Overview */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-balance">Persona Distribution</h2>
          </div>
          <LearningPersonasOverview />
        </section>

        {/* Detailed Persona Analysis */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-balance">Detailed Persona Profiles</h2>
          </div>
          <PersonaDetailsGrid />
        </section>

        {/* Persona-Based Recommendations */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-balance">Teaching Strategies by Persona</h2>
          </div>
          <PersonaRecommendations />
        </section>
      </main>
    </div>
  )
}
