"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Target, TrendingUp } from "lucide-react"

// Mock persona data - in real app, this would be determined by ML clustering
const mockPersona = {
  id: 0,
  name: "Balanced Achievers",
  description:
    "Students who demonstrate consistent performance across all cognitive skills with strong retention abilities.",
  characteristics: [
    "Strong overall cognitive balance",
    "Excellent retention capabilities",
    "Consistent engagement patterns",
    "Responds well to varied learning approaches",
  ],
  strengths: ["Retention", "Comprehension"],
  challenges: ["Attention span during long sessions"],
  percentage: 28,
  studentCount: 56,
  averageScore: 82.4,
}

export function LearningPersonaCard() {
  return (
    <div className="space-y-4">
      {/* Persona Header */}
      <div className="text-center p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-lg">{mockPersona.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{mockPersona.description}</p>
        <div className="flex justify-center gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-primary">{mockPersona.percentage}%</div>
            <div className="text-muted-foreground">of students</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-primary">{mockPersona.averageScore}%</div>
            <div className="text-muted-foreground">avg score</div>
          </div>
        </div>
      </div>

      {/* Characteristics */}
      <div>
        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-chart-1" />
          Key Characteristics
        </h4>
        <ul className="space-y-2">
          {mockPersona.characteristics.map((characteristic, index) => (
            <li key={index} className="text-sm flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              <span>{characteristic}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Strengths and Challenges */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            Primary Strengths
          </h4>
          <div className="flex flex-wrap gap-2">
            {mockPersona.strengths.map((strength) => (
              <Badge key={strength} variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">
                {strength}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-orange-600" />
            Growth Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {mockPersona.challenges.map((challenge) => (
              <Badge key={challenge} variant="outline" className="border-orange-200 text-orange-700">
                {challenge}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Persona Distribution */}
      <div className="p-3 rounded-lg bg-muted/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Persona Distribution</span>
          <span className="text-sm text-muted-foreground">{mockPersona.studentCount} students</span>
        </div>
        <Progress value={mockPersona.percentage} className="h-2" />
      </div>
    </div>
  )
}
