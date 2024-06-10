"use client";

import React from 'react';
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePassword } from '@/schema/update-password';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label"; // Assuming you have a Label component for consistent styling.

export default function Profile() {
    const form = useForm<z.infer<typeof updatePassword>>({
        resolver: zodResolver(updatePassword)
    });

    const onSubmit = async (data: any) => {
        // console.log(data);
        // Your form submission logic
        const res = await fetch('/api/update-password', {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await res.json();
        if (result.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Password updated successfully',
                showConfirmButton: false,
                timer: 1500
            });
            form.reset();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed to update password',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <FormProvider {...form}>
            <Card>
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                        Change your password here. After saving, you'll be logged out.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Current Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="current">Current Password</FormLabel>
                                    <FormControl>
                                        <Input id="current" type="password" placeholder="Enter current password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* New Password */}
                        <FormField
                            control={form.control}
                            name="Newpassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="new">New Password</FormLabel>
                                    <FormControl>
                                        <Input id="new" type="password" placeholder="Enter new password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="confirm">Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input id="confirm" type="password" placeholder="Confirm new password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <CardFooter>
                            <Button type="submit">Save password</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </FormProvider>
    );
}
