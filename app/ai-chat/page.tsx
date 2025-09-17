"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Send, User, Bot, Sparkles, MessageCircle, TrendingUp, Users, Target, BarChart3 } from "lucide-react"
import { NavigationMenu } from "@/components/navigation-menu"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI assistant for cognitive skills analysis. I have access to data from 200 students across grades 9-12. I can help you understand student performance patterns, suggest interventions, analyze learning personas, and answer questions about cognitive skills development. What would you like to explore?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, messages }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I'm having trouble connecting right now. Please make sure the OpenAI API key is configured and try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const quickQuestions = [
    "Which students in Class 10A need the most attention support?",
    "What are the key differences between high achievers and struggling students?",
    "How can I improve retention scores for students scoring below 70%?",
    "What learning strategies work best for attention-focused learners?",
    "Analyze the performance trends across different grade levels",
    "Which cognitive skills show the strongest correlation with assessment scores?",
  ]

  const contextualInsights = [
    { label: "Total Students", value: "200", icon: Users },
    { label: "Average Assessment", value: "77.1%", icon: BarChart3 },
    { label: "Top Performer", value: "Olivia Brown (90.8%)", icon: TrendingUp },
    { label: "Focus Area", value: "Attention Skills", icon: Target },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-balance">AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">Chat about student cognitive skills and performance</p>
                </div>
              </div>
              <NavigationMenu />
            </div>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Chat with AI Assistant
                </CardTitle>
                <CardDescription>Ask questions about student performance and get AI-powered insights</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                          <div
                            className={`p-2 rounded-full flex-shrink-0 ${message.role === "user" ? "bg-primary" : "bg-secondary"}`}
                          >
                            {message.role === "user" ? (
                              <User className="h-4 w-4 text-primary-foreground" />
                            ) : (
                              <Bot className="h-4 w-4 text-secondary-foreground" />
                            )}
                          </div>
                          <div
                            className={`p-4 rounded-lg ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="p-2 rounded-full bg-secondary">
                          <Bot className="h-4 w-4 text-secondary-foreground" />
                        </div>
                        <div className="p-4 rounded-lg bg-secondary text-secondary-foreground">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary-foreground"></div>
                            <p className="text-sm">AI is analyzing your question...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about student performance, learning strategies, or cognitive skills..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="px-6">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Data Context</CardTitle>
                <CardDescription>Live student performance overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {contextualInsights.map((insight, index) => {
                  const IconComponent = insight.icon
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-primary" />
                        <span className="text-sm">{insight.label}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {insight.value}
                      </Badge>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Tabs defaultValue="questions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="questions">Quick Questions</TabsTrigger>
                <TabsTrigger value="capabilities">AI Features</TabsTrigger>
              </TabsList>

              <TabsContent value="questions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Suggested Questions</CardTitle>
                    <CardDescription>Click to ask common questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start h-auto p-3 text-wrap bg-transparent hover:bg-primary/5"
                        onClick={() => setInput(question)}
                      >
                        <span className="text-xs leading-relaxed">{question}</span>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="capabilities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI Capabilities</CardTitle>
                    <CardDescription>What I can help you with</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Brain className="h-4 w-4 text-primary" />
                      <span>Analyze cognitive patterns across 200 students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Generate personalized recommendations</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span>Identify performance trends and patterns</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="h-4 w-4 text-primary" />
                      <span>Suggest targeted interventions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Compare student and class performance</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      <span>Answer detailed educational questions</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
