"use server"
import React, { ReactNode } from 'react'

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
import { Printer, PrinterIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Appointment } from './appointment';
import DateTimer from './date';
import axios from 'axios';
import DeleteAppointment from '../delete-appointment/page';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-option';
import UpdateAppointment from '../update-appointment/page';
import { Update } from '../update-appointment/update';
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
async function getData({ id }: { id: string }) {
  try {
    const response = await axios.get(`${process.env.URI}/api/appointment/daily-appointment?id=${id}`)
    if (!response) throw new Error('Failed to fetch data');
    return response.data
  } catch (error) {
    console.error(error)
    return { patients: [], totalPages: 0 } // Default return in case of error
  }
}

// apointment api call
async function getDoctor({ id }: { id: string }) {
  try {
    const response = await axios.get(`${process.env.URI}/api/get-role-based-detiails/get-doctor-to-appointment?id=${id}}`)
    if (!response) throw new Error('Failed to fetch data');
    return response.data
  } catch (error) {
    console.error(error)
  }
}

async function page() {
  const Session: any = await getServerSession(authOptions)
  const userId = Session?.user
  const data = await getData({ id: userId?._id });
  const doctor = await getDoctor({ id: userId?._id });

  const user = Session?.user
  return (
    <div>
      <div className=" py-4 md:py-0 w-full pb-5 sticy top-24 ">
        <div className='h-14 items-center text-center w-full  md:flex md:justify-between  grid md:grid-cols-2 '>
          <div className='flex md:px-5  justify-center    text-center items-center gap-2'> <span className='font-bold'>Appointment&#39;s</span>
            [<span className='gap-5'><DateTimer /></span>]</div>
          <div className='flex md:px-5 text-foreground  justify-center font-bold   text-center items-center'><Appointment doctor={doctor.doctor} /></div>
        </div>
      <TableData appointmentTable={data.dailyAppointment} />
      </div>

    </div>
  )
}
export default page
