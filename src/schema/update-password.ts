import { z } from "zod";

export const updatePassword = z.object({
    
    password: z.string().min(5, "Password must be required"),
    Newpassword: z.string().min(5, "Password must be required"),

    confirmPassword: z.string().min(5, "Confirm password must be required").max(10, "Confirm password must be required"),

})
    .refine(data => data.Newpassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Error message will appear at confirmPassword field
    
});