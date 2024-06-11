'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppointmentVerified } from '@/schema/appointment';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { SquarePen } from 'lucide-react';
import Swal from 'sweetalert2';

interface Data {
    name: any, age: any, gender: any, phone: any, address: any, DoctorName: any, doctorList: any
}

export function Update({ name, age, gender, phone, address, DoctorName, doctorList, id }: any) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof AppointmentVerified>>({
        resolver: zodResolver(AppointmentVerified),
        defaultValues: {
            Name: name || '',
            Age: age || '',
            Gender: gender || 'Male',
            Doctor: DoctorName || '',
            Phone: phone || '',
            Address: address || '',
        },
    });

    useEffect(() => {
        form.reset({
            Name: name,
            Age: age,
            Gender: gender,
            Doctor: DoctorName,
            Phone: phone,
            Address: address,
        });
    }, [name, age, gender, DoctorName, phone, address, form]);

    const onSubmit = useCallback(async (values: z.infer<typeof AppointmentVerified>) => {
        console.log('Form values:', values);
        
        try {
            const response = await fetch(`/api/appointment/update-appointment?id=${id}`, {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Network response was not ok: ${errorData.error || response.statusText}`);
            }

            const responseData = await response.json();
            if (responseData.success) {
                form.reset(); // Reset form fields
               Swal.fire({
                    icon: 'success',
                    title: 'Appointment updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
              
                setOpen(false); // Close the dialog
                router.refresh(); // Refresh the page or data
            } else {
                throw new Error(responseData.error || 'Unknown error');
            }
        } catch (error: any) {
            toast.error(`Failed to update appointment: ${error.message || error}`);
            console.error('Update error:', error);
        }
    
    }, [id, form, router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div  onClick={() => setOpen(true)}>
                    <SquarePen className="mr-2" />
                </div>
            </DialogTrigger>
            <DialogContent className="w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]">
                <DialogHeader>
                    <DialogTitle className="text-center py-5">Update Appointment</DialogTitle>
                    <DialogDescription className="text-center">
                        Please update the form below to modify the appointment.
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
                                                    {doctorList?.map((doc: any, index: number) => (
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
                        <Button type="submit" variant="default" className='w-full'>Submit</Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}
