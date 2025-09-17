"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Brain, TrendingUp, TrendingDown, Sparkles, BookOpen, Target, Lightbulb, User } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Student {
  student_id: string
  name: string
  class: string
  comprehension: number
  attention: number
  focus: number
  retention: number
  assessment_score: number
  engagement_time: number
}

interface AIAnalysis {
  student: any
  analysis: string
  personaAnalysis: string
  timestamp: string
}

const mockStudents: Student[] = [
  {
    student_id: "STU001",
    name: "Emma Johnson",
    class: "10A",
    comprehension: 85.2,
    attention: 78.1,
    focus: 82.3,
    retention: 88.7,
    assessment_score: 84.5,
    engagement_time: 52.3,
  },
  {
    student_id: "STU002",
    name: "Liam Smith",
    class: "10A",
    comprehension: 72.8,
    attention: 65.4,
    focus: 69.2,
    retention: 75.1,
    assessment_score: 71.2,
    engagement_time: 43.7,
  },
  {
    student_id: "STU003",
    name: "Olivia Brown",
    class: "11B",
    comprehension: 91.3,
    attention: 87.9,
    focus: 89.1,
    retention: 93.2,
    assessment_score: 90.8,
    engagement_time: 58.9,
  },
  {
    student_id: "STU004",
    name: "Noah Davis",
    class: "9A",
    comprehension: 68.5,
    attention: 62.3,
    focus: 65.8,
    retention: 70.2,
    assessment_score: 66.7,
    engagement_time: 38.4,
  },
  {
    student_id: "STU005",
    name: "Ava Wilson",
    class: "12A",
    comprehension: 88.7,
    attention: 85.2,
    focus: 87.4,
    retention: 91.1,
    assessment_score: 88.9,
    engagement_time: 55.6,
  },
  {
    student_id: "STU006",
    name: "Ethan Garcia",
    class: "10C",
    comprehension: 76.4,
    attention: 71.8,
    focus: 74.2,
    retention: 79.3,
    assessment_score: 75.8,
    engagement_time: 47.2,
  },
  {
    student_id: "STU007",
    name: "Sophia Martinez",
    class: "11A",
    comprehension: 83.9,
    attention: 79.5,
    focus: 81.7,
    retention: 86.4,
    assessment_score: 83.1,
    engagement_time: 51.8,
  },
  {
    student_id: "STU008",
    name: "Mason Rodriguez",
    class: "9B",
    comprehension: 64.2,
    attention: 58.7,
    focus: 61.9,
    retention: 67.5,
    assessment_score: 63.4,
    engagement_time: 35.9,
  },
  {
    student_id: "STU009",
    name: "Isabella Chen",
    class: "11A",
    comprehension: 89.4,
    attention: 82.6,
    focus: 85.8,
    retention: 90.3,
    assessment_score: 87.2,
    engagement_time: 54.1,
  },
  {
    student_id: "STU010",
    name: "Jacob Thompson",
    class: "10B",
    comprehension: 77.9,
    attention: 73.2,
    focus: 75.6,
    retention: 81.4,
    assessment_score: 77.8,
    engagement_time: 49.3,
  },
]

