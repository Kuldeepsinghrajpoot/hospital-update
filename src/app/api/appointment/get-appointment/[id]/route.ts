import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } =  await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Valid appointment ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const appointment = await Appointment.findById(id).select("-__v");

    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { appointment, message: "Appointment fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}