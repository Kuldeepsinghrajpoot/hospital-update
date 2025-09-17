'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Update } from './update';

interface AppointmentData {
  Name?: string;
  Age?: string;
  Gender?: string;
  Doctor?: string;
  Phone?: string;
  Address?: string;
}

interface DoctorData {
  name: string;
  lastname: string;
}

interface PageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

const UpdateAppointment = ({ searchParams }: PageProps) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [paramsLoaded, setParamsLoaded] = useState(false);
  
  // Handle searchParams Promise
  useEffect(() => {
    const getSearchParams = async () => {
      const params = await searchParams;
      setUserId(params.id);
      setParamsLoaded(true);
    };
    getSearchParams();
  }, [searchParams]);

  const [data, setData] = useState<AppointmentData | null>(null);
  const [doctor, setDoctor] = useState<DoctorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [appointmentRes, doctorRes] = await Promise.all([
          axios.get(`/api/appointment/update-appointment?id=${userId}`),
          axios.get(`/api/get-role-based-detiails/get-doctor-to-appointment?id=${userId}`)
        ]);

        setData(appointmentRes.data.appointment || null);
        setDoctor(doctorRes.data.doctor || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (!paramsLoaded) {
    return <p>Loading...</p>;
  }

  if (!userId) {
    return <p>Missing appointment ID parameter.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No appointment data found.</p>;
  }

  return (
    <Update
      name={data.Name || ""}
      age={data.Age || ""}
      gender={data.Gender || ""}
      doctor={data.Doctor || ""}
      phone={data.Phone || ""}
      address={data.Address || ""}
      DoctorName={data.Doctor || ""}
      doctorList={doctor}  // keep consistent with type
      id={userId}
    />
  );
};

export default UpdateAppointment;
