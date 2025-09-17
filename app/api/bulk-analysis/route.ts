import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const mockStudentDatabase = {
  "9A": [
    {
      student_id: "STU004",
      name: "Noah Davis",
      comprehension: 68.5,
      attention: 62.3,
      focus: 65.8,
      retention: 70.2,
      assessment_score: 66.7,
    },
    {
      student_id: "STU011",
      name: "Zoe Anderson",
      comprehension: 74.2,
      attention: 69.8,
      focus: 72.1,
      retention: 76.5,
      assessment_score: 73.2,
    },
  ],
  "9B": [
    {
      student_id: "STU008",
      name: "Mason Rodriguez",
      comprehension: 64.2,
      attention: 58.7,
      focus: 61.9,
      retention: 67.5,
      assessment_score: 63.4,
    },
  ],
  "10A": [
    {
      student_id: "STU001",
      name: "Emma Johnson",
      comprehension: 85.2,
      attention: 78.1,
      focus: 82.3,
      retention: 88.7,
      assessment_score: 84.5,
    },
    {
      student_id: "STU002",
      name: "Liam Smith",
      comprehension: 72.8,
      attention: 65.4,
      focus: 69.2,
      retention: 75.1,
      assessment_score: 71.2,
    },
  ],
  "10B": [
    {
      student_id: "STU010",
      name: "Jacob Thompson",
      comprehension: 77.9,
      attention: 73.2,
      focus: 75.6,
      retention: 81.4,
      assessment_score: 77.8,
    },
  ],
  "10C": [
    {
      student_id: "STU006",
      name: "Ethan Garcia",
      comprehension: 76.4,
      attention: 71.8,
      focus: 74.2,
      retention: 79.3,
      assessment_score: 75.8,
    },
  ],
  "11A": [
    {
      student_id: "STU007",
      name: "Sophia Martinez",
      comprehension: 83.9,
      attention: 79.5,
      focus: 81.7,
      retention: 86.4,
      assessment_score: 83.1,
    },
    {
      student_id: "STU009",
      name: "Isabella Chen",
      comprehension: 89.4,
      attention: 82.6,
      focus: 85.8,
      retention: 90.3,
      assessment_score: 87.2,
    },
  ],
  "11B": [
    {
      student_id: "STU003",
      name: "Olivia Brown",
      comprehension: 91.3,
      attention: 87.9,
      focus: 89.1,
      retention: 93.2,
      assessment_score: 90.8,
    },
  ],
  "12A": [
    {
      student_id: "STU005",
      name: "Ava Wilson",
      comprehension: 88.7,
      attention: 85.2,
      focus: 87.4,
      retention: 91.1,
      assessment_score: 88.9,
    },
  ],
}

export async function POST(request: NextRequest) {
  try {
    const { selectedClass, analysisType } = await request.json()

    // Get students based on class selection
    let studentsToAnalyze: any[] = []
    if (selectedClass === "all") {
      studentsToAnalyze = Object.values(mockStudentDatabase).flat()
    } else {
      studentsToAnalyze = mockStudentDatabase[selectedClass as keyof typeof mockStudentDatabase] || []
    }

    const bulkAnalysisPrompt = `
You are an advanced educational AI analyzing ${studentsToAnalyze.length} students from ${selectedClass === "all" ? "multiple classes" : `class ${selectedClass}`}.

Student Data:
${studentsToAnalyze.map((s) => `${s.name} (${s.student_id}): Comprehension ${s.comprehension}%, Attention ${s.attention}%, Focus ${s.focus}%, Retention ${s.retention}%, Assessment ${s.assessment_score}%`).join("\n")}

Analysis Type: ${analysisType}

Provide a comprehensive analysis including:

1. PERFORMANCE OVERVIEW:
   - Identify top 3 performers with specific strengths
   - Identify 3 students needing most support with specific challenges
   - Overall class performance trends

2. COGNITIVE PATTERNS:
   - Identify 4-5 distinct cognitive patterns across students
   - Calculate percentage of students in each pattern
   - Describe characteristics of each pattern

3. CLASS-LEVEL INSIGHTS:
   - Average performance by cognitive skill
   - Correlation patterns between skills
   - Areas where the class excels vs struggles

4. ACTIONABLE RECOMMENDATIONS:
   - 3-4 class-wide teaching strategies
   - Specific interventions for struggling students
   - Ways to leverage high performers as peer mentors

Format your response as structured data that can be easily parsed.
`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: bulkAnalysisPrompt,
      maxTokens: 2000,
      temperature: 0.6,
    })

    const results = {
      totalStudents: studentsToAnalyze.length,
      analysisComplete: studentsToAnalyze.length,
      insights: {
        topPerformers: studentsToAnalyze
          .sort((a, b) => b.assessment_score - a.assessment_score)
          .slice(0, 3)
          .map((s) => ({ name: s.name, score: s.assessment_score })),
        strugglingStudents: studentsToAnalyze
          .sort((a, b) => a.assessment_score - b.assessment_score)
          .slice(0, 3)
          .map((s) => ({ name: s.name, score: s.assessment_score, recommendations: "Personalized support needed" })),
        classInsights:
          selectedClass === "all"
            ? Object.keys(mockStudentDatabase).map((cls) => {
                const classStudents = mockStudentDatabase[cls as keyof typeof mockStudentDatabase]
                const avgScore = classStudents.reduce((sum, s) => sum + s.assessment_score, 0) / classStudents.length
                return {
                  class: cls,
                  avgScore,
                  trend:
                    avgScore >= 80
                      ? "Excellent performance across cognitive skills"
                      : avgScore >= 70
                        ? "Good performance with room for improvement"
                        : "Needs focused intervention and support",
                }
              })
            : [
                {
                  class: selectedClass,
                  avgScore:
                    studentsToAnalyze.reduce((sum, s) => sum + s.assessment_score, 0) / studentsToAnalyze.length,
                  trend: "Detailed class analysis completed",
                },
              ],
        cognitivePatterns: [
          { pattern: "High Achievers", percentage: 25, description: "Strong across all cognitive skills" },
          {
            pattern: "Attention Focused",
            percentage: 30,
            description: "Excel in attention but need support in other areas",
          },
          {
            pattern: "Retention Specialists",
            percentage: 20,
            description: "Strong retention but variable in other skills",
          },
          {
            pattern: "Developing Learners",
            percentage: 25,
            description: "Consistent growth potential across all areas",
          },
        ],
      },
      recommendations: {
        classLevel: [
          "Implement differentiated instruction based on cognitive profiles",
          "Create peer mentoring pairs between high and developing performers",
          "Focus on attention-building exercises for 40% of students",
          "Develop retention strategies through spaced repetition techniques",
        ],
        individual: studentsToAnalyze.map((s) => ({
          studentId: s.student_id,
          recommendations: [
            `Focus on ${s.attention < 70 ? "attention building" : "maintaining attention skills"}`,
            `${s.retention > 80 ? "Leverage strong retention" : "Develop retention strategies"}`,
            `Personalized learning plan based on ${s.assessment_score >= 80 ? "advanced" : "foundational"} level`,
          ],
        })),
      },
      aiAnalysis: text,
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error in bulk analysis:", error)
    return NextResponse.json({ error: "Failed to complete bulk analysis" }, { status: 500 })
  }
}
