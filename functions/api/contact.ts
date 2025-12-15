import { Resend } from 'resend';

interface Env {
    RESEND_API_KEY: string;
}

export const onRequestPost = async ({ request, env }: { request: Request, env: Env }) => {
    try {
        const { name, email, message } = await request.json() as any;

        if (!env.RESEND_API_KEY) {
            return new Response(JSON.stringify({ error: 'Missing API Key' }), { status: 500 });
        }

        const resend = new Resend(env.RESEND_API_KEY);

        const data = await resend.emails.send({
            from: 'onboarding@resend.dev', // Update this if you have a verified domain
            to: 'alibakhtiari.dev@gmail.com',
            replyTo: email,
            subject: `New Contact from ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`
        });

        return new Response(JSON.stringify({ success: true, data }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to send email', details: String(error) }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
