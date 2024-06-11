'use client'

import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Package2,
  Search,
  Users,
  User,
  Plus,
  Stethoscope,
  LockKeyhole,


} from "lucide-react"


import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// navigation to find the url of the page

import { usePathname } from 'next/navigation'
import Image from "next/image"
import { signOut } from "next-auth/react"

export function Dashboard({ children }: any) {

  const navitems = {
    dashboard: [
      { name: "Dashboard", icon: Home, href: "/dashboard" },
      { name: "Profile", icon: User, href: "/dashboard/profile" },
      { name: "New Appointment", icon: Plus, href: "/dashboard/new-appointment" },
      { name: "Patients", icon: Users, href: "/dashboard/patients" },
      { name: "Doctor", icon: Stethoscope, href: "/dashboard/doctor" },
      { name: "Manager", icon: LockKeyhole, href: "/dashboard/manager" },

    ],
  }

  const router = usePathname()

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              {/* <Package2 className="h-6 w-6" /> */}
             <Image src="/favicon.png" alt="avatar" width={30} height={30} className=" rounded-full" />
              <span className="">Uday Clinic</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 sticky top-0 gap-1 z-[999]">

              <span className=" capitalize grid items-start  text-sm font-medium  sticky top-5 my-1 ">DASHBOARD</span>
              {/* desktop */}
              {navitems.dashboard.map((item, index: number) => {
                return (
                  <>
                    {
                      index === 0 && <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${router === item.href ? 'rounded-lg bg-muted text-primary ' : ''}`}

                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>}

                    {index === 0 && <span className=" capitalize grid items-start  text-sm font-medium  sticky top-5 my-1">APPS & PAGE</span>}

                    {
                      index !== 0 && <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${router === item.href ? 'rounded-lg bg-muted text-primary ' : ''}`}

                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>}
                  </>

                )

              })}



            </nav>
          </div>

        </div>
      </div>
      <div className="flex flex-col  sticky top-0">
        <nav className="flex h-14 items-center gap-4 border-b  z-[9999] bg-muted/40      px-4 lg:h-[60px] lg:px-6 sticky top-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <span className="grid items-start  text-sm font-medium  sticky top-0 my-1 ">Dashboard</span>

              {navitems.dashboard.map((item, index) => {
                return (
                  <>
                    {
                      index === 0 && <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${router === item.href ? 'rounded-lg bg-muted ' : ''}`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>}

                    {index === 0 && <span className="grid items-start  text-sm font-medium  sticky top-5 my-1">APPS & PAGE</span>}

                    {
                      index !== 0 && <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${router === item.href ? 'rounded-lg bg-muted ' : ''}`}

                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>}
                  </>

                )

              })}

            </SheetContent>
          </Sheet>
          <div className="w-full  grid grid-cols-1 sticky top-0">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
            {/* <div>Hi! kuldeep Singh </div> */}
          </div>
         
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                {/* <CircleUser className="h-5 w-5" /> */}
                <Image src="/favicon.png" alt="avatar" width={8} height={8} className="h-8 w-8 rounded-full" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={"/dashboard/update-password"}>Settings</Link>  </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>signOut()} className=" cursor-pointer">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
