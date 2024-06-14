
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
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-option'
import SystemRoleTableData from '../system-role-table/table'

async function getManagerDatga({ id }: { id: string }) {
  try {
    const response = await axios.get(`${process.env.URI}/api/get-role-based-detiails/get-doctor?id=${id}`)
    return response.data.doctor
  } catch (error) {
    console.error(error)
  }
}
async function page() {

  const Session = await getServerSession(authOptions);
  const user = Session?.user;
  const doctor = await getManagerDatga({ id: user?._id })
  return <SystemRoleTableData systemRole={doctor} />

}

export default page
