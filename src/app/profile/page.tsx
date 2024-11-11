'use client'

import { useEffect, useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useUser from '@/app/hook/useUser'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/app/store/useUserStore';
const avatarOptions = [
  { url: "https://dmnwtiwosybsrxctamcd.supabase.co/storage/v1/object/sign/avatar/Avatar.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXIvQXZhdGFyLmpwZWciLCJpYXQiOjE3Mjg5NzY0MzgsImV4cCI6MTc2MDUxMjQzOH0.ZuIx8CbplZn12P8v1HYCNIGyvTJQaHF-0uo_a75tnnE&t=2024-10-15T07%3A13%3A57.839Z", alt: "Avatar 1" },
  { url: "https://dmnwtiwosybsrxctamcd.supabase.co/storage/v1/object/sign/avatar/mr-bean-bean.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXIvbXItYmVhbi1iZWFuLnBuZyIsImlhdCI6MTcyODk3NjQ1MCwiZXhwIjoxNzYwNTEyNDUwfQ.kp8elasKcY8JSBST1DJZDqTXIh31GsQINbj26J48Czw&t=2024-10-15T07%3A14%3A09.863Z", alt: "Avatar 2" },
  { url: "https://dmnwtiwosybsrxctamcd.supabase.co/storage/v1/object/sign/avatar/Rick.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXIvUmljay5qcGciLCJpYXQiOjE3Mjg5NzY0NTksImV4cCI6MTc2MDUxMjQ1OX0.kPkEnOdzBXrS_C0cDMzrrFdlxA7OGqH9ybQiRw4-0Mw&t=2024-10-15T07%3A14%3A19.607Z", alt: "Avatar 3" },
  { url: "https://dmnwtiwosybsrxctamcd.supabase.co/storage/v1/object/sign/avatar/sensei.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXIvc2Vuc2VpLmpwZyIsImlhdCI6MTcyODk3NjQ2OCwiZXhwIjoxNzYwNTEyNDY4fQ.Cn6Ql8cy_bSyreT_X12AEl6E14-aDUyPh2A5I9hk1Tg&t=2024-10-15T07%3A14%3A27.926Z", alt: "Avatar 4" },
]

export default function Profile() {


  


  const { isFetching, data } = useUser();
  const router = useRouter();

  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [display_name, setName] = useState('');
  // const [grade, setGrade] = useState('');
  // const [calculator, setCalculator] = useState('');
  const [form, setForm] = useState({
    email: '',
    avatar: '',
    display_name: '',
    grade: '',
    calculator: '',
  });
  
  useEffect(() => {
    if (data) {
      setForm({
          email: data.email || '',
          avatar: data.avatar || '',
          display_name: data.display_name || '',
          grade: data.grade || '',
          calculator: data.calculator || '',
      });
    }
  }, [data]);
  
  
  
  // useEffect(() => {
  //   if (user) {
  //     setSelectedAvatar(user.avatar || null);
  //     setName(user.display_name || '');
  //     setGrade(user.grade || '');
  //     setCalculator(user.calculator || '');
  //   }
  // }, [user]);

  const handleAvatarChange = async (newAvatarUrl: string) => {
    try {
      const userEmail = data?.email;
      if (!userEmail) {
        console.error('User ID not found');
        return;
      }

      const response = await fetch('/api/avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, newAvatarUrl }),
      });

      const result = await response.json();

      if (result.error) {
        console.error('Error updating avatar:', result.error);
        return;
      }
      setForm(prevForm => ({
        ...prevForm,
        avatar: newAvatarUrl, // This is the value you want to change
      }));
      router.refresh();
      setIsDialogOpen(false);
      console.log("Avatar updated successfully");
    } catch (error) {
      console.error('Error changing avatar:', error);
    }
  };

  const handleSave = async () => {
    try {
      const userEmail = data?.email;
      if (!userEmail) {
        console.error('User email not found');
        return;
      }

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, ...form }),
      });

      const result = await response.json();

      if (result.error) {
        console.error('Error updating profile:', result.error);
        return;
      }

      console.log("Profile updated successfully");
      router.refresh();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <SidebarLayoutComponent>
      <Card className="w-[400px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">Profil</CardTitle>
            <CardDescription>Hier findest du deine Persönlichen Daten und Deinen Lernfortschritt</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Avatar className="h-12 w-12 cursor-pointer">
                <AvatarImage src={form.avatar || avatarOptions[0].url} alt="Current Avatar" />
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
                    className={`p-2 h-24 w-24 ${form.avatar === avatar.url ? 'ring-2 ring-primary' : ''}`}
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
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={form.email || ''} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="display_name" value={form.display_name} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="klasse">Klasse</Label>
            <Select value={form.grade} onValueChange={(value) => handleSelectChange('grade', value)}>
              <SelectTrigger id="klasse">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10. Klasse">10</SelectItem>
                <SelectItem value="11. Klasse">11</SelectItem>
                <SelectItem value="12. Klasse">12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="taschenrechner">Taschenrechner</Label>
            <Select value={form.calculator} onValueChange={(value) => handleSelectChange('calculator',  value)}>
              <SelectTrigger id="taschenrechner">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cas">Cas</SelectItem>
                <SelectItem value="WTR">WTR</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </SidebarLayoutComponent>
  )
}