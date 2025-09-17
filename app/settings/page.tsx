"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Key, Brain, Palette, Save, ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [theme, setTheme] = useState("light")
  const [refreshInterval, setRefreshInterval] = useState("30")
  const [customPrompt, setCustomPrompt] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call to save settings
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSaveSuccess(true)
    setIsSaving(false)

    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
                <Settings className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-balance">Dashboard Settings</h1>
                <p className="text-sm text-muted-foreground">Configure your AI-powered analytics dashboard</p>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Shield className="h-3 w-3" />
              Secure Configuration
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {saveSuccess && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">
              Settings saved successfully! Your changes are now active.
            </AlertDescription>
          </Alert>
        )}

        {/* AI Configuration */}
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Configuration
              </CardTitle>
              <CardDescription>
                Configure your OpenAI API key and AI analysis settings for personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  OpenAI API Key
                </Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Your API key is stored securely and only used for generating AI insights and recommendations.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-prompt">Custom AI Analysis Prompt (Optional)</Label>
                <Textarea
                  id="custom-prompt"
                  placeholder="Add custom instructions for AI analysis..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Customize how the AI analyzes student data and generates recommendations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium mb-2">AI Features Enabled</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="w-2 h-2 p-0 rounded-full"></Badge>
                      <span>Student cognitive analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="w-2 h-2 p-0 rounded-full"></Badge>
                      <span>Personalized recommendations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="w-2 h-2 p-0 rounded-full"></Badge>
                      <span>Learning persona classification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="w-2 h-2 p-0 rounded-full"></Badge>
                      <span>Predictive scoring</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Usage Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>API Calls Today:</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Students Analyzed:</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recommendations Generated:</span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dashboard Preferences */}
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Dashboard Preferences
              </CardTitle>
              <CardDescription>Customize your dashboard appearance and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refresh-interval">Auto-refresh Interval</Label>
                    <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">1 minute</SelectItem>
                        <SelectItem value="300">5 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Real-time Updates</Label>
                      <p className="text-xs text-muted-foreground">Enable automatic data refresh</p>
                    </div>
                    <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-xs text-muted-foreground">Get alerts for important insights</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data & Privacy */}
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Data & Privacy
              </CardTitle>
              <CardDescription>Manage your data preferences and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Data Security</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• All data is encrypted in transit and at rest</li>
                      <li>• API keys are stored securely</li>
                      <li>• Student data is anonymized for AI analysis</li>
                      <li>• No data is shared with third parties</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Shield className="h-4 w-4" />
                    Export Student Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Shield className="h-4 w-4" />
                    Delete Analysis History
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Shield className="h-4 w-4" />
                    Privacy Policy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Save Settings */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md"
          >
            {isSaving ? (
              <>
                <Save className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  )
}
