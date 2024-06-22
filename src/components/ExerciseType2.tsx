"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Link from "next/link"

export function ExerciseType2() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          <Avatar className="grid place-items-center w-full h-auto">
            <AvatarImage src="/Rick.jpg" alt="@shadcn" className="w-32 h-32 rounded-full" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription>If you are on your way to the toilet and want to solve some Multiple Choice Questions, click here!</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
      <Button asChild>
          <Link href={{
            pathname: '/exercises',
            //query: { timestamp : timestamp.toString() } 
          }}>Multiple Choice</Link>
        </Button>
      </CardContent>
      
    </Card>
  )
}
