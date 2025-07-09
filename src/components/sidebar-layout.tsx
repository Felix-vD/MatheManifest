'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BarChart2, Search, Youtube, Users, Dumbbell, CircleUserRound, LogOut, ShieldHalf, Accessibility } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import { useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'

interface SidebarProps {
  children: React.ReactNode
}

export default function SidebarLayoutComponent({ children }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleLogout = async () => {
    const supabase = createClient()
    queryClient.clear()
    await supabase.auth.signOut()
    router.refresh()
    router.push('/')
  }

  const menuItems = [
    [
      { name: 'Dashboard', icon: BarChart2, href: '/dashboard' },
      { name: 'Profil', icon: CircleUserRound, href: '/profile' },
      { name: 'Ranking', icon: ShieldHalf, href: '/ranking' },
    ],
    [
      { name: 'Dojo', icon: Dumbbell, href: '/exercises' },
      { name: 'Re(chenkunst)ddit', icon: Users, href: '/faq' },
      { name: 'Youtube', icon: Youtube, href: 'https://www.youtube.com/@RechenKunst' },
      { name: 'Ungeloest', icon: Accessibility, href: '/randomExercise' },
      { name: 'ZP10', icon: Accessibility, href: '/randomSelfControlledExercise' },
    ],
    [
      { name: 'About us', icon: Search, href: '/about' },
    ],
  ]

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Rechenkunst</h1>
        </div>
        <nav className="mt-6 flex-grow flex flex-col">
          {menuItems.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4">
              {group.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-start px-4 py-2 ${
                    pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </Button>
              ))}
              {groupIndex < menuItems.length - 1 && <hr className="my-4 border-gray-700" />}
            </div>
          ))}
        </nav>
        <div className="pl-4 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start py-2 -ml-4 hover:bg-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 ml-7 mr-3" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-4 overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  )
}