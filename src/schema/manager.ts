import z from 'zod';

export const ManagerVerified = z.object({

  firstname: z.string().min(5, "First name must be between 5 and 10 characters").max(10, "First name must be between 5 and 10 characters"),
  lastname: z.string().min(5, "Last name must be between 5 and 10 characters").max(10, "Last name must be between 5 and 10 characters"),
  email: z.string().email("Invalid email address").min(5, "Email must be between 5 and 10 characters").max(50, "Email must be between 5 and 50 characters"), // Adjusted max length for realistic email validation
  password: z.string().min(5, "Password must be between 5 and 10 characters").max(10, "Password must be between 5 and 10 characters"),
  confirmPassword: z.string().min(5, "Confirm password must be between 5 and 10 characters").max(10, "Confirm password must be between 5 and 10 characters"),
  address: z.string().min(5, "Address must be between 5 and 10 characters").max(50, "Address must be between 5 and 50 characters"), // Adjusted max length for realistic address validation
  phone: z.string().regex(/^\d{5,10}$/, "Phone number must be between 5 and 10 digits"), // Adjusted to string for precise length validation
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Error message will appear at confirmPassword field
});