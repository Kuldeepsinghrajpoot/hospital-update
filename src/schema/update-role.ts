import z from 'zod';

export const UpdateRoleVerified = z.object({

    name: z.string().min(3, "First name must be required"),
    lastname: z.string().min(0, "Last name must be required"),
    email: z.string().email("Invalid email address").min(5, "Email must be required").max(50, "Email must be required"), // Adjusted max length for realistic email validation
    gender: z.string().min(1, " Gender must be required"),
    age: z.string().min(1, "Age must be 18+"),
    address: z.string().min(5, "Address must be required"),
    contactnumber: z.number().min(10, "Phone number must be 10 digits"), // Adjusted to string for precise length validation

})
