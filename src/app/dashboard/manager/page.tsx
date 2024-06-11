import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import DeleteRole from '../delete-role/page'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-option'

async function getManagerDatga() {
  try {
    const response = await axios.get(`${process.env.URI}/api/get-role-based-detiails/get-manager`)
    return response.data.manager
  } catch (error) {
    console.error(error)
  }
}
async function page() {
  const managerData = await getManagerDatga()
const Session = await getServerSession(authOptions);
const user = Session?.user;
  return (
    <div>
      <Table className=" overflow-x-auto bg-muted/40 rounded-md">

        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Address</TableHead>
           {user?.role==="Admin"&& <TableHead>Delete</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {managerData?.map((data: any) => (
            <TableRow key={data?._id}>
              <TableCell>{data?.name}</TableCell>
              <TableCell>{data?.lastname}</TableCell>
              <TableCell>{data?.email}</TableCell>
              <TableCell>{data?.contactnumber}</TableCell>
              <TableCell>{data?.age}</TableCell>
              <TableCell>{data?.gender}</TableCell>
              <TableCell>{data?.address}</TableCell>
              {user?.role==="Admin"&&<TableCell className='text-center items-center flex justify-center'><DeleteRole id={data?._id}/></TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default page
