import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Mock student database - in real app, this would be a proper database
const mockStudentDatabase = {
  STU001: {
    student_id: "STU001",
    name: "Emma Johnson",
    class: "10A",
    age: 16,
    comprehension: 85.2,
    attention: 78.1,
    focus: 82.3,
    retention: 88.7,
    assessment_score: 84.5,
    engagement_time: 52.3,
    study_hours_per_week: 12.5,
    attendance_rate: 92.1,
    learning_style: "Visual",
    preferred_subject: "Mathematics",
    last_assessment_date: "2024-01-15",
    strengths: ["Retention", "Comprehension"],
    improvement_areas: ["Attention", "Focus"],
  },
  STU002: {
    student_id: "STU002",
    name: "Liam Smith",
    class: "10A",
    age: 16,
    comprehension: 72.8,
    attention: 65.4,
    focus: 69.2,
    retention: 75.1,
    assessment_score: 71.2,
    engagement_time: 43.7,
    study_hours_per_week: 8.3,
    attendance_rate: 85.4,
    learning_style: "Kinesthetic",
    preferred_subject: "Physical Education",
    last_assessment_date: "2024-01-14",
    strengths: ["Retention"],
    improvement_areas: ["Attention", "Focus", "Comprehension"],
  },
  STU003: {
    student_id: "STU003",
    name: "Olivia Brown",
    class: "11B",
    age: 17,
    comprehension: 91.3,
    attention: 87.9,
    focus: 89.1,
    retention: 93.2,
    assessment_score: 90.8,
    engagement_time: 58.9,
    study_hours_per_week: 15.2,
    attendance_rate: 96.7,
    learning_style: "Reading/Writing",
    preferred_subject: "Literature",
    last_assessment_date: "2024-01-16",
    strengths: ["Retention", "Comprehension", "Focus"],
    improvement_areas: ["Attention"],
  },
  STU004: {
    student_id: "STU004",
    name: "Noah Davis",
    class: "9A",
    age: 15,
    comprehension: 68.5,
    attention: 62.3,
    focus: 65.8,
    retention: 70.2,
    assessment_score: 66.7,
    engagement_time: 38.4,
    study_hours_per_week: 6.8,
    attendance_rate: 78.9,
    learning_style: "Auditory",
    preferred_subject: "Music",
    last_assessment_date: "2024-01-13",
    strengths: ["Retention"],
    improvement_areas: ["Attention", "Focus", "Comprehension"],
  },
  STU005: {
    student_id: "STU005",
    name: "Ava Wilson",
    class: "12A",
    age: 18,
    comprehension: 88.7,
    attention: 85.2,
    focus: 87.4,
    retention: 91.1,
    assessment_score: 88.9,
    engagement_time: 55.6,
    study_hours_per_week: 14.7,
    attendance_rate: 94.3,
    learning_style: "Visual",
    preferred_subject: "Science",
    last_assessment_date: "2024-01-17",
    strengths: ["Retention", "Comprehension"],
    improvement_areas: ["Attention"],
  },
}

