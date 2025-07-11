
'use client'

import { useState, useEffect } from 'react'
import { Bell, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NewsItem {
  id: number
  content: string
  date: string
}

// In a real application, this would be fetched from an API
const mockNews: NewsItem[] = [
  { id: 1, content: "", date: "2023-06-11" },
  { id: 2, content: "", date: "2023-06-11" },
  { id: 3, content: "", date: "2023-06-11" },
  { id: 4, content: "", date: "2023-06-11" },
  { id: 5, content: "", date: "2023-06-11" },
]

export default function DashboardNewsfeed() {
  const [isOpen, setIsOpen] = useState(false)
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    // In a real application, you would fetch the news from an API here
    setNews(mockNews)
  }, [])

  return (
    <div className="relative">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="relative"
          size="icon"
          variant="outline"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Open newsfeed</span>
        </Button>
      )}
      {isOpen && (
        <Card className="absolute top-0 right-0 w-80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Latest Updates
            </CardTitle>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72">
              {news.map((item) => (
                <div key={item.id} className="mb-4 grid gap-1">
                  <p className="text-sm text-muted-foreground">
                    {item.date}
                  </p>
                  <p className="text-sm">
                    {item.content}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}