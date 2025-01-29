"use client"

import { useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Editor, type EditorProps } from "@monaco-editor/react"
import { useSidebar } from "@/components/ui/sidebar"
import { useTheme } from "next-themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Dynamically import react-json-view to avoid SSR issues
const DynamicReactJson = dynamic(() => import("react-json-view"), { ssr: false })

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

type EditorLayout = "side-by-side" | "top-bottom"

interface JSONError {
  message: string
  position?: number
}

export default function JSONTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [jsonObject, setJsonObject] = useState<any>(null)
  const [editorLayout, setEditorLayout] = useState<EditorLayout>("side-by-side")
  const [errorMessage, setErrorMessage] = useState<JSONError | null>(null)
  const editorRef = useRef<any>(null)
  const { state } = useSidebar()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEditorDidMount: EditorProps["onMount"] = (editor) => {
    editorRef.current = editor
  }

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout()
    }
  }, [])

  const getEditorValue = () => {
    return editorRef.current?.getValue() ?? ""
  }

  const setEditorValue = (value: string) => {
    if (editorRef.current) {
      editorRef.current.setValue(value)
    }
  }

  const parseJSON = (input: string): [any | null, JSONError | null] => {
    try {
      const parsed = JSON.parse(input)
      return [parsed, null]
    } catch (error) {
      if (error instanceof SyntaxError) {
        const match = error.message.match(/position (\d+)/)
        const position = match ? Number.parseInt(match[1], 10) : undefined
        return [null, { message: error.message, position }]
      }
      return [null, { message: (error as Error).message }]
    }
  }

  const formatJSON = () => {
    const [parsed, error] = parseJSON(getEditorValue())
    if (error) {
      setOutput("Invalid JSON")
      setJsonObject(null)
      setErrorMessage(error)
    } else {
      const formatted = JSON.stringify(parsed, null, 2)
      setEditorValue(formatted)
      setOutput(formatted)
      setJsonObject(parsed)
      setErrorMessage(null)
    }
  }

  const minifyJSON = () => {
    const [parsed, error] = parseJSON(getEditorValue())
    if (error) {
      setOutput("Invalid JSON")
      setJsonObject(null)
      setErrorMessage(error)
    } else {
      const minified = JSON.stringify(parsed)
      setEditorValue(minified)
      setOutput(minified)
      setJsonObject(parsed)
      setErrorMessage(null)
    }
  }

  const validateJSON = () => {
    const [parsed, error] = parseJSON(getEditorValue())
    if (error) {
      setOutput("Invalid JSON")
      setJsonObject(null)
      setErrorMessage(error)
    } else {
      setOutput("Valid JSON")
      setJsonObject(parsed)
      setErrorMessage(null)
    }
  }

  const compressJSON = () => {
    const [parsed, error] = parseJSON(getEditorValue())
    if (error) {
      setOutput("Invalid JSON")
      setJsonObject(null)
      setErrorMessage(error)
    } else {
      const compressed = JSON.stringify(parsed).replace(/\s+/g, "")
      setEditorValue(compressed)
      setOutput(compressed)
      setJsonObject(parsed)
      setErrorMessage(null)
    }
  }

  const convertToYAML = () => {
    const [parsed, error] = parseJSON(getEditorValue())
    if (error) {
      setOutput("Invalid JSON")
      setJsonObject(null)
      setErrorMessage(error)
    } else {
      const yaml = jsonToYaml(parsed)
      setOutput(yaml)
      setJsonObject(parsed)
      setErrorMessage(null)
    }
  }

  const fixJSON = () => {
    try {
      const input = getEditorValue()
      // Replace single quotes with double quotes
      let fixed = input.replace(/'/g, '"')
      // Add double quotes to unquoted keys
      fixed = fixed.replace(/(\w+)(?=\s*:)/g, '"$1"')
      // Remove trailing commas
      fixed = fixed.replace(/,\s*([\]}])/g, "$1")

      const [parsed, error] = parseJSON(fixed)
      if (error) {
        throw new Error(error.message)
      }
      const formatted = JSON.stringify(parsed, null, 2)
      setEditorValue(formatted)
      setOutput(formatted)
      setJsonObject(parsed)
      setErrorMessage(null)
    } catch (error) {
      setOutput("Unable to fix JSON")
      setJsonObject(null)
      setErrorMessage({ message: (error as Error).message })
    }
  }

  // Helper function to convert JSON to YAML
  const jsonToYaml = (obj: any, indent = ""): string => {
    if (typeof obj !== "object" || obj === null) {
      return String(obj)
    }

    let yaml = ""
    for (const key in obj) {
      yaml += `${indent}${key}:`
      if (typeof obj[key] === "object" && obj[key] !== null) {
        yaml += "\n" + jsonToYaml(obj[key], indent + "  ")
      } else {
        yaml += " " + String(obj[key]) + "\n"
      }
    }
    return yaml
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-3xl font-bold">JSON Tools</h1>
        <div className="flex items-center space-x-2">
          <Select value={editorLayout} onValueChange={(value) => setEditorLayout(value as EditorLayout)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="side-by-side">Side by Side</SelectItem>
              <SelectItem value="top-bottom">Top and Bottom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap justify-start gap-2">
        <Button onClick={formatJSON}>Format JSON</Button>
        <Button onClick={minifyJSON}>Minify JSON</Button>
        <Button onClick={validateJSON}>Validate JSON</Button>
        <Button onClick={compressJSON}>Compress JSON</Button>
        <Button onClick={convertToYAML}>Convert to YAML</Button>
        <Button onClick={fixJSON}>Fix JSON</Button>
      </div>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>JSON Error</AlertTitle>
          <AlertDescription>
            <p>{errorMessage.message}</p>
            {errorMessage.position !== undefined && <p>Error at position: {errorMessage.position}</p>}
          </AlertDescription>
        </Alert>
      )}
      <div className={`grid gap-6 ${editorLayout === "side-by-side" ? "md:grid-cols-2" : "grid-cols-1"}`}>
        <Card className={editorLayout === "side-by-side" ? "md:col-span-1" : "col-span-1"}>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <MonacoEditor
              height="400px"
              defaultLanguage="json"
              defaultValue="{}"
              onMount={handleEditorDidMount}
              theme={theme === "dark" ? "vs-dark" : "light"}
              options={{
                minimap: { enabled: false },
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
              }}
            />
          </CardContent>
        </Card>
        <Card className={editorLayout === "side-by-side" ? "md:col-span-1" : "col-span-1"}>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text">
              <TabsList>
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="tree">Tree</TabsTrigger>
              </TabsList>
              <TabsContent value="text">
                <MonacoEditor
                  height="400px"
                  defaultLanguage="json"
                  value={output}
                  theme={theme === "dark" ? "vs-dark" : "light"}
                  options={{
                    minimap: { enabled: false },
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: true,
                  }}
                />
              </TabsContent>
              <TabsContent value="tree">
                {jsonObject && (
                  <div className="h-[400px] overflow-auto">
                    <DynamicReactJson
                      src={jsonObject}
                      theme={theme === "dark" ? "monokai" : "rjv-default"}
                      style={{ backgroundColor: "transparent" }}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

