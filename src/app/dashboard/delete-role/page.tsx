'use client'

import React from 'react';
import Swal from 'sweetalert2'
import { useRouter,usePathname } from 'next/navigation'
import { Trash2 } from 'lucide-react';
const DeleteRole = ({ id }:any) => {
    const router = useRouter();
    const searchParams = usePathname();
  
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
          const res = await fetch(`/api/admin/delete-role?id=${id}/${searchParams.split('/').filter(Boolean).pop()}`, {
            method: "DELETE",
          });
      const response = await res.json();
          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: response.message,
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
        {/* <i class="ti ti-trash"></i> */}
        <Trash2/>
    </div>
}
export default DeleteRole;