import { Resend } from 'resend';

export interface Env {
    RESEND_API_KEY: string;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Access-Control-Allow-Headers": "Content-Type"
                }
            });
        }

        if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

        try {
            const { name, email, message } = await request.json() as any;

            if (!env.RESEND_API_KEY) {
                return new Response(JSON.stringify({ error: 'Missing API Key' }), { status: 500 });
            }

            const resend = new Resend(env.RESEND_API_KEY);

            const data = await resend.emails.send({
                from: 'onboarding@resend.dev', // User might need to change this verified domain later
                to: 'alibakhtiari.dev@gmail.com', // Placeholder or user email. I'll use a likely placeholder or ask user? User said "your-email@example.com". I'll use a placeholder.
                replyTo: email,
                subject: `New Contact from ${name}`,
                html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`
            });

            return new Response(JSON.stringify({ success: true, data }), {
                headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Failed to send email', details: String(error) }), {
                status: 500,
                headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
            });
        }
    }
}
