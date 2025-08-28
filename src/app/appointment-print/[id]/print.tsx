'use client';

import Img from 'next/image';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { QRCode, Space } from 'antd';
import { usePathname  } from 'next/navigation'
import { Button } from '@/components/ui/button';

interface InvoiceProps {
  name: string;
  doctor: string;
  appointmentDate: string;
  appointmentId: string;
  phone: string;
  age: string;
  gender: string;
  address: string;
  url:string
}

const Invoice = ({ name, doctor, appointmentDate, appointmentId, phone, age, gender, address,url }: InvoiceProps) => {
  const router = useRouter();
  const pathname = usePathname()
  useEffect(() => {
    if (!name || !doctor || !appointmentDate || !phone || !age || !gender || !address) {
      router.refresh();
    }
    // setTimeout(() => { window.print() }, 1000);
  }, [router, name, doctor, appointmentDate, phone, age, gender, address]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 7);
    return date.toDateString();
  };

  const issueDate = (dateStr: string) => new Date(dateStr).toDateString();
  const formatTime = (dateStr: string) => new Date(dateStr).toLocaleTimeString();
  const { themes } = useTheme();
  const [text, setText] = React.useState(`${process.env.NEXT_PUBLIC_URI}/${pathname}`);
  console.log(text)

  return (
    <div className="min-h-screen h-full max-h-screen dark:red-900 bg-white text-gray-500 print:max-h-full print:h-auto p-4">

      <div className="invoice-print bg-white text-gray-500 h-full print:h-auto">
        <div className="items-center h-full bg-white print:h-auto">
          <div className="flex justify-between bg-white">
            <div className="flex items-center gap-2">
              <Img src="/favicon.png" width={50} height={50} alt="Logo" />
              <span className="app-brand-text font-bold text-2xl">Uday Clinic</span>
            </div>
            <div>
              <div className="text-right">
                <h4 className="font-bold">Appointment No. #{appointmentId}</h4>
                <div>
                  <span className="text-gray-500">Till Valid</span>
                  <span className="font-bold">: {formatDate(appointmentDate)}</span>
                </div>

              </div>
            </div>
          </div>
          <div className='flex justify-between'>

            <div>

              <p className="mb-1">एफ-9, 10, फर्स्ट फ्लोर, वीरांगना जे.डी.ए. कॉम्पलैक्स, मेडिकल कॉलेज के पास,</p>
              <p className="mb-1">झॉसी, झॉसी, उत्तर प्रदेश, भारत</p>
              <p className="mb-0">+91 7398391052</p>
            </div>
            <div>
              <span className='h-24 w-24  '>

                <Space direction="horizontal" align="center" className=' border-none'>
                  <QRCode value={text || '-'} size={90} style={{"border":"none"}} />

                </Space>
              </span>
            </div>
          </div>
        </div>
        <hr className='border-1 border-gray-300 my-2' />
        <div className="grid grid-cols-2 md:grid-cols-2 border-0 justify-between items-center">
          <div className="w-full border-none relative h-max ">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border-0 capitalize font-bold">Patient Name:</td>
                  <td className="border-0 w-fit capitalize">{name}</td>
                </tr>
                <tr>
                  <td className="border-0 capitalize font-bold">Address:</td>
                  <td className="border-0 capitalize">{address}</td>
                </tr>
                <tr>
                  <td className="border-0 capitalize font-bold">Doctor Name:</td>
                  <td className="border-0 capitalize">Dr. {doctor}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="relative">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border-0 capitalize font-bold">Date Issued:</td>
                  <td className="border-0">
                    {issueDate(appointmentDate)}, {formatTime(appointmentDate)}
                  </td>
                </tr>
                <tr>
                  <td className="border-0 capitalize font-bold">Age/Gender:</td>
                  <td className="border-0">
                    {age} Years / {gender}
                  </td>
                </tr>
                <tr>
                  <td className="border-0 capitalize font-bold">Phone:</td>
                  <td className="border-0">{phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className=" border-gray-50">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border-b border-gray-300 text-left">Charges Name</th>
                <th className="p-2 border-b border-gray-300 text-left">Description</th>
                <th className="p-2 border-b border-gray-300 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2  border-gray-300">For Consultation Fee</td>
                <td className="p-2  border-gray-300">Dr. {doctor}</td>
                <td className="p-2  border-gray-300 text-right">₹300.00</td>
              </tr>
              <tr>
                <td colSpan={2} className="p-2 border-t border-gray-300">
                  <div className="flex justify-between">
                    <div>
                      <p><span className="font-semibold">Payment Mode:</span> CASH</p>
                      <p><span className="font-semibold">Received a sum of rupees three hundred</span></p>
                    </div>
                    <div>
                      <div className="text-right font-semibold">Subtotal</div>
                      <div className="text-right font-semibold">Total</div>
                    </div>

                  </div>
                </td>
                <td className="p-2 border-t border-gray-300 text-right"><div>
                  <div>₹300.00</div>
                  <div>₹300.00</div>
                </div></td>
              </tr>
              {/* <tr>
                <td colSpan={2} className="p-2 text-right font-semibold border border-gray-300">Total:</td>
                <td className="p-2 text-right font-semibold border border-gray-300">₹300.00</td>
              </tr> */}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <span className="font-bold">Note:</span>
          <span> Your appointment will be valid for 7 days only.</span>
          <br />
        </div>

      </div>
      <div className="flex justify-center mt-4 print:hidden">
        <Button onClick={() => window.print()}>
          <span>Print</span>
        </Button>
      </div>
      <style jsx global>{`
        @media print {
          body, html, .min-h-screen, .max-h-screen, .h-full, .invoice-print {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
          }
          .print:h-auto {
            height: auto !important;
          }
          .print:max-h-full {
            max-height: none !important;
          }
          @page {
            size: auto;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Invoice;
