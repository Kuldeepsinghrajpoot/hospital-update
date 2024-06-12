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
async function getData() {
  try {
    const response = await axios.get(`${process.env.URI}/api/appointment/daily-appointment`)
    if (!response) throw new Error('Failed to fetch data');
    return response.data
  } catch (error) {
    console.error(error)
    return { patients: [], totalPages: 0 } // Default return in case of error
  }
}

// apointment api call
async function getDoctor() {
  try {
    const response = await axios.get(`${process.env.URI}/api/get-role-based-detiails/get-doctor-to-appointment`)
    if (!response) throw new Error('Failed to fetch data');
    return response.data
  } catch (error) {
    console.error(error)
  }
}

async function page() {
  const data = await getData();
  const doctor = await getDoctor();

  const Session:any = await getServerSession(authOptions)
  const user = Session?.user
  return (
    <div>
      <div className="  pb-5 bg-muted/40 border">
        <div className='h-14 items-center text-center  flex justify-between'>
          <div className='flex px-5  justify-center   h-full  text-center items-center gap-2'> <span className='font-bold'>Appointment&#39;s</span>
            [<span className='gap-5'><DateTimer /></span>]</div>
          <div className='flex px-5  justify-center font-bold  h-full  text-center items-center'><Appointment doctor={doctor.doctor} /></div>
        </div>
      </div>
      <Table className=" overflow-x-auto bg-muted/40  border">

        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Patient&#39;s Name</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Update</TableHead>
            <TableHead>Print</TableHead>
            {user?.role==='Admin'&&<TableHead>Delete</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.dailyAppointment?.map((values: any) => (
            <TableRow key={values._id}>
              <TableCell>{values?.AppointmentId}</TableCell>
              <TableCell>{values?.Name}</TableCell>
              <TableCell>{values.Doctor}</TableCell>
              <TableCell>{values.Phone}</TableCell>
              <TableCell>{values.Gender}</TableCell>
              <TableCell>{values.Address}</TableCell>
              <TableCell>{new Date(values.createdAt).toLocaleString()}</TableCell>
              <TableCell className=' cursor-pointer'><UpdateAppointment userId={values?._id}/></TableCell>
            {/* <TableCell className=' cursor-pointer'><Link href={`/dashboard/new-appointment?id=${values._id}`}><UpdateAppointment/> </Link> </TableCell> */}
              <TableCell className=' cursor-pointer'><Link href={`/appointment-print/${values?._id}`} target='_blank'><PrinterIcon /> </Link></TableCell>
              {user?.role==='Admin' && <TableCell className=' cursor-pointer'><DeleteAppointment id={values._id} /></TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  )
}
export default page
