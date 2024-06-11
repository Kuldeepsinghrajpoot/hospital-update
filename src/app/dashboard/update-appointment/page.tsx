'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Update } from './update';
import { useSearchParams } from 'next/navigation';

// Define the type for your data
interface AppointmentData {
    Name?: string;
    Age?: string;
    Gender?: string;
    Doctor?: string;
    Phone?: string;
    Address?: string;
    // appointmentDoctorName?: string[]; // Uncomment if needed
}

interface DoctorData {
    name: string;
    lastname: string;
}
const UpdateAppointment = ({userId}:any) => {
    const searchParams = useSearchParams();
    const search = searchParams.get('id');
console.log('idwersserewreeeeeeeee',userId)
    const [data, setData] = useState<AppointmentData | null>(null);
    const [doctor, setDoctor] = useState<DoctorData | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`/api/appointment/update-appointment?id=${userId}`);
                    const result: AppointmentData = response.data.appointment;
                    setData(result);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [userId]);

    // finding the doctors
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`/api/get-role-based-detiails/get-doctor-to-appointment`);
                    const result: DoctorData = response.data.doctor;
                    setDoctor(result);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, []);

    // Only render the Update component if data is available
    if (!data) {
        return <p>{data}</p>; // Or a loading spinner if preferred
    }

    return (
        <>
            <Update
                name={data?.Name||""}
                age={data?.Age||""}
                gender={data?.Gender||""}
                doctor={data?.Doctor||""}
                phone={data?.Phone||""}
                address={data?.Address||""}
                DoctorName={data?.Doctor||""} // Uncomment if needed
                doctorList={doctor||""}
                id={userId}
            />
        </>
    );
};

export default UpdateAppointment;
