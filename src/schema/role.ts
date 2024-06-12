import z from 'zod';

export const RoleVerified = z.object({

    name: z.string().min(2, "First name must be required"),
    lastname: z.string().min(0, "Last name must be required"),
    email: z.string().email("Invalid email address").min(5, "Email must be required").max(50, "Email must be required"), // Adjusted max length for realistic email validation
    password: z.string().min(5, "Password must be required"),
    confirmPassword: z.string().min(5, "Confirm password must be required").max(10, "Confirm password must be required"),
    address: z.string().min(5, "Address must be required"),
    contactnumber: z.string().regex(/^\d{5,10}$/, "Phone number must be 10 digits"), // Adjusted to string for precise length validation
    role: z.string().min(1, "Role must be required"),
})
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Error message will appear at confirmPassword field
    });