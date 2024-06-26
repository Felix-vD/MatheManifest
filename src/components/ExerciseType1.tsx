"use client"
import * as React from "react"
import { Meteors } from "@/components/ui/meteors";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Image from 'next/image'
import Link from "next/link";

export function ExerciseType1() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          <Avatar className="grid place-items-center w-full h-auto">
            <AvatarImage src="/mr-bean-bean.png" alt="@shadcn" className="w-32 h-32 rounded-full" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription>If you click here, you will be as surprised as the guy in blue about the Exercise that will come up. It is chosen at random!</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
      <Button asChild>
          <Link href={{
            pathname: '/exercises',
            //query: { timestamp : timestamp.toString() } 
          }}>Random Exercise</Link>
        </Button>
        
      </CardContent>
      
    </Card>
  )
}
