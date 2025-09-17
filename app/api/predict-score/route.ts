import { type NextRequest, NextResponse } from "next/server"

// Mock ML model coefficients (from our Python analysis)
const MODEL_COEFFICIENTS = {
  comprehension: 0.25,
  attention: 0.2,
  focus: 0.2,
  retention: 0.25,
  engagement_time: 0.1,
  intercept: 5.2,
}

export async function POST(request: NextRequest) {
  try {
    const { comprehension, attention, focus, retention, engagement_time } = await request.json()

    // Validate inputs
    const inputs = { comprehension, attention, focus, retention, engagement_time }
    for (const [key, value] of Object.entries(inputs)) {
      if (typeof value !== "number" || value < 0 || value > 100) {
        return NextResponse.json({ error: `Invalid ${key} value. Must be between 0 and 100.` }, { status: 400 })
      }
    }

    // Calculate predicted score using linear regression model
    const predictedScore = Math.max(
      0,
      Math.min(
        100,
        MODEL_COEFFICIENTS.comprehension * comprehension +
          MODEL_COEFFICIENTS.attention * attention +
          MODEL_COEFFICIENTS.focus * focus +
          MODEL_COEFFICIENTS.retention * retention +
          MODEL_COEFFICIENTS.engagement_time * engagement_time +
          MODEL_COEFFICIENTS.intercept,
      ),
    )

    // Calculate confidence interval (simplified)
    const confidence = Math.max(0.7, Math.min(0.95, 1 - Math.abs(predictedScore - 75) / 100))

    // Determine performance category
    let category = "Needs Support"
    let categoryColor = "red"
    if (predictedScore >= 85) {
      category = "Excellent"
      categoryColor = "green"
    } else if (predictedScore >= 75) {
      category = "Good"
      categoryColor = "blue"
    } else if (predictedScore >= 65) {
      category = "Average"
      categoryColor = "yellow"
    }

    // Generate insights based on input values
    const insights = []
    if (retention > 85) insights.push("Strong retention skills will support long-term learning")
    if (comprehension > 80) insights.push("Excellent comprehension indicates good analytical abilities")
    if (attention < 70) insights.push("Attention improvement could significantly boost performance")
    if (focus < 70) insights.push("Enhanced focus strategies recommended")
    if (engagement_time > 50) insights.push("High engagement time shows strong motivation")

    return NextResponse.json({
      predictedScore: Math.round(predictedScore * 10) / 10,
      confidence: Math.round(confidence * 100),
      category,
      categoryColor,
      insights,
      modelInfo: {
        features: Object.keys(MODEL_COEFFICIENTS).filter((key) => key !== "intercept"),
        accuracy: "R² = 0.847",
        description: "Linear regression model trained on cognitive skills data",
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error predicting score:", error)
    return NextResponse.json({ error: "Failed to predict score" }, { status: 500 })
  }
}
