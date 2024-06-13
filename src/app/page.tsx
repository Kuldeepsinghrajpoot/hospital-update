'use client'
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Introduction from './landing-page/introduction/page';
import Features from './landing-page/feature/page';
import Footer from './landing-page/footer/page';
import Image from 'next/image';
import { useTheme } from "next-themes"
import { Login } from './auth/login';
import { Switch } from '@radix-ui/react-switch';
import { Label } from '@radix-ui/react-label';
import { MoonIcon, SunIcon } from 'lucide-react';
import { SwitchDemo } from './dashboard/switch';

const HomePage: React.FC = () => {
    const { theme, setTheme } = useTheme(); // Destructure theme and setTheme

    return (
        <div className={`${theme !== 'dark' ? 'bg-[rgb(249,246,250)]' : 'bg-muted/40'}`}>
            {/* Header Section */}
            <header className="bg-white border-b-gray-600 text-foreground drop-shadow-md sticky top-0 z-[999]">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-3xl font-bold text-blue-600">
                        <div className='container flex justify-center content-center items-center gap-5'>
                            <div className='flex flex-rows justify-center items-center gap-5'>
                                <Image src={'/favicon.png'} width={50} height={50} alt='image' />
                                <p className="text-center">Uday Clinic</p>
                            </div>
                        </div>
                    </div>
                    <nav className="flex space-x-4">
                        <Link href="/">
                            <Button className="hover:text-foreign-ground">Home</Button>
                        </Link>
                        <Link href="#">
                            <Button variant={'default'} className="hover:text-foreign-ground">Find Doctor</Button>
                        </Link>
                        <Link href="#">
                            <Button variant={'default'} className="hover:text-foreign-ground">Instant Care</Button>
                        </Link>
                    </nav>
                    <div className='flex justify-between items-center gap-5'>
                        <Login />
                        <SwitchDemo />
                    </div>
                </div>
            </header>
            {/* Main Content Sections */}
            <Introduction />
            <Features />
            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default HomePage;
