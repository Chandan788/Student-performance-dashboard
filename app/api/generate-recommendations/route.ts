import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { studentProfile, focusArea } = await request.json()

    if (!studentProfile) {
      return NextResponse.json({ error: "Student profile is required" }, { status: 400 })
    }

    let prompt = ""

    switch (focusArea) {
      case "study_strategies":
        prompt = `
As an educational AI specialist, create 3-4 specific study strategies for this student:

Student Profile:
- Cognitive Skills: Comprehension ${studentProfile.comprehension}%, Attention ${studentProfile.attention}%, Focus ${studentProfile.focus}%, Retention ${studentProfile.retention}%
- Learning Style: ${studentProfile.learning_style}
- Preferred Subject: ${studentProfile.preferred_subject}
- Daily Engagement: ${studentProfile.engagement_time} minutes
- Strengths: ${studentProfile.strengths?.join(", ")}
- Improvement Areas: ${studentProfile.improvement_areas?.join(", ")}

For each strategy, provide:
1. Strategy name
2. Detailed description (2-3 sentences)
3. Priority level (High/Medium/Low)
4. Implementation timeframe
5. Expected outcomes

Focus on practical, actionable strategies that match their learning style and cognitive profile.
`
        break

      case "improvement_plan":
        prompt = `
Create a detailed improvement plan for this student's weaker cognitive areas:

Student Profile:
- Current Scores: Comprehension ${studentProfile.comprehension}%, Attention ${studentProfile.attention}%, Focus ${studentProfile.focus}%, Retention ${studentProfile.retention}%
- Assessment Score: ${studentProfile.assessment_score}%
- Improvement Areas: ${studentProfile.improvement_areas?.join(", ")}
- Learning Style: ${studentProfile.learning_style}

For each improvement area, provide:
1. Current score and realistic target score
2. Specific techniques and exercises
3. Timeline for improvement
4. Milestones to track progress
5. Resources or tools to use

Make the plan specific, measurable, and achievable.
`
        break

      case "personalized_tips":
        prompt = `
Generate 4-5 personalized learning tips for this student:

Student Profile:
- Name: ${studentProfile.name}
- Class: ${studentProfile.class}
- Assessment Score: ${studentProfile.assessment_score}%
- Attendance: ${studentProfile.attendance_rate}%
- Study Hours/Week: ${studentProfile.study_hours_per_week}
- Preferred Subject: ${studentProfile.preferred_subject}
- Learning Style: ${studentProfile.learning_style}
- Strengths: ${studentProfile.strengths?.join(", ")}

Provide practical, encouraging tips that:
1. Leverage their strengths
2. Address their specific situation
3. Are motivational and positive
4. Include specific actions they can take
5. Connect to their interests and preferences

Make each tip personal and actionable.
`
        break

      default:
        prompt = `
Provide comprehensive educational recommendations for this student:

Student Profile: ${JSON.stringify(studentProfile, null, 2)}

Include study strategies, improvement suggestions, and personalized tips.
`
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      maxTokens: 1200,
      temperature: 0.7,
    })

    return NextResponse.json({
      recommendations: text,
      focusArea,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
