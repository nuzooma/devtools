import Link from "next/link"
import { Button } from "@/components/ui/button"

const Navigation = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          DevTools Hub
        </Link>
        <div className="space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/json">JSON</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/time">Time</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/lorem-ipsum">Lorem Ipsum</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

