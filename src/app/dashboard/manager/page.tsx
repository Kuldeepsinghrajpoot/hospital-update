
import React from 'react'
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
import axios from 'axios'
import { LucideDelete, Trash2 } from 'lucide-react'
import DeleteRole from '../delete-role/page'

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
            <TableHead>Delete</TableHead>
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
              <TableCell className='text-center items-center flex justify-center'><DeleteRole id={data?._id}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default page
