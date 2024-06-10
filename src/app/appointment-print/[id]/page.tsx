import axios from 'axios'
import React from 'react'
import Invoice from './print';

async function getAppointment(id:string) {
    try {
        const response = await axios.get(`${process.env.URI}/api/appointment/get-appointment/${id}`);
    return response.data.appointment;
    } catch (error) {
       console.log(error) 
    }
}
async function page({params}:any) {
    const {id} = params
    const data = await getAppointment(id)

  return (
    <div>
      <Invoice name={data.Name} doctor={data.Doctor} appointmentDate={data.createdAt} appointmentId={data.AppointmentId} phone={data.Phone} age={data.Age} gender={data.Gender} address={data.Address} />
    </div>
  )
}

export default page
