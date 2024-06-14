import React from 'react'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-option'
import SystemRoleTableData from '../system-role-table/table'

async function getManagerDatga({id}:{id:string}) {
  try {
    const response = await axios.get(`${process.env.URI}/api/get-role-based-detiails/get-manager?id=${id}`)
    return response.data.manager
  } catch (error) {
    console.error(error)
  }
}
async function page() {
  const Session = await getServerSession(authOptions);
  const user = Session?.user;
  const managerData = await getManagerDatga({id: user?._id})
  return <SystemRoleTableData  systemRole={managerData} />

}

export default page
