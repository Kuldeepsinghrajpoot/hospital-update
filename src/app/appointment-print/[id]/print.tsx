'use client';

import Img from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InvoiceProps {
  name: string;
  doctor: string;
  appointmentDate: string;
  appointmentId: string;
  phone: string;
  age: string;
  gender: string;
  address: string;
}

const Invoice = ({ name, doctor, appointmentDate, appointmentId, phone, age, gender, address }: InvoiceProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!name || !doctor || !appointmentDate || !phone || !age || !gender || !address) {
      router.refresh();
    }
    // Uncomment below lines if you want to automatically print and close the window
    window.print();
    // window.close();
  }, [router, name, doctor, appointmentDate, phone, age, gender, address]);
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString();
  };
  const issueDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

  const formatTime = (dateStr: string) => new Date(dateStr).toLocaleTimeString();

  return (
    <div className="invoice-print bg-white text-gray-500 p-2 w-screen h-screen">
      <div className="flex justify-between items-center ">
        <div>
          <div className="flex items-center  gap-2">
            <Img src="/favicon.png" width={50} height={50} alt="Logo" />
            <span className="app-brand-text font-bold text-2xl">Uday Clinic</span>
          </div>
          <p className="mb-1">एफ-9, 10, फर्स्ट फ्लोर, वीरांगना जे.डी.ए. कॉम्पलैक्स, मेडिकल कॉलेज के पास,</p>
          <p className="mb-1"> झॉसी,झॉसी, उत्तर प्रदेश, भारत</p>
          <p className="mb-0">+91 7398391052</p>
        </div>
        <div className="text-right">
          <h4 className="font-bold">Appointment No. #{appointmentId}</h4>
          <div>
            <span className="text-gray-500">Till Valid</span>
            <span className="font-bold">: {formatDate(appointmentDate)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2  ">
        <div>
          <Table className="w-full border-none">
            <TableBody>
              <TableRow>
                <TableCell className="border-1 font-semibold ">Patient Name</TableCell>
                <TableCell className="">: {name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className=" font-semibold ">Address</TableCell>
                <TableCell className="">: {address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className=" font-semibold ">Doctor Name</TableCell>
                <TableCell className="">: Dr. {doctor}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>
          <Table className="w-full bottom-0">
            <TableBody>
              <TableRow>
                <TableCell className=" font-semibold ">Date Issued</TableCell>
                <TableCell className="">: {issueDate(appointmentDate)}, {formatTime(appointmentDate)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className=" font-semibold ">Age/Gender</TableCell>
                <TableCell className="">: {age} Years / {gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className=" font-semibold ">Phone</TableCell>
                <TableCell className="">: {phone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="">
        <Table className="table-auto w-full border border-gray-300 border-collapse">

          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="p-2 border border-gray-300">Charges Name</TableHead>
              <TableHead className="p-2 border border-gray-300">Description</TableHead>
              <TableHead className="p-2 border border-gray-300 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border border-gray-300 p-2">For Consultation Fee</TableCell>
              <TableCell className="border border-gray-300 p-2">Dr. {doctor}</TableCell>
              <TableCell className="border border-gray-300 p-2 text-right">300.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className="p-2 border border-gray-300">
                <div className=' flex justify-between'>
                  <div> <p><span className="font-semibold">Payment Mode:</span> CASH</p>
                    <p><span className="font-semibold">Received a sum of rupees three hundred</span></p></div>
                  <div className=' text-right font-semibold  '>Subtotal:</div>
                </div>
              </TableCell>
              <TableCell className="p-2 border border-gray-300 text-right">300.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className="p-2 text-right font-semibold border border-gray-300">Total:</TableCell>
              <TableCell className="p-2 text-right font-semibold border border-gray-300">300.00</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </div>

      <div className="">
        <span className="font-bold">Note:</span>
        <span> Your appointment is valid for 7 days only.</span>
        <br />
        <span> Thank you for visting !! </span>
      </div>
    </div>
  );
}

export default Invoice;
