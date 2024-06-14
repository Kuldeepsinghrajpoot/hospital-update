import React from 'react'
import Dashboard from './role-list/page'
import axios from 'axios'
import { SystemRoleSchema } from '@/models/system-role'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/auth-option'
async function getData({id}:{id:string}) {
  try {
    const response = await axios.get(`${process.env.URI}/api/admin/count-all-record?id=${id}`)
    if (!response) throw new Error('Failed to fetch data');
    return response.data
  } catch (error) {
    console.error(error)
    return { role: [] } // Default return in case of error
  }
}
async function page() {
  const Session = await getServerSession(authOptions);
  const user = Session?.user;
  const data:SystemRoleSchema[] = await getData({id: user?._id});
  

  return (
    <div>
      <Dashboard role={data} />
    </div>
  )
}

export default page
