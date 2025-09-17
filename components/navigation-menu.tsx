"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Target, Calculator, Users, Brain, Activity, Settings, Sparkles } from "@/components/simple-icons"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: BarChart3,
    description: "Overview and analytics",
  },
  {
    href: "/student-analysis",
    label: "Student Analysis",
    icon: Target,
    description: "Individual insights",
    badge: "AI",
  },
  {
    href: "/predictive-scoring",
    label: "Predictive Scoring",
    icon: Calculator,
    description: "Score prediction",
    badge: "ML",
  },
  {
    href: "/learning-personas",
    label: "Learning Personas",
    icon: Users,
    description: "Student patterns",
  },
  {
    href: "/bulk-analysis",
    label: "Bulk Analysis",
    icon: Sparkles,
    description: "Class-wide AI insights",
    badge: "NEW",
  },
  {
    href: "/ai-chat",
    label: "AI Assistant",
    icon: Brain,
    description: "Chat with AI",
    badge: "BETA",
  },
  {
    href: "/real-time-analytics",
    label: "Live Analytics",
    icon: Activity,
    description: "Real-time monitoring",
    badge: "LIVE",
  },
]

export function NavigationMenu() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-1">
      <nav className="hidden lg:flex items-center gap-1">
        {navigationItems.map((item) => {
          const IconComponent = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "gap-2 h-auto p-3 flex flex-col items-center min-w-[100px] transition-all hover:scale-105",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-primary/5 hover:border-primary/20 text-foreground",
                )}
              >
                <div className="flex items-center gap-1">
                  <IconComponent className="h-4 w-4" />
                  {item.badge && (
                    <Badge
                      variant={item.badge === "NEW" ? "destructive" : item.badge === "LIVE" ? "default" : "secondary"}
                      className="text-xs px-1 py-0 h-4 animate-pulse"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium">{item.label}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="h-6 w-px bg-border mx-2"></div>
      <Link href="/settings">
        <Button variant={pathname === "/settings" ? "default" : "ghost"} size="sm" className="gap-2 text-foreground">
          <Settings className="h-4 w-4" />
          <span className="hidden md:inline">Settings</span>
        </Button>
      </Link>
    </div>
  )
}
