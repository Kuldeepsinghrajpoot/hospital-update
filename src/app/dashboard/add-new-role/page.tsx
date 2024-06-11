'use client'

import React, { useCallback, useState } from 'react';
import Swal from 'sweetalert2'
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RoleVerified } from '@/schema/role';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { SystemRoleSchema } from '@/models/system-role';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export function AddNewRole() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof RoleVerified>>({
        resolver: zodResolver(RoleVerified),
        defaultValues: {
            name: "",
            lastname: "",
            email: "",
            contactnumber: "",
            password: "",
            confirmPassword: "",
            role: "",
            address: ""
        }
    });

    const onSubmit = useCallback(async (values: z.infer<typeof RoleVerified>) => {
        try {
            const response = await axios.post<SystemRoleSchema>('/api/admin/insert-role', values, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                toast("Account has been created successfully");
                form.reset(); // Reset form fields
                setIsOpen(false); // Close dialog
                router.refresh();
            }
        } catch (error: any) {
            console.error('Error:', error);
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }, [form, router]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)}>Add New Role</Button>
            </DialogTrigger>
            <DialogContent className="w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]">
                <DialogHeader>
                    <DialogTitle className="text-center py-5">Add New Role</DialogTitle>
                    <DialogDescription className="text-center">
                        Add a new role to the system
                    </DialogDescription>
                </DialogHeader>

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="lastname"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="email@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="contactnumber"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="1234567890" {...field} />
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
                                        <Input type="password" placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="confirmPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="role"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Controller
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <RadioGroup value={field.value} onValueChange={field.onChange}>
                                                    <div className="flex justify-between gap-2 cursor-pointer">
                                                        <div className="flex items-center space-x-2 w-[13vw] border h-10 rounded-md px-2 cursor-pointer">
                                                            <RadioGroupItem value="Doctor" id="doctor" />
                                                            <Label htmlFor="doctor" className="cursor-pointer">Doctor</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2 w-[13vw] border h-10 rounded-md px-2 cursor-pointer">
                                                            <RadioGroupItem value="Manager" id="manager" />
                                                            <Label htmlFor="manager" className="cursor-pointer">Manager</Label>
                                                        </div>
                                                    </div>
                                                </RadioGroup>
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="address"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="123 Main Street" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="col-span-2 text-center">
                            <Button type="submit" className='w-full'>Submit</Button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}
