
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
import axios from 'axios';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-option';
import { getServerSession } from 'next-auth';
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



// Fetch data with type annotation
async function getData({name}: {name: string}) {

  try {
    const response = await axios.get(`${process.env.URI}/api/appointment/get-patients-doctor?id=${name}`)
    if (!response) throw new Error('Failed to fetch data');
    return response.data
  } catch (error) {
    console.error(error)
    return { patients: [], totalPages: 0 } // Default return in case of error
  }
}
async function DoctorPatients() {
  const session=await getServerSession(authOptions);
  const user = session?.user;
  const name = user?.name+' '+user?.lastname;
  const data = await getData({name});

return <TableData appointmentTable={data.patients} />
  return (
    <div>
      <div className="  pb-5 bg-muted/40 border">
        <div className='h-14 items-center text-center  flex justify-between'>
          <div className='flex px-5  justify-center   h-full  text-center items-center gap-2'> <span className='font-bold'>Patients</span>
            </div>
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
     
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.patients?.map((values: any) => (
            <TableRow key={values._id}>
              <TableCell>{values.AppointmentId}</TableCell>
              <TableCell>{values?.Name}</TableCell>

              <TableCell>{values.Doctor}</TableCell>
              <TableCell>{values.Phone}</TableCell>
              <TableCell>{values.Gender}</TableCell>
              <TableCell>{values.Address}</TableCell>
              <TableCell>{new Date(values.createdAt).toUTCString()}</TableCell>
            
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

export default DoctorPatients
