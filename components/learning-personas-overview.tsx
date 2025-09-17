"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, Brain, Target } from "lucide-react"

const personasData = [
  {
    id: 0,
    name: "Balanced Achievers",
    description: "Students with consistent performance across all cognitive skills",
    percentage: 28,
    studentCount: 56,
    averageScore: 82.4,
    color: "chart-1",
    icon: TrendingUp,
    characteristics: ["Well-rounded abilities", "Consistent performance", "Strong retention"],
  },
  {
    id: 1,
    name: "High-Potential Strugglers",
    description: "Students with strong potential but inconsistent performance",
    percentage: 23,
    studentCount: 46,
    averageScore: 68.7,
    color: "chart-2",
    icon: Target,
    characteristics: ["Variable performance", "High comprehension", "Attention challenges"],
  },
  {
    id: 2,
    name: "Attention-Focused Learners",
    description: "Students who excel in attention and focus but need support elsewhere",
    percentage: 26,
    studentCount: 52,
    averageScore: 75.3,
    color: "chart-3",
    icon: Brain,
    characteristics: ["Strong attention", "Good focus", "Developing comprehension"],
  },
  {
    id: 3,
    name: "Comprehensive Thinkers",
    description: "Students with exceptional comprehension and analytical skills",
    percentage: 23,
    studentCount: 46,
    averageScore: 87.1,
    color: "chart-4",
    icon: Users,
    characteristics: ["Excellent comprehension", "Strong retention", "Analytical thinking"],
  },
]

export function LearningPersonasOverview() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {personasData.map((persona) => {
        const IconComponent = persona.icon
        return (
          <Card key={persona.id} className={`border-l-4 border-l-${persona.color}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <IconComponent className={`h-5 w-5 text-${persona.color}`} />
                <Badge variant="outline" className="text-xs">
                  {persona.percentage}%
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{persona.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{persona.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Students:</span>
                  <span className="font-medium">{persona.studentCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Score:</span>
                  <span className="font-medium">{persona.averageScore}%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Distribution</span>
                  <span>{persona.percentage}%</span>
                </div>
                <Progress value={persona.percentage} className="h-2" />
              </div>

              <div>
                <h4 className="text-xs font-medium mb-2 text-muted-foreground">Key Traits:</h4>
                <div className="flex flex-wrap gap-1">
                  {persona.characteristics.map((trait, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
