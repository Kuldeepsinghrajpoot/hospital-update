import React from 'react'
import Dashboard from './role-list/page'
import axios from 'axios'
import { SystemRoleSchema } from '@/models/system-role'
async function getData() {
  try {
    const response = await axios.get(`${process.env.URI}/api/admin/count-all-record`)
    if (!response) throw new Error('Failed to fetch data');
    return response.data
  } catch (error) {
    console.error(error)
    return { role: [] } // Default return in case of error
  }
}
async function page() {
  const data:SystemRoleSchema = await getData();
  

  return (
    <div>
      <Dashboard role={data} />
    </div>
  )
}

export default page
