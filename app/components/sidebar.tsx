"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileJson, Clock, Type, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tools = [
  { name: "Home", href: "/", icon: Home },
  { name: "JSON Tools", href: "/json", icon: FileJson },
  { name: "Time Converter", href: "/time", icon: Clock },
  { name: "Lorem Ipsum", href: "/lorem-ipsum", icon: Type },
]

export function Sidebar() {
  const [search, setSearch] = useState("")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const filteredTools = tools.filter((tool) => tool.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <SidebarPrimitive className={cn("transition-all duration-300 ease-in-out", isCollapsed ? "w-[60px]" : "w-[250px]")}>
      <SidebarHeader>
        {!isCollapsed && (
          <Input
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {filteredTools.map((tool) => (
            <SidebarMenuItem key={tool.href}>
              <SidebarMenuButton asChild data-active={pathname === tool.href}>
                <Link href={tool.href} className="flex items-center">
                  <tool.icon className="h-4 w-4" />
                  {!isCollapsed && <span className="ml-2">{tool.name}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex flex-col items-center space-y-2 p-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </SidebarFooter>
    </SidebarPrimitive>
  )
}

const sidebarMenuButtonStyles = `
  [data-active="true"] {
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }
`

