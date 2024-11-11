'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type RankingItem = {
  id: number
  name: string
  score: number
  avatar: string
}

const rankingData: RankingItem[] = [
  { id: 1, name: "Alice Johnson", score: 980, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 2, name: "Bob Smith", score: 945, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 3, name: "Charlie Brown", score: 920, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 4, name: "Diana Ross", score: 890, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 5, name: "Ethan Hunt", score: 860, avatar: "/placeholder.svg?height=32&width=32" },
]

export function RankingListComponent() {
  






  return (
    <Card className="w-full h-full bg-card">
      <CardHeader>
        <CardTitle className="text-sky-400">Die Besten der Besten</CardTitle>
        <CardDescription className="text-muted-foreground">Wöchentliche Champions</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {rankingData.map((item) => (
            <li key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="w-6 h-6 rounded-full">
                  {item.id}
                </Badge>
                <Avatar>
                  <AvatarImage src={item.avatar} alt={item.name} />
                  <AvatarFallback>{item.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="font-bold text-sky-400">{item.score}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}