export async function POST(request: NextRequest) {
  try {
    const { studentId } = await request.json()

    if (!studentId) {
      return NextResponse.json({ error: "Student ID is required" }, { status: 400 })
    }

    // Find student in mock database
    const student = mockStudentDatabase[studentId as keyof typeof mockStudentDatabase]

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    const openaiApiKey = process.env.OPENAI_API_KEY

    if (!openaiApiKey) {
      // Provide fallback analysis when API key is not available
      const fallbackAnalysis = generateFallbackAnalysis(student)
      const fallbackPersona = generateFallbackPersona(student)

      return NextResponse.json({
        student,
        analysis: fallbackAnalysis,
        personaAnalysis: fallbackPersona,
        timestamp: new Date().toISOString(),
        fallback: true,
        message: "Using fallback analysis. Configure OPENAI_API_KEY for AI-powered insights.",
      })
    }

    // Generate AI-powered analysis using OpenAI
    const analysisPrompt = `
You are an educational AI assistant specializing in cognitive skills analysis and personalized learning recommendations.

Analyze the following student profile and provide detailed insights:

Student Profile:
- Name: ${student.name}
- ID: ${student.student_id}
- Class: ${student.class}
- Age: ${student.age}
- Cognitive Skills:
  * Comprehension: ${student.comprehension}%
  * Attention: ${student.attention}%
  * Focus: ${student.focus}%
  * Retention: ${student.retention}%
- Assessment Score: ${student.assessment_score}%
- Daily Engagement: ${student.engagement_time} minutes
- Study Hours/Week: ${student.study_hours_per_week} hours
- Attendance Rate: ${student.attendance_rate}%
- Learning Style: ${student.learning_style}
- Preferred Subject: ${student.preferred_subject}
- Strengths: ${student.strengths.join(", ")}
- Improvement Areas: ${student.improvement_areas.join(", ")}

Please provide:
1. A comprehensive analysis of the student's cognitive profile
2. 3-4 specific, actionable study strategies tailored to their learning style and cognitive strengths
3. A detailed improvement plan for their weaker cognitive areas
4. Personalized tips based on their preferences and performance patterns
5. Learning persona classification and characteristics

Format your response as a structured analysis that would be helpful for educators and the student themselves.
`

    const { text } = await generateText({
      model: openai("gpt-4o-mini", {
        apiKey: openaiApiKey,
      }),
      prompt: analysisPrompt,
      maxTokens: 1500,
      temperature: 0.7,
    })

    // Generate learning persona classification
    const personaPrompt = `
Based on this student's cognitive profile, classify them into one of these learning personas and explain why:

1. Balanced Achievers - Consistent performance across all cognitive skills
2. High-Potential Strugglers - Strong in some areas but need support in others  
3. Attention-Focused Learners - Excel in attention/focus but may struggle with other areas
4. Comprehensive Thinkers - Strong comprehension and retention, analytical learners

Student: ${student.name}
Comprehension: ${student.comprehension}%, Attention: ${student.attention}%, Focus: ${student.focus}%, Retention: ${student.retention}%
Assessment Score: ${student.assessment_score}%

Provide:
1. The most appropriate persona classification
2. Why this classification fits
3. Typical characteristics of this persona
4. Specific recommendations for this persona type
`

    const { text: personaAnalysis } = await generateText({
      model: openai("gpt-4o-mini", {
        apiKey: openaiApiKey,
      }),
      prompt: personaPrompt,
      maxTokens: 800,
      temperature: 0.6,
    })

    return NextResponse.json({
      student,
      analysis: text,
      personaAnalysis,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error analyzing student:", error)

    if (error instanceof Error && error.message.includes("API key")) {
      const { studentId } = await request.json()
      const student = mockStudentDatabase[studentId as keyof typeof mockStudentDatabase]

      if (student) {
        const fallbackAnalysis = generateFallbackAnalysis(student)
        const fallbackPersona = generateFallbackPersona(student)

        return NextResponse.json({
          student,
          analysis: fallbackAnalysis,
          personaAnalysis: fallbackPersona,
          timestamp: new Date().toISOString(),
          fallback: true,
          message: "OpenAI API key not configured. Using fallback analysis.",
        })
      }
    }

    return NextResponse.json({ error: "Failed to analyze student" }, { status: 500 })
  }
}

function generateFallbackAnalysis(student: any): string {
  const avgScore = (student.comprehension + student.attention + student.focus + student.retention) / 4
  const performance =
    avgScore >= 85 ? "excellent" : avgScore >= 75 ? "good" : avgScore >= 65 ? "average" : "needs improvement"

  return `
**Cognitive Profile Analysis for ${student.name}**

**Overall Performance:** ${performance.toUpperCase()} (${avgScore.toFixed(1)}% average)

**Strengths:**
${student.strengths.map((strength: string) => `• ${strength}: ${student[strength.toLowerCase()]}%`).join("\n")}

**Areas for Improvement:**
${student.improvement_areas.map((area: string) => `• ${area}: ${student[area.toLowerCase()]}%`).join("\n")}

**Study Strategies:**
1. **${student.learning_style} Learning Focus:** Utilize ${student.learning_style.toLowerCase()} learning techniques to maximize comprehension
2. **Subject Integration:** Leverage interest in ${student.preferred_subject} to improve weaker areas
3. **Engagement Optimization:** Current ${student.engagement_time} minutes daily - consider extending to 60+ minutes
4. **Attendance Impact:** ${student.attendance_rate}% attendance rate ${student.attendance_rate >= 90 ? "is excellent" : "could be improved for better outcomes"}

**Recommendations:**
• Focus on strengthening ${student.improvement_areas[0].toLowerCase()} through targeted exercises
• Maintain current strengths in ${student.strengths[0].toLowerCase()}
• Consider ${student.study_hours_per_week < 10 ? "increasing" : "maintaining"} study hours per week

*Note: This is a rule-based analysis. For AI-powered insights, configure your OpenAI API key.*
`
}

function generateFallbackPersona(student: any): string {
  const scores = [student.comprehension, student.attention, student.focus, student.retention]
  const avgScore = scores.reduce((a, b) => a + b, 0) / 4
  const variance = scores.reduce((acc, score) => acc + Math.pow(score - avgScore, 2), 0) / 4

  let persona = ""
  let characteristics = ""

  if (variance < 25 && avgScore >= 80) {
    persona = "Balanced Achievers"
    characteristics = "Consistent high performance across all cognitive areas"
  } else if (variance > 50) {
    persona = "High-Potential Strugglers"
    characteristics = "Strong in some areas but needs targeted support in others"
  } else if (student.attention >= 80 || student.focus >= 80) {
    persona = "Attention-Focused Learners"
    characteristics = "Excel in attention and focus, good foundation for learning"
  } else if (student.comprehension >= 80 && student.retention >= 80) {
    persona = "Comprehensive Thinkers"
    characteristics = "Strong analytical and retention abilities"
  } else {
    persona = "Developing Learners"
    characteristics = "Building foundational cognitive skills with room for growth"
  }

  return `
**Learning Persona: ${persona}**

**Classification Rationale:**
Based on cognitive scores (Avg: ${avgScore.toFixed(1)}%, Variance: ${variance.toFixed(1)}), ${student.name} fits the ${persona} profile.

**Characteristics:**
${characteristics}

**Persona-Specific Recommendations:**
• Leverage ${student.learning_style.toLowerCase()} learning preferences
• Build on strength in ${student.preferred_subject}
• Focus improvement efforts on ${student.improvement_areas[0].toLowerCase()}
• Maintain current positive habits while addressing weaker areas

*Note: This is a rule-based classification. For detailed AI analysis, configure your OpenAI API key.*
`
}
