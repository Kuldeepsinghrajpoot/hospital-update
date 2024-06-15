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
import { set } from 'mongoose';

export function AddNewRole() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLaoding] = useState(false);
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
        setLaoding(true);
      
        try {
            const response = await fetch('/api/admin/insert-role', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            if (response.status === 200) {
                toast("Account has been created successfully");
                form.reset(); // Reset form fields
                setIsOpen(false); // Close dialog
                router.refresh();
            }
        } catch (error: any) {
            // console.error('Error:', error);
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }finally{
            form.reset(); // Reset form fields
            setIsOpen(false); // Close dialog
            setLaoding(false);
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
                        <Button
                            className=" flex justify-center items-center w-100  text-foreground   hover:border-transparent rounded w-full"
                            type="submit" variant={'default'}
                            disabled={loading} // Disable the button when in the loading state
                        >
                            {loading ? (
                                <>
                                    <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                        </path>
                                    </svg>                          Loading...
                                </>
                            ) : (
                                'Create Appointment'
                            )}
                        </Button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}
