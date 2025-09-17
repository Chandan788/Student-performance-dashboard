import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const mockStudentContext = {
  totalStudents: 200,
  classDistribution: {
    "9A": 25,
    "9B": 23,
    "10A": 28,
    "10B": 26,
    "10C": 24,
    "11A": 27,
    "11B": 25,
    "12A": 22,
  },
  averageScores: {
    comprehension: 78.4,
    attention: 72.8,
    focus: 75.6,
    retention: 81.2,
    assessment: 77.1,
  },
  learningPersonas: {
    "High Achievers": 25,
    "Attention Focused": 30,
    "Retention Specialists": 20,
    "Developing Learners": 25,
  },
  commonChallenges: [
    "40% of students struggle with sustained attention",
    "25% need support with comprehension strategies",
    "30% show inconsistent focus patterns",
    "15% require retention improvement techniques",
  ],
  topPerformers: [
    { name: "Olivia Brown", class: "11B", score: 90.8 },
    { name: "Ava Wilson", class: "12A", score: 88.9 },
    { name: "Isabella Chen", class: "11A", score: 87.2 },
  ],
  strugglingStudents: [
    { name: "Mason Rodriguez", class: "9B", score: 63.4 },
    { name: "Noah Davis", class: "9A", score: 66.7 },
    { name: "Liam Smith", class: "10A", score: 71.2 },
  ],
}

export async function POST(request: NextRequest) {
  try {
    const { message, messages } = await request.json()

    const systemPrompt = `You are an advanced AI assistant specialized in cognitive skills analysis and student performance for a school with ${mockStudentContext.totalStudents} students across grades 9-12.

CURRENT STUDENT DATA CONTEXT:
- Total Students: ${mockStudentContext.totalStudents}
- Class Distribution: ${Object.entries(mockStudentContext.classDistribution)
      .map(([cls, count]) => `${cls}: ${count} students`)
      .join(", ")}

AVERAGE COGNITIVE SCORES:
- Comprehension: ${mockStudentContext.averageScores.comprehension}%
- Attention: ${mockStudentContext.averageScores.attention}%
- Focus: ${mockStudentContext.averageScores.focus}%
- Retention: ${mockStudentContext.averageScores.retention}%
- Overall Assessment: ${mockStudentContext.averageScores.assessment}%

LEARNING PERSONA DISTRIBUTION:
${Object.entries(mockStudentContext.learningPersonas)
  .map(([persona, percentage]) => `- ${persona}: ${percentage}% of students`)
  .join("\n")}

KEY INSIGHTS:
${mockStudentContext.commonChallenges.map((challenge) => `- ${challenge}`).join("\n")}

TOP PERFORMERS:
${mockStudentContext.topPerformers.map((student) => `- ${student.name} (${student.class}): ${student.score}%`).join("\n")}

STUDENTS NEEDING SUPPORT:
${mockStudentContext.strugglingStudents.map((student) => `- ${student.name} (${student.class}): ${student.score}%`).join("\n")}

You can provide insights about:
1. Individual student analysis and recommendations
2. Class-wide performance patterns and trends
3. Cognitive skill development strategies
4. Learning intervention suggestions
5. Data interpretation and educational insights
6. Comparative analysis between classes or students
7. Predictive insights based on current performance

Always provide specific, actionable advice based on the actual data context. Reference specific students, classes, or statistics when relevant to make your responses more valuable and personalized.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: [
        ...messages.slice(-8), // Keep last 8 messages for better context
        { role: "user", content: message },
      ],
      maxTokens: 1000,
      temperature: 0.7,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("AI Chat error:", error)
    return NextResponse.json(
      { error: "Failed to generate response. Please make sure your OpenAI API key is configured." },
      { status: 500 },
    )
  }
}
