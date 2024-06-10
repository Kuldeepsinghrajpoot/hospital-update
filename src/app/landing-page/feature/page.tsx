import React from 'react';
import Image from 'next/image';

function Features() {
    return (
        <div className="p-4 md:p-8  text-gray-700">
            {/* Heading */}
            <h1 className="text-3xl font-semibold bg-blue-700 py-5 text-white text-center mb-8 rounded-lg">
                Our Facility
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image Card */}
                <div className="flex justify-center items-center overflow-hidden p-4">
                    <Image 
                        src='/doctor/d8.webp'
                        alt="Diagnostic Services" 
                        width={640} 
                        height={480} 
                        className="object-cover w-full h-auto rounded-lg"
                    />
                </div>
                
                {/* Details Card */}
                <div className="flex flex-col justify-center items-center text-center space-y-6 p-6">
                    <h2 className="text-3xl font-bold">Thousands Of Specialities For Any Type Diagnostic.</h2>
                    <p className="text-blue-700 text-lg font-bold">Our Surgical staff is second to none. Dedicated to providing the highest quality surgical care and service:</p>
                    <ul className="list-none space-y-2 text-left">
                        <li className="flex items-center">
                            <input  
                                type="checkbox" 
                                id="appendicitis" 
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                defaultChecked
                            />
                            <label htmlFor="appendicitis" className="ml-2">Appendicitis</label>
                        </li>
                        <li className="flex items-center">
                            <input  
                                type="checkbox" 
                                id="hernia" 
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                defaultChecked
                            />
                            <label htmlFor="hernia" className="ml-2">Hernia</label>
                        </li>
                        <li className="flex items-center">
                            <input  
                                type="checkbox" 
                                id="surgical-emergencies" 
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                defaultChecked
                            />
                            <label htmlFor="surgical-emergencies" className="ml-2">Surgical Emergencies</label>
                        </li>
                        <li className="flex items-center">
                            <input  
                                type="checkbox" 
                                id="laparoscopic-surgery" 
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                defaultChecked
                            />
                            <label htmlFor="laparoscopic-surgery" className="ml-2">Laparoscopic Surgery</label>
                        </li>
                        <li className="flex items-center">
                            <input  
                                type="checkbox" 
                                id="surgery-fistulas-hemorrhoids" 
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                defaultChecked
                            />
                            <label htmlFor="surgery-fistulas-hemorrhoids" className="ml-2">Surgery for Fistulas and Hemorrhoids</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Features;
