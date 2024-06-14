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

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-option';
import DateTimer from '../new-appointment/date';
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
    totalPages: number;
}

// Fetch data with type annotation
async function getData({ name }: { name: string }) {
    try {
        const response = await axios.get(`${process.env.URI}/api/appointment/get-daily-appointment-doctor?id=${name}`)
        if (!response) throw new Error('Failed to fetch data');
        return response.data
    } catch (error) {
        console.error(error)
        return { patients: [], totalPages: 0 } // Default return in case of error
    }
}
async function NewDoctorPatients() {
    const session=await getServerSession(authOptions);
    const user = session?.user;
    const name = user?.name+' '+user?.lastname;
    const data = await getData({name});

    return (
        <div>
            <div className="  pb-5 bg-muted/40 border">
                <div className='h-14 items-center text-center  flex justify-between'>
                    <div className='flex px-5  justify-center   h-full  text-center items-center gap-2'> <span className='font-bold'>Appointment&#39;s</span>
                        [<span className='gap-5'><DateTimer /></span>]
                    </div>
                </div>
            </div>
          <TableData appointmentTable={data.patients} />
        </div>
    )
}

export default NewDoctorPatients
