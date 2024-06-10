import axios from 'axios';
import React from 'react'
import { Profile } from './profile';
import { SystemRoleSchema } from '@/models/system-role';

async function getdata({id}:{id:string}){
  try{
    const response = await axios.get(`${process.env.URI}/api/update-profile?id=${id}`)
    if(!response) throw new Error('Failed to fetch data');
    return response.data.profile
  }catch(error){
    console.error(error)
    return {patients: [], totalPages: 0}
  }
}



async function page() {
const data:SystemRoleSchema = await getdata({id: '6551e74776712767ce3b7ef4'})

  return (
    <div>
      <Profile Name={data.name} Lastname={data.lastname} Email={data.email}   teliphone={data.contactnumber} Address={data.address} useAge={String(data?.age)} Gender={data?.gender}/>
    </div>
  )
}

export default page
