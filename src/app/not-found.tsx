'use client'
import React from 'react';
import Img from 'next/image'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const NotFound = () => {
  const imageLoader = () => {
    return `/doctor/page-misc-error.png`
  }
  return (
    <>
      <div className=" text-center    mt-10">
      <div className="misc-wrapper">
        <h2 className="mb-1 mt-4">Page Not Found :(</h2>
        <p className="mb-4 mx-2">Oops! 😖 The requested URL was not found on this server.</p>
       
       <Button variant={'default'}>

        <Link href="/" className=" text-foreground hover:border-transparent rounded ">Back to home</Link>
       </Button>
        <div className="mt-4 flex  justify-center items-center">
          <Img
            src="/doctor/page-misc-error.png"
            alt="page-error"
            width={225}
            height={100}
            className="img-fluid"
            loader={imageLoader}
            loading = 'lazy'
           
          />
        </div>
      </div>
    </div>
 
 
    </>
  );
}

export default NotFound;