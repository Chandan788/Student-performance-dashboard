"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts"

const mockSkillsData = [
  { skill: "Comprehension", score: 85.2, benchmark: 75 },
  { skill: "Attention", score: 78.1, benchmark: 70 },
  { skill: "Focus", score: 82.3, benchmark: 72 },
  { skill: "Retention", score: 88.7, benchmark: 78 },
]

export function CognitiveSkillsChart() {
  const getBarColor = (score: number, benchmark: number) => {
    if (score >= benchmark + 10) return "hsl(var(--chart-1))" // Excellent - Green
    if (score >= benchmark) return "hsl(var(--chart-2))" // Good - Blue
    if (score >= benchmark - 10) return "hsl(var(--chart-3))" // Average - Orange
    return "hsl(var(--destructive))" // Needs improvement - Red
  }

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockSkillsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="skill"
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: "hsl(var(--border))" }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: "hsl(var(--border))" }} domain={[0, 100]} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-card border rounded-lg p-3 shadow-lg">
                      <p className="font-medium">{label}</p>
                      <p className="text-sm text-muted-foreground">
                        Score: <span className="font-medium text-foreground">{data.score}%</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Benchmark: <span className="font-medium text-foreground">{data.benchmark}%</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Difference:{" "}
                        <span
                          className={`font-medium ${data.score >= data.benchmark ? "text-green-600" : "text-red-600"}`}
                        >
                          {data.score >= data.benchmark ? "+" : ""}
                          {(data.score - data.benchmark).toFixed(1)}%
                        </span>
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {mockSkillsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.score, entry.benchmark)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Skills Summary */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        {mockSkillsData.map((skill) => {
          const difference = skill.score - skill.benchmark
          const isAboveBenchmark = difference >= 0

          return (
            <div key={skill.skill} className="flex justify-between items-center p-2 rounded bg-muted/50">
              <span className="font-medium">{skill.skill}</span>
              <div className="text-right">
                <div className={`font-bold ${isAboveBenchmark ? "text-green-600" : "text-red-600"}`}>
                  {skill.score}%
                </div>
                <div className={`text-xs ${isAboveBenchmark ? "text-green-600" : "text-red-600"}`}>
                  {isAboveBenchmark ? "+" : ""}
                  {difference.toFixed(1)}% vs benchmark
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
