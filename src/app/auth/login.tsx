// src/components/login.tsx
'use client'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { LoginSchema, LoginType } from '@/schema/login';
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

export function Login() {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<LoginType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = useCallback(async (values: LoginType) => {
        const { email, password } = values;

        Swal.fire({
            title: 'Please wait...',
            text: 'Logging in...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        Swal.close();

        if (res?.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'You have been logged in.',
                timer: 2000,
                showConfirmButton: false
            });

            setIsDialogOpen(false);
            router.replace('/dashboard');
        } else {
            setIsDialogOpen(false);

            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to login.',
            });
        }
    }, [router]);

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="default">Login</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Login</DialogTitle>
                        <DialogDescription>
                            Login to your account
                        </DialogDescription>
                    </DialogHeader>
                    <FormProvider {...form}>
                        <form className="grid grid-cols-1 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email / Phone</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-start gap-2 items-center">
                                                <Mail />
                                                <Input placeholder="Email" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-start gap-2 items-center">
                                                <Lock />
                                                <Input type="password" placeholder="Password" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit" variant="destructive">Login</Button>
                            </DialogFooter>
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </div>
    );
}
