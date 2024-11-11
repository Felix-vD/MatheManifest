import { useState } from "react"
import { DialogDemo } from "@/components/EditProfile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SidebarLayoutComponent from "@/components/sidebar-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useUser from '@/app/hook/useUser'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { updateAvatar } from "@utils/supabase/server"
const avatarOptions = [
  { url: "https://dmnwtiwosybsrxctamcd.supabase.co/storage/v1/object/sign/avatar/Avatar.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXIvQXZhdGFyLmpwZWciLCJpYXQiOjE3Mjg5NzY0MzgsImV4cCI6MTc2MDUxMjQzOH0.ZuIx8CbplZn12P8v1HYCNIGyvTJQaHF-0uo_a75tnnE&t=2024-10-15T07%3A13%3A57.839Z", alt: "Avatar 1" },
  { url: "https://dmnwtiwosybsrxctamcd.supabase.co/storage/v1/object/sign/avatar/mr-bean-bean.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXIvbXItYmVhbi1iZWFuLnBuZyIsImlhdCI6MTcyODk3NjQ1MCwiZXhwIjoxNzYwNTEyNDUwfQ.kp8elasKcY8JSBST1DJZDqTXIh31GsQINbj26J48Czw&t=2024-10-15T07%3A14%3A09.863Z", alt: "Avatar 2" },
  { url: "https://dmnwtiwosybsrxctamcd.supabase.co/storage/v1/object/sign/avatar/Rick.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXIvUmljay5qcGciLCJpYXQiOjE3Mjg5NzY0NTksImV4cCI6MTc2MDUxMjQ1OX0.kPkEnOdzBXrS_C0cDMzrrFdlxA7OGqH9ybQiRw4-0Mw&t=2024-10-15T07%3A14%3A19.607Z", alt: "Avatar 3" },
  { url: "https://dmnwtiwosybsrxctamcd.supabase.co/storage/v1/object/sign/avatar/sensei.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXIvc2Vuc2VpLmpwZyIsImlhdCI6MTcyODk3NjQ2OCwiZXhwIjoxNzYwNTEyNDY4fQ.Cn6Ql8cy_bSyreT_X12AEl6E14-aDUyPh2A5I9hk1Tg&t=2024-10-15T07%3A14%3A27.926Z", alt: "Avatar 4" },
]

export default function Profile() {
    const { isFetching, data } = useUser()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [selectedAvatar, setSelectedAvatar] = useState(data?.avatar)
  
    if (isFetching) {
      return <div>Loading...</div>
    }
  
    const handleAvatarChange = async (newAvatarUrl: string) => {
        try {
          // Log the new avatar URL
          console.log("Changing avatar to:", newAvatarUrl);
      
          // Fetch the authenticated user ID (assuming `useUser` gives you this)
          const userId = data?.id; // Ensure you have the user's ID from `useUser`
      
          if (!userId) {
            console.error('User ID not found');
            return;
          }
      
          // Call the server-side function to update the avatar
          await updateAvatar(userId, newAvatarUrl);
      
          // After successfully updating the database, update the local state
          setSelectedAvatar(newAvatarUrl);
      
          // Optionally refresh or redirect after the update
          router.refresh();
      
          console.log("Avatar updated successfully");
        } catch (error) {
          console.error('Error changing avatar:', error);
        }
      };
    
    return (
      <SidebarLayoutComponent>
        <Card className="w-[400px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold">Profil</CardTitle>
              <CardDescription>Hier findest du deine Persönlichen Daten und Deinen Lernfortschritt</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Avatar className="h-12 w-12 cursor-pointer">
                  <AvatarImage src={selectedAvatar} alt="Current Avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[350px]">
                <DialogHeader>
                  <DialogTitle>Choose an Avatar</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                  {avatarOptions.map((avatar, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`p-2 h-24 w-24 ${selectedAvatar === avatar.url ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => handleAvatarChange(avatar.url)}
                    >
                      <Avatar className="h-full w-full">
                        <AvatarImage src={avatar.url} alt={avatar.alt} />
                        <AvatarFallback>{index + 1}</AvatarFallback>
                      </Avatar>
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <DialogDemo />
          </CardContent>
        </Card>
      </SidebarLayoutComponent>
    )
  }