import axios from 'axios'
import React from 'react'
import Invoice from './print';
import NotFound from '@/app/not-found';

async function getAppointment(id:string) {
    try {
        const response = await axios.get(`${process.env.URI}/api/appointment/get-appointment/${id}`);
    return response.data.appointment;
    } catch (error) {
       console.log(error) 
    }
}
async function page({params}:any) {
    const {id} = await params
    const data = await getAppointment(id)
    if (!data) {
        return <div> <NotFound/> </div>
    }

  return (
    <div className='bg-green-900 dark:bg-red-900'>
      <Invoice name={data?.Name} url={id} doctor={data?.Doctor} appointmentDate={data?.createdAt} appointmentId={data?.AppointmentId} phone={data?.Phone} age={data?.Age} gender={data?.Gender} address={data?.Address} />
    </div>
  )
}

export default page
