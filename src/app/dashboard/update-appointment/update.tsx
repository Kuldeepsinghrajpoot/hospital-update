'use client';

import * as React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { SquarePen, Loader2, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from 'next/navigation';
/**
 * SCHEMA
 */
const AppointmentVerified = z.object({
  Name: z.string().min(2, "Name is required"),
  Age: z.string().min(1, "Age is required"),
  Gender: z.string().min(1, "Gender is required"),
  Doctor: z.string().min(1, "Doctor is required"),
  Phone: z.string().min(10, "Valid phone number required"),
  Address: z.string().min(5, "Address is required"),
});

/**
 * TYPES & INTERFACES
 */
interface AppointmentData {
  Name?: string;
  Age?: string;
  Gender?: string;
  Doctor?: string;
  Phone?: string;
  Address?: string;
}

interface PageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

/**
 * CHILD COMPONENT: Update
 * Handles On-Demand Data Fetching and Form Submission
 */
export function Update({ id }: { id: string }) {
    const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);
  const [doctorList, setDoctorList] = useState<any>(null);

  const form = useForm<z.infer<typeof AppointmentVerified>>({
    resolver: zodResolver(AppointmentVerified),
    defaultValues: {
      Name: '',
      Age: '',
      Gender: 'Male',
      Doctor: '',
      Phone: '',
      Address: '',
    },
  });

  const handleOpenUpdate = useCallback(async () => {
    setOpen(true);
    // If we already have data, don't fetch again
    if (appointmentData) return; 

    setIsLoadingData(true);
    setStatus(null);
    
    try {
      const [appointmentRes, doctorRes] = await Promise.all([
        axios.get(`/api/appointment/update-appointment?id=${id}`),
        axios.get(`/api/get-role-based-detiails/get-doctor-to-appointment?id=${id}`)
      ]);

      const data = appointmentRes.data.appointment;
      setAppointmentData(data);
      setDoctorList(doctorRes.data.doctor);

      form.reset({
        Name: data?.Name || '',
        Age: data?.Age || '',
        Gender: data?.Gender || 'Male',
        Doctor: data?.Doctor || '',
        Phone: data?.Phone || '',
        Address: data?.Address || '',
      });
    } catch (error) {
      console.error("Error fetching appointment details:", error);
      setStatus({ type: 'error', message: "Failed to load appointment details." });
    } finally {
      setIsLoadingData(false);
    }
  }, [id, form, appointmentData]);

  const onSubmit = useCallback(async (values: z.infer<typeof AppointmentVerified>) => {
    setIsSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch(`/api/appointment/update-appointment?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });

      const responseData = await response.json();
      
      if (response.ok && responseData.success) {
        setStatus({ type: 'success', message: 'Appointment updated successfully!' });
        
        router.refresh(); // Refresh the page to show updated data
      } else {
        throw new Error(responseData.error || 'Failed to update');
      }
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'An error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  }, [id]);

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) {
        setStatus(null);
        form.clearErrors();
      }
    }}>
      <DialogTrigger asChild>
        <div onClick={handleOpenUpdate} className="cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors inline-block">
          <SquarePen className="text-gray-500 dark:text-white h-5 w-5" />
        </div>
      </DialogTrigger>
      
      <DialogContent className="w-[95vw] max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-center">Update Appointment</DialogTitle>
          <DialogDescription className="text-center">
            {isLoadingData ? "Fetching latest details..." : "Modify the patient information below."}
          </DialogDescription>
        </DialogHeader>

        {isLoadingData ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground animate-pulse font-medium">Loading appointment data...</p>
          </div>
        ) : (
          <>
            {status && (
              <div className={`p-3 mb-4 rounded-md flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2 ${
                status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {status.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <span className="flex-1 font-medium">{status.message}</span>
                <button type="button" onClick={() => setStatus(null)}><X className="h-4 w-4 opacity-50 hover:opacity-100" /></button>
              </div>
            )}

            {appointmentData && (
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    name="Name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Full Name" 
                            {...field} 
                            className={form.formState.errors.Name ? "border-red-500 focus-visible:ring-red-500" : ""} 
                          />
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
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className={form.formState.errors.Age ? "border-red-500" : ""}>
                                <SelectValue placeholder="Age" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 100 }, (_, i) => (
                                <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="Gender"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className={form.formState.errors.Gender ? "border-red-500" : ""}>
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    name="Doctor"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className={form.formState.errors.Doctor ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select Doctor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.isArray(doctorList) ? doctorList.map((doc: any, index: number) => (
                              <SelectItem key={index} value={`${doc.name} ${doc.lastname}`}>
                                {doc.name} {doc.lastname}
                              </SelectItem>
                            )) : doctorList && (
                               <SelectItem value={`${doctorList.name} ${doctorList.lastname}`}>
                                {doctorList.name} {doctorList.lastname}
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="Phone"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Phone Number" 
                            {...field} 
                            className={form.formState.errors.Phone ? "border-red-500 focus-visible:ring-red-500" : ""} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="Address"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Full Address" 
                            {...field} 
                            className={form.formState.errors.Address ? "border-red-500 focus-visible:ring-red-500" : ""} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className='w-full' disabled={isSubmitting || isLoadingData}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Changes...
                      </>
                    ) : "Update Appointment"}
                  </Button>
                </form>
              </FormProvider>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/**
 * MAIN COMPONENT: UpdateAppointment
 */
export default function UpdateAppointment({ searchParams }: PageProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const initializationStarted = useRef(false);

  useEffect(() => {
    // Only run the initialization logic once per mount
    if (initializationStarted.current) return;
    initializationStarted.current = true;

    const resolveParams = async () => {
      try {
        const params = await searchParams;
        if (params?.id) {
          setUserId(params.id);
        }
      } catch (err) {
        console.error("Error resolving searchParams:", err);
      } finally {
        setIsReady(true);
      }
    };
    
    resolveParams();
  }, [searchParams]);

  // If parameters aren't ready yet, show a very faint loader to prevent layout shift
  if (!isReady) {
    return (
      <div className="p-12 flex justify-center items-center h-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary/30" />
      </div>
    );
  }

  // Once ready, if no ID exists, show error
  if (!userId) {
    return <div className="p-10 text-center text-muted-foreground italic border rounded-lg m-4">Missing appointment ID parameter.</div>;
  }

  // The child component "Update" manages its own click-to-fetch logic
  return <Update id={userId} />;
}