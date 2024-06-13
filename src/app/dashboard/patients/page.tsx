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
async function getData(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${process.env.URI}/api/appointment/get-patients`)
    if (!response) throw new Error('Failed to fetch data');
    return response.json()
  } catch (error) {
    console.error(error)
    return { patients: [] } // Default return in case of error
  }
}
async function page() {
  const data = await getData();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user?.role === "Doctor") {
    return <DoctorPatients />
  }
  return (
    <div>
      <div className="  pb-5 bg-muted/40 border ">
        <div className='h-14 items-center text-center  flex justify-between'>
          <div className='flex px-5  justify-center font-bold  h-full  text-center items-center'> Patients</div>
          <div className='flex px-5  justify-center font-bold  h-full  text-center items-center'></div>
        </div>
      </div>
      <Table className=" overflow-x-auto bg-muted/40 border">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Patient&apos;s Name</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Update</TableHead>

            <TableHead>Print</TableHead>
            {user?.role == "Admin" && <TableHead>Delete</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.patients.map((values: any) => (
            <TableRow key={values._id}>
              <TableCell>{values.AppointmentId}</TableCell>
              <TableCell>{values?.Name}</TableCell>

              <TableCell>{values.Doctor}</TableCell>
              <TableCell>{values.Phone}</TableCell>
              <TableCell>{values.Gender}</TableCell>
              <TableCell>{values.Address}</TableCell>
              <TableCell>{new Date(values.createdAt).toUTCString()}</TableCell>
              <TableCell className=' cursor-pointer'><UpdateAppointment userId={values?._id} /></TableCell>

              <TableCell className=' cursor-pointer'><Link href={`/appointment-print/${values._id}`} target='_blank'><Printer /></Link></TableCell>
              {user?.role === 'Admin' && <TableCell className=' cursor-pointer'><DeleteAppointment id={values._id} /></TableCell>}


            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink >1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default page
