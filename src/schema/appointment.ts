import z from 'zod';

export const AppointmentVerified = z.object({
  Name: z.string()
    .min(2, { message: "Name must be at least 5 characters long" })
    .max(100, { message: "Name must be at most 100 characters long" }),
  
  Age: z.string()
    .min(1, { message: "Age must be at least 1" })
    .max(100, { message: "Age must be at most 100" }),
  
  Gender: z.enum(['Male', 'Female', 'Other'], { message: "Gender must be 'Male', 'Female', or 'Other'" }),
  
  Doctor: z.string()
    .min(2, { message: "Doctor's name must be at least 2 characters long" })
    .max(50, { message: "Doctor's name must be at most 50 characters long" }),
  
  Phone: z.string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
  
 
  
  Address: z.string()
    .min(3, { message: "Address must be at least 10 characters long" })
    .max(100, { message: "Address must be at most 100 characters long" })
});
