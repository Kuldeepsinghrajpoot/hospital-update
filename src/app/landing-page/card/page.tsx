import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function MedicalServicesSection() {
    const services = [
        { title: "Cardiology", description: "Comprehensive heart care services." },
        { title: "Intensive Checkup", description: "Detailed health checkup programs." },
        { title: "Dental Care", description: "Complete dental care services." },
        { title: "Ophthalmology", description: "Eye care and vision improvement." }
    ];

    return (
        <div>
            <h1 className=" flex justify-center font-bold text-xl py-5"> Our services</h1>
            <div className=" grid grid-cols-4 pb-10 border-none gap-10 px-5">

                {services.map((service, index) => (
                    <Card key={index} className="shadow-md rounded-md p-6 text-center">
                        <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                        <CardDescription className="text-foreground">{service.description}</CardDescription>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    );
}
