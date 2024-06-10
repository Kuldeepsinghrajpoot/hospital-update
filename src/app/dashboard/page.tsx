import React from 'react'
import Dashboard from './role-list/page'
import axios from 'axios'
async function getData() {
  const res = await axios.get(`${process.env.URI}/api/admin/count-all-record`)
  const data = await res.data
  console.log(data)
  return data
}
async function page() {
  const data = await getData()

  return (
    <div>
      <Dashboard data={data} />
    </div>
  )
}

export default page
