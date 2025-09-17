"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Brain, Sparkles } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export function StudentSearchForm() {
  const [studentId, setStudentId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [aiInsights, setAiInsights] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!studentId.trim()) {
      setError("Please enter a student ID")
      return
    }

    setIsLoading(true)
    setError("")
    setAiInsights("")

    try {
      const response = await fetch("/api/analyze-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: studentId.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze student")
      }

      const data = await response.json()

      if (data.fallback) {
        setAiInsights(`${data.message}\n\n${data.analysis.substring(0, 200)}...`)
      } else {
        setAiInsights(data.analysis.substring(0, 200) + "...")
      }

      // Scroll to results section
      const resultsSection = document.getElementById("analysis-results")
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" })
      }

      console.log(`[v0] Analyzing student: ${studentId}`)
    } catch (err) {
      console.error("[v0] Error in handleSearch:", err)
      setError("Failed to analyze student. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="student-id" className="text-sm font-medium">
              Student ID
            </Label>
            <Input
              id="student-id"
              type="text"
              placeholder="Enter student ID (e.g., STU001)"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value.toUpperCase())}
              className="mt-1"
              disabled={isLoading}
            />
          </div>
          <div className="flex items-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="gap-2 min-w-[140px] bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4" />
                  AI Analysis
                </>
              )}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <p>Try sample student IDs: STU001, STU002, STU003, STU004, STU005</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            AI Powered
          </Badge>
        </div>
      </form>

      {aiInsights && (
        <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">AI Quick Insights</span>
          </div>
          <p className="text-sm text-muted-foreground">{aiInsights}</p>
        </div>
      )}
    </div>
  )
}
