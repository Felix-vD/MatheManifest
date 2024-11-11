'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

const data = [
  { subject: 'CS 2', A: 120, fullMark: 150 },
  { subject: 'Dota 2', A: 98, fullMark: 150 },
  { subject: 'Joint Baukunde', A: 86, fullMark: 150 },
  { subject: 'Skaten', A: 99, fullMark: 150 },
  { subject: 'Joggen', A: 85, fullMark: 150 },
  { subject: 'Coolness', A: 65, fullMark: 150 },
]

export default function ProgressRadarChart() {
  return (
    <Card className="w-full h-full bg-card min-w-[500px]">
      <CardHeader>
        <CardTitle className="text-primary">Aufgabenfortschritt</CardTitle>
        <CardDescription className="text-muted-foreground">Dein Fortschritt in unterschiedlichen Aufgabenbereichen</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-4" >
        <ChartContainer
          config={{
            progress: {
              label: "Progress",
              color: "hsl(var(--primary))",
            },
          }}
          className="w-full aspect-square max-w-[500px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="hsl(var(--muted-foreground))" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ 
                  fill: 'hsl(var(--muted-foreground))', 
                  fontSize: 12 
                }} 
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 150]} 
                tick={{ 
                  fill: 'hsl(var(--muted-foreground))', 
                  fontSize: 10 
                }} 
              />
              <Radar 
                name="Progress" 
                dataKey="A" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.6} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}