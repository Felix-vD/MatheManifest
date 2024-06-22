"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"
import Avatar from "./Avatar"
import { ModeToggle } from "./ui/toggle-mode";
import useUser from '@/app/hook/useUser';
export default function Nav() {
    const { data } = useUser();
    return (
        <div>
            {!data?.id ? (
                <div>
                    <h1>Placeholder for whats to come instead of the navbar before a user is logged in</h1>
                </div>
            ) : (
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/home" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/login" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Login
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/faq" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    FAQ
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/profile" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Profile
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Avatar />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            )}
            <div className="flex items-end justify-end mr-2">
                <ModeToggle />
            </div>
        </div>
    )
}