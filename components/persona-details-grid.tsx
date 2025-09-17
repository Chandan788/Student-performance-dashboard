"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, AlertCircle } from "lucide-react"

const detailedPersonas = [
  {
    name: "Balanced Achievers",
    students: 56,
    cognitiveProfile: {
      comprehension: 78,
      attention: 75,
      focus: 73,
      retention: 80,
    },
    strengths: ["Consistent performance", "Strong retention", "Balanced skills"],
    challenges: ["May lack specialization", "Could benefit from advanced challenges"],
    recommendations: [
      "Provide advanced problem-solving tasks",
      "Encourage leadership roles in group work",
      "Offer enrichment activities",
    ],
    teachingStrategies: ["Varied learning approaches", "Peer mentoring opportunities", "Independent projects"],
  },
  {
    name: "High-Potential Strugglers",
    students: 46,
    cognitiveProfile: {
      comprehension: 65,
      attention: 58,
      focus: 62,
      retention: 68,
    },
    strengths: ["High potential", "Creative thinking", "Problem-solving ability"],
    challenges: ["Inconsistent attention", "Variable performance", "Needs structured support"],
    recommendations: [
      "Implement attention-building exercises",
      "Provide consistent structure and routine",
      "Use multi-sensory learning approaches",
    ],
    teachingStrategies: ["Frequent check-ins", "Break tasks into smaller steps", "Positive reinforcement"],
  },
  {
    name: "Attention-Focused Learners",
    students: 52,
    cognitiveProfile: {
      comprehension: 72,
      attention: 82,
      focus: 79,
      retention: 75,
    },
    strengths: ["Excellent attention span", "Strong focus abilities", "Good task persistence"],
    challenges: ["Developing comprehension skills", "May struggle with complex concepts"],
    recommendations: [
      "Build on attention strengths for comprehension",
      "Use focused practice sessions",
      "Gradually increase complexity",
    ],
    teachingStrategies: ["Sustained practice sessions", "Clear instructions", "Step-by-step guidance"],
  },
  {
    name: "Comprehensive Thinkers",
    students: 46,
    cognitiveProfile: {
      comprehension: 85,
      attention: 70,
      focus: 74,
      retention: 88,
    },
    strengths: ["Exceptional comprehension", "Strong analytical skills", "Excellent memory"],
    challenges: ["May lose attention in routine tasks", "Could benefit from attention training"],
    recommendations: [
      "Provide complex, engaging material",
      "Use attention-focusing techniques",
      "Encourage deep analysis projects",
    ],
    teachingStrategies: ["In-depth discussions", "Research projects", "Critical thinking exercises"],
  },
]

export function PersonaDetailsGrid() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {detailedPersonas.map((persona, index) => (
        <Card key={index} className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{persona.name}</span>
              <Badge variant="outline">{persona.students} students</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Cognitive Profile */}
            <div>
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-chart-1" />
                Cognitive Profile
              </h4>
              <div className="space-y-2">
                {Object.entries(persona.cognitiveProfile).map(([skill, score]) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{skill}</span>
                    <div className="flex items-center gap-2 w-24">
                      <Progress value={score} className="h-2 flex-1" />
                      <span className="text-xs font-medium w-8">{score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths and Challenges */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Strengths
                </h4>
                <div className="space-y-1">
                  {persona.strengths.map((strength, idx) => (
                    <div key={idx} className="text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  Growth Areas
                </h4>
                <div className="space-y-1">
                  {persona.challenges.map((challenge, idx) => (
                    <div key={idx} className="text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0"></div>
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Teaching Strategies */}
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-chart-2" />
                Recommended Strategies
              </h4>
              <div className="flex flex-wrap gap-2">
                {persona.teachingStrategies.map((strategy, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {strategy}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
