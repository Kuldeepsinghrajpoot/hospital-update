"use server"
import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Printer, Trash2 } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import DeleteAppointment from '../delete-appointment/page';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-option';
import { getServerSession } from 'next-auth';
import UpdateAppointment from '../update-appointment/page';
import DoctorPatients from '../patients-doctor/page';
import TableData from '../patients-table/table';

interface Patient {
  _id: string;
  AppointmentId: string;
  Doctor: string;
  Phone: string;
  Gender: string;
  Address: string;
  createdAt: string;
}

interface ApiResponse {
  patients: Patient[];

}

// Fetch data with type annotation
async function getData({id}:{id:string}) {
  try {
    const response = await fetch(`${process.env.URI}/api/appointment/get-patients?id=${id}`)
    if (!response) throw new Error('Failed to fetch data');
    return response.json()
  } catch (error) {
    console.error(error)
    return { patients: [] } // Default return in case of error
  }
}
async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const data = await getData({ id: user?._id});

  if (user?.role === "Doctor") {
    return <DoctorPatients />
  }

  return <TableData appointmentTable={data.patients} />
 
}

export default page
