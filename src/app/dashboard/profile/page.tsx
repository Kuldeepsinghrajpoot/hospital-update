import axios from 'axios';
import React from 'react'
import { Profile } from './profile';
import { SystemRoleSchema } from '@/models/system-role';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-option';

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
  const session= await getServerSession(authOptions);
  const user = session?.user;
const data:SystemRoleSchema = await getdata({id: user?._id})

  return (
    <div>
      <Profile Name={data.name} Lastname={data.lastname} Email={data.email}   teliphone={data.contactnumber} Address={data.address} useAge={String(data?.age)} Gender={data?.gender} id={user?._id}/>
    </div>
  )
}

export default page
