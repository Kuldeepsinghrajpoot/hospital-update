import React from 'react'
import Dashboard from './role-list/page'
import axios from 'axios'
import { SystemRoleSchema } from '@/models/system-role'
async function getData() {
  const res = await axios.get(`${process.env.URI}/api/admin/count-all-record`)
  const data = await res.data
  console.log(data)
  return data
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
