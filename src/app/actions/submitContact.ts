'use server'

import { z } from 'zod'

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContact(prevState: any, formData: FormData) {
    const validatedFields = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Send.',
        }
    }

    // Simulate sending email (Replace with Resend/SendGrid/etc.)
    try {
        // await sendEmail(...) 
        console.log("Saving to KV or sending email:", validatedFields.data);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        return { message: 'Message sent successfully!' }
    } catch (error) {
        return { message: 'Database Error: Failed to send message.' }
    }
}
