'use client';

import Link from "next/link";
import {
  Bell,
  Home,
  Menu,
  Search,
  Users,
  User,
  Plus,
  Stethoscope,
  LockKeyhole,
  SunIcon,
  MoonIcon,
  UserCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { usePathname } from 'next/navigation';
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from 'next-themes'; // Import useTheme from next-themes
import { Switch } from "@radix-ui/react-switch";
import { Login } from "../auth/login";
import { Label } from "@radix-ui/react-label";
import { SwitchDemo } from "./switch";

export function Dashboard({ children }: { children: React.ReactNode }) {

  const { theme, setTheme } = useTheme(); // Destructure theme and setTheme
  const router = usePathname();
  const { data: Session } = useSession();
  const user = Session?.user;
  // Define navigation items
  const navitems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Profile", icon: User, href: "/dashboard/profile" },
    { name: "New Appointment", icon: Plus, href: "/dashboard/new-appointment" },
    { name: "Patients", icon: Users, href: "/dashboard/patients" },
    { name: "Doctor", icon: Stethoscope, href: "/dashboard/doctor" },
    { name: "Manager", icon: LockKeyhole, href: "/dashboard/manager" },
  ];

  // Filter navigation items based on the user's role
  const filteredNavItems = user?.role === "Doctor"
    ? navitems.filter(item =>
      ["Dashboard", "Profile", "Patients"].includes(item.name)
    )
    : navitems;

  return (
    <div className={`grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr] bg-muted/40`}> {/* Apply dynamic background */}
      <div className={`hidden border-r  md:block`}> {/* Apply dynamic background */}
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0 bg-background">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-background">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Image src="/favicon.png" alt="avatar" width={30} height={30} className="rounded-full" />
              <span className="">Uday Clinic</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 bg-background">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 sticky top-0 gap-1 z-[999]">
              <span className="capitalize grid items-start text-sm font-medium sticky top-5 my-1">DASHBOARD</span>
              {filteredNavItems.map((item, index: number) => (
                index == 0 && <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${router === item.href ? 'rounded-lg bg-muted text-primary' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
              <span className="capitalize grid items-start text-sm font-medium sticky top-5 my-1">APPS & PAGE</span>
              {filteredNavItems.map((item, index: number) => (
                index != 0 && <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${router === item.href ? 'rounded-lg bg-muted text-primary' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col sticky top-0">
        <nav className="flex h-14 items-center bg-background gap-4 border-b z-[9999] px-4 lg:h-[60px] lg:px-6 sticky top-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <span className="capitalize grid items-start text-sm font-medium sticky top-5 my-1">DASHBOARD</span>
              {filteredNavItems.map((item, index: number) => (
                index == 0 && <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${router === item.href ? 'rounded-lg bg-muted text-primary' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
              <span className="capitalize grid items-start text-sm font-medium sticky top-5 my-1">APPS & PAGE</span>
              {filteredNavItems.map((item, index: number) => (
                <SheetClose asChild key={index}>
                  {index != 0 && <Link

                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${router === item.href ? 'rounded-lg bg-muted text-primary' : ''}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>}
                </SheetClose>
              )

              )}
            </SheetContent>
          </Sheet>
          <div className="w-full grid grid-cols-1 sticky top-0">
            {/* <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form> */}
            Hi {user?.role} {Session?.user?.name.split(" ").slice(0,1).join(" ")}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className=" border-none ">
                <UserCircle2 className=" w-9 h-9 border-none" />
                {/* <Image src="/favicon.png" alt="avatar" width={8} height={8} className="h-8 w-8 rounded-full" /> */}

              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={"/dashboard/update-password"}>Settings</Link></DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SwitchDemo />
        </nav>
        <main className={`flex flex-1 flex-col gap-4 md:p-4  lg:gap-6 lg:p-6 `}>
          {children}
        </main>
      </div>
    </div>
  );
}
