import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Home, Info, Briefcase, Mail, CalendarPlus } from "lucide-react"
import Link from "next/link"
import React, { FC, MouseEvent, ReactNode } from "react"
import { Login } from "./auth/login"

interface NavLinkProps {
    href: string;
    children: ReactNode;
    onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
    icon: ReactNode;
}

export function SheetDemo() {
    const NavLink: FC<NavLinkProps> = ({ href, children, onClick, icon }) => {
        return (
            <SheetClose asChild>
                <a href={href} onClick={onClick} className="flex items-center gap-4 text-lg text-muted-foreground hover:text-foreground transition-colors w-full">
                    {icon}
                    <span>{children}</span>
                </a>
            </SheetClose>
        );
    }

    const handleSmoothScroll = (
        e: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement | HTMLButtonElement;
        const href = (target as HTMLAnchorElement).getAttribute?.('href');
        const targetId = href?.substring(1);
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    function handleMobileNavClick(e: React.MouseEvent<HTMLAnchorElement>): void {
        handleSmoothScroll(e);
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline"><Menu /></Button>
            </SheetTrigger>
            <SheetContent>
                <nav className="flex flex-col items-start space-y-4 mt-16 p-4">
                    <Login />
                    <NavLink href="#home" onClick={handleMobileNavClick} icon={<Home />}>
                        Home
                    </NavLink>
                    <NavLink href="#about" onClick={handleMobileNavClick} icon={<Info />}>
                        About
                    </NavLink>
                    <NavLink href="#services" onClick={handleMobileNavClick} icon={<Briefcase />}>
                        Services
                    </NavLink>
                    <NavLink href="#contact" onClick={handleMobileNavClick} icon={<Mail />}>
                        Contact
                    </NavLink>
                    <SheetClose asChild>
                        <Link
                            href="#appointment"
                            onClick={handleMobileNavClick}
                            className="inline-flex items-center justify-center gap-2  text-sm font-medium   bg-background  border-input  h-10"
                        >
                            <CalendarPlus />
                            Book Appointment
                        </Link>
                    </SheetClose>
                </nav>
            </SheetContent>
        </Sheet>
    )
}