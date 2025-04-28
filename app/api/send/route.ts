import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(request: Request) {
    if (!process.env.RESEND_API_KEY) {
        return Response.json({ error: 'Missing Resend API Key' }, { status: 500 });
    }

    try {
        // Get data from request body
        const { name, email, message } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Message from Portfolio <onboarding@resend.dev>',
            to: ['nayankatiyara123@gmail.com'],
            subject: `${name}`,
            react: EmailTemplate({ name, email, message }) as React.ReactElement,
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json({ success: true, data });
    } catch (error) {
        return Response.json({ error: 'Failed to send email' }, { status: 500 });
    }
}