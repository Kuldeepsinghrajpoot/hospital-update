import Image from 'next/image';
import React from 'react';

function Introduction() {
    return (
        <div className='h-full w-full text-gray-500'>
            <div className=''>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='h-full w-full flex justify-center items-center p-4'>
                        <div className='text-center space-y-4'>
                            <p className='text-[11vh]   font-bold text-black px-6'>
                                Find <span className='text-blue-700'>Best Clinic</span> To Get Solutions.
                            </p>
                            <p className='text-black text-xl px-10'>
                                Health is one of the most important things for us, therefore immediately check your health for your good. Appointment
                            </p>
                        </div>
                    </div>
                    <div className='flex justify-center items-center p-4'>
                        <Image src='/doctor/doctor.avif' alt='doctor' className='object-cover mix-blend-multiply' width={500} height={500} layout="responsive" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduction;
