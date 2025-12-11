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

    // Send email using Resend
    try {
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
            console.error("RESEND_API_KEY is not set");
            // Fallback for development/testing without key
            console.log("Simulated Email:", validatedFields.data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { message: 'Message sent successfully! (Simulated Mode)' };
        }

        const { Resend } = await import('resend');
        const resend = new Resend(resendApiKey);

        const { name, email, message } = validatedFields.data;

        await resend.emails.send({
            from: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
            to: process.env.CONTACT_EMAIL_TO || 'delivered@resend.dev', // Replace with your receiving email
            subject: `New Contact Form Submission from ${name}`,
            html: `
        <h2>New Message from WebABC Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; margin-left: 0;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
      `
        });

        return { message: 'Message sent successfully!' }
    } catch (error) {
        console.error("Resend Error:", error);
        return { message: 'Failed to send message. Please try again later.' }
    }
}
