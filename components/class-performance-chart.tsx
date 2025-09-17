"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useEffect, useState } from "react"

const mockClassData = [
  { class: "9A", avgScore: 72.3, students: 18 },
  { class: "9B", avgScore: 69.8, students: 16 },
  { class: "10A", avgScore: 75.1, students: 22 },
  { class: "10B", avgScore: 73.7, students: 24 },
  { class: "10C", avgScore: 76.2, students: 21 },
  { class: "11A", avgScore: 77.8, students: 19 },
  { class: "11B", avgScore: 74.9, students: 20 },
  { class: "11C", avgScore: 78.1, students: 18 },
  { class: "12A", avgScore: 81.2, students: 15 },
  { class: "12B", avgScore: 79.6, students: 17 },
]

export function ClassPerformanceChart() {
  const [data, setData] = useState<typeof mockClassData>([])

  useEffect(() => {
    setData(mockClassData)
  }, [])

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="class" tick={{ fontSize: 12 }} tickLine={{ stroke: "hsl(var(--border))" }} />
          <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: "hsl(var(--border))" }} domain={[60, 85]} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-card border rounded-lg p-3 shadow-lg">
                    <p className="font-medium">Class {label}</p>
                    <p className="text-sm text-muted-foreground">
                      Average Score: <span className="font-medium text-foreground">{data.avgScore}%</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Students: <span className="font-medium text-foreground">{data.students}</span>
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar
            dataKey="avgScore"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