export function StudentTable() {
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof Student>("assessment_score")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    setStudents(mockStudents)
  }, [])

  const analyzeStudent = async (student: Student) => {
    setIsAnalyzing(true)
    setSelectedStudent(student)

    try {
      const response = await fetch("/api/analyze-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId: student.student_id }),
      })

      if (response.ok) {
        const analysis = await response.json()
        setAiAnalysis(analysis)
      } else {
        console.error("Failed to analyze student")
      }
    } catch (error) {
      console.error("Error analyzing student:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const filteredAndSortedStudents = students
    .filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const handleSort = (field: keyof Student) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600"
    if (score >= 70) return "text-amber-600"
    return "text-red-600"
  }

  const getPerformanceBadge = (score: number) => {
    if (score >= 85) return { variant: "default" as const, text: "Excellent", color: "bg-emerald-500" }
    if (score >= 75) return { variant: "secondary" as const, text: "Good", color: "bg-blue-600 text-white" }
    if (score >= 65) return { variant: "outline" as const, text: "Average", color: "bg-amber-500" }
    return { variant: "destructive" as const, text: "Needs Support", color: "bg-red-500" }
  }

  const getCognitiveAverage = (student: Student) => {
    return ((student.comprehension + student.attention + student.focus + student.retention) / 4).toFixed(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="outline" className="gap-1">
          <Brain className="h-3 w-3" />
          {filteredAndSortedStudents.length} Students
        </Badge>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
              <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("student_id")}>
                Student ID
                {sortField === "student_id" &&
                  (sortDirection === "desc" ? (
                    <TrendingDown className="inline h-4 w-4 ml-1" />
                  ) : (
                    <TrendingUp className="inline h-4 w-4 ml-1" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("name")}>
                Name
                {sortField === "name" &&
                  (sortDirection === "desc" ? (
                    <TrendingDown className="inline h-4 w-4 ml-1" />
                  ) : (
                    <TrendingUp className="inline h-4 w-4 ml-1" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("class")}>
                Class
                {sortField === "class" &&
                  (sortDirection === "desc" ? (
                    <TrendingDown className="inline h-4 w-4 ml-1" />
                  ) : (
                    <TrendingUp className="inline h-4 w-4 ml-1" />
                  ))}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 text-center"
                onClick={() => handleSort("assessment_score")}
              >
                Assessment Score
                {sortField === "assessment_score" &&
                  (sortDirection === "desc" ? (
                    <TrendingDown className="inline h-4 w-4 ml-1" />
                  ) : (
                    <TrendingUp className="inline h-4 w-4 ml-1" />
                  ))}
              </TableHead>
              <TableHead className="text-center">Cognitive Skills</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 text-center"
                onClick={() => handleSort("engagement_time")}
              >
                Engagement
                {sortField === "engagement_time" &&
                  (sortDirection === "desc" ? (
                    <TrendingDown className="inline h-4 w-4 ml-1" />
                  ) : (
                    <TrendingUp className="inline h-4 w-4 ml-1" />
                  ))}
              </TableHead>
              <TableHead className="text-center">Performance</TableHead>
              <TableHead className="text-center">AI Analysis</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedStudents.map((student) => {
              const performanceBadge = getPerformanceBadge(student.assessment_score)
              const cognitiveAvg = getCognitiveAverage(student)

              return (
                <TableRow key={student.student_id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-sm">{student.student_id}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.class}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-bold ${getScoreColor(student.assessment_score)}`}>
                      {student.assessment_score.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div>
                          C:{" "}
                          <span className={getScoreColor(student.comprehension)}>
                            {student.comprehension.toFixed(0)}
                          </span>
                        </div>
                        <div>
                          A: <span className={getScoreColor(student.attention)}>{student.attention.toFixed(0)}</span>
                        </div>
                        <div>
                          F: <span className={getScoreColor(student.focus)}>{student.focus.toFixed(0)}</span>
                        </div>
                        <div>
                          R: <span className={getScoreColor(student.retention)}>{student.retention.toFixed(0)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg: <span className={getScoreColor(Number.parseFloat(cognitiveAvg))}>{cognitiveAvg}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">{student.engagement_time.toFixed(0)}m</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={performanceBadge.variant} className={performanceBadge.color}>
                      {performanceBadge.text}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 hover:bg-emerald-50 hover:border-emerald-200 bg-transparent"
                          onClick={() => analyzeStudent(student)}
                        >
                          <Sparkles className="h-3 w-3" />
                          AI Insights
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            AI Analysis for {selectedStudent?.name}
                          </DialogTitle>
                        </DialogHeader>

                        {isAnalyzing ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="text-center space-y-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                              <p className="text-muted-foreground">Analyzing student profile with AI...</p>
                            </div>
                          </div>
                        ) : aiAnalysis && selectedStudent ? (
                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="skills">Skills</TabsTrigger>
                              <TabsTrigger value="persona">Persona</TabsTrigger>
                              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <Brain className="h-5 w-5" />
                                    Student Profile Summary
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium">Assessment Score</p>
                                      <div className="flex items-center gap-2">
                                        <Progress value={selectedStudent.assessment_score} className="flex-1" />
                                        <span className="text-sm font-bold">
                                          {selectedStudent.assessment_score.toFixed(1)}%
                                        </span>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Engagement Time</p>
                                      <p className="text-lg font-bold">
                                        {selectedStudent.engagement_time.toFixed(0)} minutes
                                      </p>
                                    </div>
                                  </div>
                                  <div className="prose prose-sm max-w-none">
                                    <p className="text-muted-foreground whitespace-pre-wrap">{aiAnalysis.analysis}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>

                            <TabsContent value="skills" className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    Cognitive Skills Breakdown
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  {[
                                    { name: "Comprehension", value: selectedStudent.comprehension },
                                    { name: "Attention", value: selectedStudent.attention },
                                    { name: "Focus", value: selectedStudent.focus },
                                    { name: "Retention", value: selectedStudent.retention },
                                  ].map((skill) => (
                                    <div key={skill.name} className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm font-medium">{skill.name}</span>
                                        <span className={`text-sm font-bold ${getScoreColor(skill.value)}`}>
                                          {skill.value.toFixed(1)}%
                                        </span>
                                      </div>
                                      <Progress value={skill.value} className="h-2" />
                                    </div>
                                  ))}
                                </CardContent>
                              </Card>
                            </TabsContent>

                            <TabsContent value="persona" className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Learning Persona Analysis
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="prose prose-sm max-w-none">
                                    <p className="text-muted-foreground whitespace-pre-wrap">
                                      {aiAnalysis.personaAnalysis}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>

                            <TabsContent value="recommendations" className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <Lightbulb className="h-5 w-5" />
                                    Personalized Recommendations
                                  </CardTitle>
                                  <CardDescription>AI-generated study strategies and improvement plans</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="prose prose-sm max-w-none">
                                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                                      <p className="text-emerald-800 whitespace-pre-wrap">{aiAnalysis.analysis}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                          </Tabs>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              Click "AI Insights" to analyze this student's profile
                            </p>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
