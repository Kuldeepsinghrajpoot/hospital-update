"use server"
import React from 'react'

import { authOptions } from '@/app/api/auth/[...nextauth]/auth-option';
import { getServerSession } from 'next-auth';
import DoctorPatients from '../patients-doctor/page';
import TableData from '../patients-table/table';

// Fetch data with type annotation
async function getData({id}:{id:string}) {
  try {
    const response = await fetch(`${process.env.URI}/api/appointment/get-patients?id=${id}`)
    if (!response) throw new Error('Failed to fetch data');
    return response.json()
  } catch (error) {
    console.error(error)
    return { patients: [] } // Default return in case of error
  }
}
async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const data = await getData({ id: user?._id});

  if (user?.role === "Doctor") {
    return <DoctorPatients />
  }

  return <TableData appointmentTable={data.patients} />
 
}

export default page
