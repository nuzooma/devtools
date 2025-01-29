import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to DevTools Hub</h1>
      <p className="text-xl text-muted-foreground">A collection of useful tools for developers</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>
              <Link href="/json">JSON Tools</Link>
            </CardTitle>
            <CardDescription>Manipulate and validate JSON data</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <Link href="/time">Time Converter</Link>
            </CardTitle>
            <CardDescription>Convert between different time formats and timezones</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <Link href="/lorem-ipsum">Lorem Ipsum Generator</Link>
            </CardTitle>
            <CardDescription>Generate placeholder text for your projects</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

