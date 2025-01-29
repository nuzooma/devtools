"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TimeTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const convertToUnix = () => {
    const date = new Date(input)
    if (isNaN(date.getTime())) {
      setOutput("Invalid date")
    } else {
      setOutput(Math.floor(date.getTime() / 1000).toString())
    }
  }

  const convertFromUnix = () => {
    const date = new Date(Number.parseInt(input) * 1000)
    if (isNaN(date.getTime())) {
      setOutput("Invalid Unix timestamp")
    } else {
      setOutput(date.toISOString())
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Time Converter</h1>
      <Card>
        <CardHeader>
          <CardTitle>Convert Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter date or Unix timestamp" />
          <div className="flex justify-center space-x-4">
            <Button onClick={convertToUnix}>To Unix Timestamp</Button>
            <Button onClick={convertFromUnix}>From Unix Timestamp</Button>
          </div>
          <Input value={output} readOnly />
        </CardContent>
      </Card>
    </div>
  )
}

