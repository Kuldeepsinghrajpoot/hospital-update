'use client'
import Image from 'next/image';
import React from 'react';
import { Input, QRCode, Space } from 'antd';
function Footer() {
    const [text, setText] = React.useState('https://hospital-bay-rho.vercel.app/');

    return (
        <footer className="bg-gray-800 border-gray-500 text-gray-200 py-24">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                    <p className="mb-4">Please feel free to contact our friendly reception staff with any medical enquiry, or call</p>
                    <p className="font-bold">+917398391052</p>
                </div>

                {/* Subscribe Newsletter */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Subscribe Newsletter</h3>
                    <form className=' flex justify-end gap-5'>
                        <input
                            type="email"
                            className="w-full p-2 mb-4 bg-gray-700 text-gray-200 rounded"
                            placeholder="Your email address"
                        />
                        <button
                            type="submit"
                            className="w-56 h-10 bg-blue-600 text-white py-2 rounded"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Grid Section with Border */}
            <div className='grid md:grid-cols-3 md:py-4 py-2 grid-cols-1'>
                {/* Opening Hours */}
                <div className='container flex justify-center content-center items-center  mx-auto mt-8 px-4 border-r border-gray-500'>
                    <div className='flex flex-col justify-center items-center'>
                        <Image src={'/favicon.png'} width={100} height={100} alt='image' />
                        <p className="text-center px-10 py-5">There’s nothing in this story to make us think he was dreaming about riches.</p>
                    </div>
                </div>
                <div className="container mx-auto mt-8 px-20  border-r border-gray-500">
                    <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
                    <ul className="space-y-5 border-gray-400 w-full">
                        <li className="flex justify-between">Mon - Tue <span>08:30 - 18:30</span></li>
                        <li className="flex justify-between">Wed - Thu <span>08:30 - 18:30</span></li>
                        <li className="flex justify-between">Friday <span>08:30 - 18:30</span></li>
                        <li className="flex justify-between">Saturday <span>08:30 - 18:30</span></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="container mx-auto mt-8 px-18 space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Contact</h3>
                    <p>एफ-9, 10, फर्स्ट फ्लोर, वीरांगना जे.डी.ए. कॉम्पलैक्स, मेडिकल कॉलेज के पास, झॉसी झॉसी, उत्तर प्रदेश, भारत</p>
                    <p>Tel. <a href="tel:+917398391052">+(91) 7398391052</a></p>
                    <p>Email: <a href="mailto:udaydivyaclinic@gmail.com">udaydivyaclinic@gmail.com</a></p>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="container flex justify-between  mx-auto mt-8 px-4  items-center">
                <div>
                    <p>© Since 2024 - {new Date().getFullYear()} Student Power Club.</p>
                    <p>Mob - 9144462693</p>
                </div>
                <Space direction="horizontal" align="center" className='bg-white'>
                    <QRCode value={text || '-'} />

                </Space>
                {/* Your Logo Component Goes Here */}
            </div>
        </footer>
    );
}

export default Footer;
