'use client';

import React, { useCallback, useState } from 'react';
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppointmentVerified } from '@/schema/appointment';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export function Appointment({ doctor }: { doctor: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const formValues = useForm({
        defaultValues: {
            Name: "",
            Age: '',
            Gender: 'Male' as const,
            Doctor: "",
            Phone: "",
            Address: "",
        }
    });

    const form = useForm<z.infer<typeof AppointmentVerified>>({
        resolver: zodResolver(AppointmentVerified),
        defaultValues: formValues.getValues(),
    });

    const onSubmit = useCallback(async (values: any) => {
        try {
            const response = await fetch('/api/appointment/create-appointment', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            toast.success("Appointment created successfully");
            form.reset(); // Reset form fields
            setIsOpen(false); // Close dialog
            router.refresh();

        } catch (error: any) {
            toast.error(`Failed to create appointment: ${error.message || error}`);
            console.error(error);
        }
    }, [form, router]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">New Appointment</Button>
            </DialogTrigger>
            <DialogContent className="w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]">
                <DialogHeader>
                    <DialogTitle className="text-center py-5">New Appointment</DialogTitle>
                    <DialogDescription className="items-center text-center">
                        Please fill out the form below to create a new appointment.
                    </DialogDescription>
                </DialogHeader>

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="Name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Full Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                name="Age"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Age</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Array.from({ length: 100 }, (_, i) => (
                                                        <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="Gender"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="Doctor"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Doctor</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {doctor?.map((doc: any, index: number) => (
                                                        <SelectItem key={index} value={`${doc.name} ${doc.lastname}`}>
                                                            {doc.name} {doc.lastname}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="Phone"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input type="tel" placeholder="123-456-7890" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            name="Address"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="123 Main St" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant={"secondary"}>Submit</Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}
