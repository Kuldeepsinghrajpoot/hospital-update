'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Login } from './auth/login';
import { SwitchDemo } from './dashboard/switch';
import Introduction from './landing-page/introduction/page';
import Features from './landing-page/feature/page';
import Footer from './landing-page/footer/page';
import { usePathname } from 'next/navigation';
import {
    Sheet,
    SheetClose,
    SheetContent,

    SheetTrigger,
} from "@/components/ui/sheet"
import { Contact, HelpCircle, HistoryIcon, Home, Menu } from 'lucide-react';

const HomePage: React.FC = () => {
    const navitems = [
        { name: "Home", icon: Home, href: "/" },
        { name: "About", icon: HistoryIcon, href: "/" },
        { name: "Contact", icon: Contact, href: "/" },
        { name: "Service", icon: HelpCircle, href: "/" },




    ];
    const router = usePathname();
    return (
        <div className=''>
            <nav className='bg-white hidden  h-24 w-full md:flex justify-between px-4 items-center text-center drop-shadow-md sticky top-0 z-[999]'>
                <div className='flex justify-start gap-4 text-center items-center'>
                    <Image src={"/favicon.png"} alt='icon' width={50} height={24} />
                    <strong className='text-2xl font-bold text-green-700'>Uday Clinic</strong>
                </div>
                <div className='links'>
                    <ul className='flex gap-4'>
                        <li>
                            <Button variant={'default'}>Home</Button>
                        </li>
                        <li>
                            <Button variant={'default'}>About</Button>

                        </li>
                        <li>
                            <Button variant={'default'}>Contact</Button>

                        </li>
                        <li>
                            <Button variant={'default'}>Service</Button>

                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="flex gap-4">
                        <li className="hover:text-blue-700">
                            <Login />
                        </li>
                        <li className="hover:text-blue-700 itme-center text-center flex justify-center">
                            <SwitchDemo />
                        </li>
                    </ul>
                </div>
            </nav>
            {/* mobile */}
            <nav className="md:hidden h-16 w-full flex justify-between items-center bg-white text-center drop-shadow-md sticky top-0 z-50">
                <div className="ml-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Menu className='bg-background' />
                        </SheetTrigger>
                        <SheetContent side={'left'}>
                                {navitems.map((item, index) => (
                            <SheetClose asChild  key={index} >
                                    <Link
                                       
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${router === item.href ? 'rounded-lg ' : ''}`}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                    </Link>
                            </SheetClose>
                                ))}
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='flex justify-start w-full gap-1 text-center items-center'>
                    <Image src={"/favicon.png"} alt='icon' width={50} height={24} />
                    <strong className='text-base font-bold text-green-700'>Uday Clinic</strong>
                </div>
                <div className="mr-4 bg-white">
                    <ul className="flex gap-4">
                        <li className="hover:text-blue-700">
                            <Login />
                        </li>
                        <li className="hover:text-blue-700 itme-center text-center flex justify-center">
                            <SwitchDemo />
                        </li>
                    </ul>
                </div>
            </nav>


            <Introduction />
            <Features />
            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default HomePage;
