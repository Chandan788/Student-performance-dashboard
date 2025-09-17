"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts"
import { useEffect, useState } from "react"

const mockPersonaData = [
  {
    skill: "Comprehension",
    "Balanced Achievers": 78,
    "High-Potential Strugglers": 65,
    "Attention-Focused Learners": 72,
    "Comprehensive Thinkers": 85,
  },
  {
    skill: "Attention",
    "Balanced Achievers": 75,
    "High-Potential Strugglers": 58,
    "Attention-Focused Learners": 82,
    "Comprehensive Thinkers": 70,
  },
  {
    skill: "Focus",
    "Balanced Achievers": 73,
    "High-Potential Strugglers": 62,
    "Attention-Focused Learners": 79,
    "Comprehensive Thinkers": 74,
  },
  {
    skill: "Retention",
    "Balanced Achievers": 80,
    "High-Potential Strugglers": 68,
    "Attention-Focused Learners": 75,
    "Comprehensive Thinkers": 88,
  },
]

export function LearningPersonasRadar() {
  const [data, setData] = useState<typeof mockPersonaData>([])

  useEffect(() => {
    setData(mockPersonaData)
  }, [])

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          <PolarGrid className="opacity-30" />
          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }} />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickCount={5}
          />
          <Radar
            name="Balanced Achievers"
            dataKey="Balanced Achievers"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Radar
            name="High-Potential Strugglers"
            dataKey="High-Potential Strugglers"
            stroke="hsl(var(--chart-2))"
            fill="hsl(var(--chart-2))"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Radar
            name="Attention-Focused Learners"
            dataKey="Attention-Focused Learners"
            stroke="hsl(var(--chart-3))"
            fill="hsl(var(--chart-3))"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Radar
            name="Comprehensive Thinkers"
            dataKey="Comprehensive Thinkers"
            stroke="hsl(var(--chart-4))"
            fill="hsl(var(--chart-4))"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} iconType="line" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
