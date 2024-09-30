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
import Link from "next/link";

export function ExerciseType3() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          <Avatar className="grid place-items-center w-full h-auto">
            <AvatarImage src="/Avatar.jpeg" alt="@shadcn" className="w-32 h-32 rounded-full" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription>Have you mastered all elements of mathematics? Let&apos;s fight the Abitur Exam and find out what you are made of!</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
      <Button asChild>
          <Link href={{
            pathname: '/exercises',
            //query: { timestamp : timestamp.toString() } 
          }}>Abitur Exam</Link>
        </Button>
      </CardContent>
      
    </Card>
  )
}
