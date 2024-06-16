'use client'

import React from 'react';
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react';

const DeleteAppointment = ({ id }:any) => {
    const router = useRouter();
    // console.log('id', id)
    const removeItem = async () => {
        const result = await Swal.fire({
          title: "Are you sure?",
        //   text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        });
      
        if (result.isConfirmed) {
          const res = await fetch(`/api/delete-appointment?id=${id}`, {
            method: "DELETE",
          });
      
          if (res.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Patient  has been deleted.",
              icon: "success"
            });
            // Assuming you have a router instance available, use it to refresh the page
            router.refresh();
          } else {
            Swal.fire({
              title: "Error",
              text: "Failed to delete the item.",
              icon: "error"
            });
          }
        }
      };
      
    return <div onClick={removeItem} className=' cursor-pointer '>
     
        <Trash2/>
    </div>
}
export default DeleteAppointment;