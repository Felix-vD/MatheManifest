"use client"
import { DialogDemo } from "@/components/EditProfile"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


export default function profile() {
    return(
        <div>
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Profil</CardTitle>
                    <CardDescription>Hier findest du deine Persönlichen Daten und Deinen Lernfortschritt </CardDescription> 
                </CardHeader>
                <CardContent>
                    <div>
                        <DialogDemo></DialogDemo>
                    </div>
                
                </CardContent>
            </Card>
        </div>
    )



}