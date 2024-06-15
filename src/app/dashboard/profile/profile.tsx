
'use client'
import * as React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateRoleVerified } from "@/schema/update-role";
import { BookUser, Mail, Phone, User, User2Icon } from "lucide-react";
import Swal from "sweetalert2";
import { getSession, useSession } from "next-auth/react";
// Assuming you have this component

interface ProfileFormProps {
    Name: string;
    Lastname: string;
    Email: string;
    teliphone: string;
    Address: string;
    useAge:string,
    Gender:string
    id:string
}
export function Profile({ Name, Lastname, Email, teliphone, Address,useAge,Gender,id }: ProfileFormProps) {
    const formValues = useForm({
        defaultValues: {
            name: Name,
            lastname: Lastname,
            email: Email,
            gender: Gender,
            age: useAge,
            contactnumber: teliphone, // Convert Phone to number if it's a string
            address: Address
        }
    });

    const form = useForm<z.infer<typeof UpdateRoleVerified>>({
        resolver: zodResolver(UpdateRoleVerified),
        defaultValues: formValues.getValues(),
    })

    const onSubmit = React.useCallback(async (data: any) => {
        // console.log(data);
       
        const response = await fetch(`/api/update-profile?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();

        if (result.status===200) {
            Swal.fire({
                icon: 'success',
                title: 'Profile Updated',
                text: 'Your profile has been updated successfully',
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Profile Update Failed',
                text: 'Failed to update your profile',
            })
        }
    }, [id]);

    return (
        <FormProvider {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <Card className="w-full max-w-2xl mx-auto bg-background">
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <div className="grid grid-cols-2 gap-4">
                            {/* First Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-start items-center gap-2">
                                                <User />
                                                <Input placeholder="First Name" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Last Name */}
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-start items-center gap-2">
                                                <User />
                                                <Input placeholder="Last Name" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* E-mail */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-start items-center gap-2">
                                                <Mail />
                                                <Input placeholder="Email" type="email" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Gender */}
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-start items-center gap-1">
                                                <User2Icon />
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger id="gender">
                                                        <SelectValue placeholder="Select Gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Age */}
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Age</FormLabel>
                                        <div className="flex justify-start items-center gap-1">
                                            <User2Icon />
                                            <FormControl>
                                                <Input placeholder="Age" type="number" {...field} />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Phone Number */}
                            <FormField
                                control={form.control}
                                name="contactnumber"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-start items-center gap-1">
                                                <Phone />
                                                <Input placeholder="Phone Number" type="tel" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Address */}
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-start items-center gap-1">
                                                <BookUser />
                                                <Textarea placeholder="Address" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    );
}
