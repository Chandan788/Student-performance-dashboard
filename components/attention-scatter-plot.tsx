"use client"

import { Scatter, ScatterChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useEffect, useState } from "react"

// Mock data representing attention vs assessment score relationship
const generateScatterData = () => {
  const data = []
  for (let i = 0; i < 50; i++) {
    const attention = Math.random() * 40 + 50 // 50-90 range
    const assessmentScore = attention * 0.8 + Math.random() * 15 + 10 // Correlated with some noise
    data.push({
      attention: Math.round(attention * 10) / 10,
      assessmentScore: Math.round(assessmentScore * 10) / 10,
      studentId: `STU${String(i + 1).padStart(3, "0")}`,
    })
  }
  return data
}

export function AttentionScatterPlot() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(generateScatterData())
  }, [])

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="attention"
            type="number"
            domain={[45, 95]}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "hsl(var(--border))" }}
            name="Attention Score"
          />
          <YAxis
            dataKey="assessmentScore"
            type="number"
            domain={[50, 100]}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "hsl(var(--border))" }}
            name="Assessment Score"
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-card border rounded-lg p-3 shadow-lg">
                    <p className="font-medium">{data.studentId}</p>
                    <p className="text-sm text-muted-foreground">
                      Attention: <span className="font-medium text-foreground">{data.attention}%</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Assessment: <span className="font-medium text-foreground">{data.assessmentScore}%</span>
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Scatter dataKey="assessmentScore" fill="hsl(var(--chart-2))" fillOpacity={0.7} r={4} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
