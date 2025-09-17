import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, ArrowLeft, Calculator, TrendingUp } from "lucide-react"
import Link from "next/link"
import { PredictiveScoreForm } from "@/components/predictive-score-form"
import { ScorePredictionResults } from "@/components/score-prediction-results"

export default function PredictiveScoringPage() {
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
                  <Calculator className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-balance">Predictive Scoring</h1>
                  <p className="text-sm text-muted-foreground">AI-Powered Assessment Score Prediction</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Brain className="h-3 w-3" />
              ML Model
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
                <TrendingUp className="h-5 w-5 text-primary" />
                Assessment Score Prediction
              </CardTitle>
              <CardDescription>
                Use our machine learning model to predict assessment scores based on cognitive skills and engagement
                metrics. This tool helps educators understand potential outcomes and identify areas for intervention.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                  <span>Model Accuracy: R² = 0.847</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                  <span>Features: 5 cognitive metrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                  <span>Training Data: 200+ students</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Prediction Form */}
        <section className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Input Cognitive Skills
              </CardTitle>
              <CardDescription>
                Enter hypothetical or actual cognitive skill scores to predict assessment performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PredictiveScoreForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-chart-1" />
                Prediction Results
              </CardTitle>
              <CardDescription>AI-generated assessment score prediction and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <ScorePredictionResults />
            </CardContent>
          </Card>
        </section>

        {/* Model Information */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Model Information
              </CardTitle>
              <CardDescription>Understanding the predictive model and its capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Feature Importance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Comprehension</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div className="w-1/4 h-2 bg-chart-1 rounded-full"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Retention</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div className="w-1/4 h-2 bg-chart-2 rounded-full"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Attention</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div className="w-1/5 h-2 bg-chart-3 rounded-full"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">20%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Focus</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div className="w-1/5 h-2 bg-chart-4 rounded-full"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">20%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Engagement Time</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div className="w-2 h-2 bg-chart-5 rounded-full"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">10%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Model Performance</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">R-squared Score:</span>
                      <span className="font-medium">0.847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mean Absolute Error:</span>
                      <span className="font-medium">4.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Training Samples:</span>
                      <span className="font-medium">200 students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Model Type:</span>
                      <span className="font-medium">Linear Regression</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
