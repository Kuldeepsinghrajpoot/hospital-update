import axios from "axios";
import LandingPage from "./landing-page";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth-option";

async function getDoctor({ id }: { id: string }) {
  try {
    const response = await axios.get(`${process.env.URI}/api/get-role-based-detiails/get-doctor-to-appointment?id=${id}`)
    if (!response) throw new Error('Failed to fetch data');
    return response.data
  } catch (error) {
    console.error(error)
    return null; // Return null instead of undefined
  }
}

export default async function page() {
  const doctor = await getDoctor({ id: "1" });
  
  // Handle the case where doctor is null or undefined
  const doctorData = doctor?.doctor || null;
  
  return (
    <div className="">
      <LandingPage doctor={doctorData} />
    </div>
  )
}
