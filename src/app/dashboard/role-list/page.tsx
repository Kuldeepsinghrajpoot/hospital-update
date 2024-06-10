'use client'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import { AddNewRole } from '../add-new-role/page'

export default function Dashboard({ data }: { data: any }) {
    return (
        <div>
            <div className='pb-14'>
                <h1 className=' text-2xl py-5  font-bold'>Role List</h1>

                <div>
                    A role provided access to predefined menus and features so that depending on
                </div>
                <div>

                    assigned role an administrator can have access to what user needs.
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 '>
                <Card className="md:col-span-1 bg-muted/40" x-chunk="dashboard-05-chunk-0">
                    <CardHeader className="pb-3">
                        {/* Administrator */}
                        <div className=' flex justify-between'>
                            <CardTitle>Administrator</CardTitle>
                            <img className=' h-10 w-10 rounded-full' src="https://hospital-bay-rho.vercel.app/_next/image?url=%2Fimg%2Favatars%2F5.png&w=128&q=75" alt="" />
                        </div>
                        <CardDescription className="max-w-lg text-balance leading-relaxed py-2">
                            Total Number of Admins: {data.Admin + 1}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button > <Link href={""}>visit page</Link></Button>
                    </CardFooter>
                </Card>
                <Card className="md:col-span-1 bg-muted/40" x-chunk="dashboard-05-chunk-0">
                    <CardHeader className="pb-3">
                        <div className=' flex justify-between'>
                            <CardTitle>Manager</CardTitle>
                            <img className=' h-10 w-10 rounded-full' src="https://hospital-bay-rho.vercel.app/_next/image?url=%2Fimg%2Favatars%2F5.png&w=128&q=75" alt="" />
                        </div>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Total Number of Managers: {data.managers}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button > <Link href={""}>visit page</Link></Button>
                    </CardFooter>
                </Card>
                {/* cards */}
                <Card className="md:col-span-1 bg-muted/40" x-chunk="dashboard-05-chunk-0">
                    <CardHeader className="pb-3">

                        <div className=' flex justify-between'>
                            <CardTitle>Doctor</CardTitle>
                            <img className=' h-10 w-10 rounded-full' src="https://hospital-bay-rho.vercel.app/_next/image?url=%2Fimg%2Favatars%2F5.png&w=128&q=75" alt="" />
                        </div>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Total Number of Doctors: {data.doctors}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button > <Link href={""}>visit page</Link></Button>

                    </CardFooter>
                </Card>

                {/* bottom three  */}
                <Card className="md:col-span-1 bg-muted/40" x-chunk="dashboard-05-chunk-0">
                    <CardHeader className="pb-3">
                        <div className=' flex justify-between'>
                            <CardTitle>Patients</CardTitle>
                            <img className=' h-10 w-10 rounded-full' src="https://hospital-bay-rho.vercel.app/_next/image?url=%2Fimg%2Favatars%2F5.png&w=128&q=75" alt="" />
                        </div>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Total Number of Patients: {data.appointments}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button > <Link href={""}>visit page</Link></Button>

                    </CardFooter>
                </Card>
                <Card className="md:col-span-1 bg-muted/40" x-chunk="dashboard-05-chunk-0">
                    <CardHeader className="pb-3">
                        <div className=' flex justify-between'>
                            <CardTitle>User</CardTitle>
                            <img className=' h-10 w-10 rounded-full' src="https://hospital-bay-rho.vercel.app/_next/image?url=%2Fimg%2Favatars%2F5.png&w=128&q=75" alt="" />
                        </div>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Total Number of Users: {data.user}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button > <Link href={""}>visit page</Link></Button>

                    </CardFooter>
                </Card>
                {/* cards */}
                <Card className="md:col-span-1 bg-muted/40" x-chunk="dashboard-05-chunk-0">
                    <CardHeader className="pb-3">
                        <div className=' flex justify-between'>
                            <CardTitle>Add New Role</CardTitle>
                            <img className=' h-10 w-10 rounded-full' src="https://hospital-bay-rho.vercel.app/_next/image?url=%2Fimg%2Favatars%2F5.png&w=128&q=75" alt="" />
                        </div>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Add new role to the system
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        {/* <Button >Add  New Role</Button> */}
                        <AddNewRole/>

                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}


