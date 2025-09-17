"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Lightbulb, Target, Users } from "lucide-react"

const personaRecommendations = [
  {
    persona: "Balanced Achievers",
    icon: Users,
    color: "chart-1",
    strategies: [
      {
        category: "Instructional Approach",
        recommendations: [
          "Provide varied learning modalities to maintain engagement",
          "Offer leadership opportunities in group projects",
          "Implement peer tutoring programs where they can mentor others",
        ],
      },
      {
        category: "Assessment Methods",
        recommendations: [
          "Use diverse assessment formats (projects, presentations, tests)",
          "Provide opportunities for self-assessment and reflection",
          "Implement portfolio-based evaluation systems",
        ],
      },
      {
        category: "Enrichment Activities",
        recommendations: [
          "Offer advanced problem-solving challenges",
          "Encourage participation in academic competitions",
          "Provide independent research opportunities",
        ],
      },
    ],
  },
  {
    persona: "High-Potential Strugglers",
    icon: Target,
    color: "chart-2",
    strategies: [
      {
        category: "Support Strategies",
        recommendations: [
          "Break complex tasks into smaller, manageable steps",
          "Provide frequent check-ins and progress monitoring",
          "Use visual aids and graphic organizers",
        ],
      },
      {
        category: "Attention Building",
        recommendations: [
          "Implement mindfulness and focus exercises",
          "Use timer-based activities (Pomodoro technique)",
          "Create distraction-free learning environments",
        ],
      },
      {
        category: "Motivation Techniques",
        recommendations: [
          "Celebrate small wins and progress milestones",
          "Connect learning to student interests and goals",
          "Provide choice in learning activities when possible",
        ],
      },
    ],
  },
  {
    persona: "Attention-Focused Learners",
    icon: BookOpen,
    color: "chart-3",
    strategies: [
      {
        category: "Leveraging Strengths",
        recommendations: [
          "Use sustained practice sessions for skill building",
          "Implement detailed, step-by-step instruction methods",
          "Provide clear expectations and structured routines",
        ],
      },
      {
        category: "Comprehension Development",
        recommendations: [
          "Use graphic organizers to support understanding",
          "Implement think-aloud strategies during instruction",
          "Provide multiple examples and non-examples",
        ],
      },
      {
        category: "Skill Building",
        recommendations: [
          "Gradually increase complexity of tasks",
          "Use scaffolded instruction approaches",
          "Provide immediate feedback on comprehension tasks",
        ],
      },
    ],
  },
  {
    persona: "Comprehensive Thinkers",
    icon: Lightbulb,
    color: "chart-4",
    strategies: [
      {
        category: "Advanced Challenges",
        recommendations: [
          "Provide complex, multi-step problem-solving tasks",
          "Encourage critical analysis and evaluation activities",
          "Offer opportunities for original research and investigation",
        ],
      },
      {
        category: "Attention Enhancement",
        recommendations: [
          "Use engaging, thought-provoking content",
          "Implement interactive discussion formats",
          "Provide variety in presentation methods",
        ],
      },
      {
        category: "Extension Activities",
        recommendations: [
          "Encourage cross-curricular connections",
          "Provide mentorship opportunities with experts",
          "Support independent learning projects",
        ],
      },
    ],
  },
]

export function PersonaRecommendations() {
  return (
    <div className="space-y-6">
      {personaRecommendations.map((persona, index) => {
        const IconComponent = persona.icon
        return (
          <Card key={index} className={`border-l-4 border-l-${persona.color}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconComponent className={`h-5 w-5 text-${persona.color}`} />
                {persona.persona}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {persona.strategies.map((strategy, strategyIndex) => (
                  <div key={strategyIndex}>
                    <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${persona.color}`}></div>
                      {strategy.category}
                    </h4>
                    <div className="space-y-2">
                      {strategy.recommendations.map((rec, recIndex) => (
                        <div key={recIndex} className="text-sm p-2 rounded bg-muted/50 border-l-2 border-l-primary/20">
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
