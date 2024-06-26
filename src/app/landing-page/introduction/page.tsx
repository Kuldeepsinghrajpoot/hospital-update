import { Home, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function Introduction() {
   
    return (
        <div className='h-full md:md:w-full text-gray-500 bg-white  '>
            <div className=''>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='h-full md:w-full flex justify-center items-center md:p-4'>
                        <div className='text-center md:space-y-4'>
                            <p className='md:text-[11vh] text-5xl   font-bold text-black  md:px-6'>
                                Find <span className='text-blue-700'>Best Clinic</span> To Get Solutions.
                            </p>
                            <p className='text-gray-500  text-xl md:px-6'>
                                Health is one of the most important things for us, therefore immediately check your health for your good. Appointment
                            </p>
                        </div>
                    </div>
                    <div className=' bg-red-900  flex justify-center items-center p-4  bg-transparent'> {/* Example background */}
                        <Image
                            src='/doctor/doctor.webp'
                            alt='doctor'
                            className='object-cover bg-white   filter  p-8'
                            width={500}
                            height={500}
                            layout='responsive'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduction;
