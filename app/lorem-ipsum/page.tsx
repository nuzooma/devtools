"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function LoremIpsumTool() {
  const [paragraphs, setParagraphs] = useState(1)
  const [output, setOutput] = useState("")

  const generateLoremIpsum = () => {
    setOutput(Array(paragraphs).fill(loremIpsum).join("\n\n"))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Lorem Ipsum Generator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Lorem Ipsum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              min="1"
              value={paragraphs}
              onChange={(e) => setParagraphs(Number.parseInt(e.target.value))}
              className="w-24"
            />
            <Button onClick={generateLoremIpsum}>Generate</Button>
          </div>
          <Textarea value={output} readOnly className="h-64" />
        </CardContent>
      </Card>
    </div>
  )
}

