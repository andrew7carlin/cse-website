/**
 * Netlify Serverless Function: Contact Form Handler
 * Routes emails to appropriate team members based on selected office
 */

import { Resend } from 'resend';

const OFFICE_EMAIL_MAP = {
    'kingman': 'office@canyonstateaz.com',
    'phoenix': 'John@canyonstateaz.com',
    'lasvegas': 'Andrew@canyonstatenv.com'
};

const MAX_LENGTHS = {
    name: 100,
    company: 100,
    email: 254,
    phone: 30,
    city: 100,
    state: 50,
    closestOffice: 30,
    projectType: 50,
    timeline: 50,
    message: 5000
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s) =>
    String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

// Strip CR/LF to prevent header injection in subject / address fields.
const stripCrLf = (s) => String(s ?? '').replace(/[\r\n]+/g, ' ').trim();

const titleCase = (s) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        let data;
        try {
            data = JSON.parse(event.body || '{}');
        } catch {
            return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
        }

        // Honeypot — bots tend to autofill any field named "website".
        // Real users never see or touch it; if it's set, drop silently with a 200
        // so the bot doesn't learn it failed.
        if (data.website) {
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        }

        const { name, company, email, phone, city, state, closestOffice, projectType, timeline, message } = data;

        if (!name || !email || !phone || !closestOffice || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        for (const [field, max] of Object.entries(MAX_LENGTHS)) {
            const val = data[field];
            if (val != null && typeof val === 'string' && val.length > max) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: `Field "${field}" exceeds ${max} characters` })
                };
            }
        }

        if (!EMAIL_RE.test(email) || email.length > MAX_LENGTHS.email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid email address' })
            };
        }

        const recipient = OFFICE_EMAIL_MAP[closestOffice];
        if (!recipient) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid office selection' })
            };
        }

        const safe = {
            name: escapeHtml(name),
            company: escapeHtml(company) || 'Not provided',
            email: escapeHtml(email),
            phone: escapeHtml(phone),
            city: escapeHtml(city),
            state: escapeHtml(state),
            office: escapeHtml(titleCase(closestOffice)),
            projectType: escapeHtml(projectType),
            timeline: escapeHtml(timeline),
            message: escapeHtml(message).replace(/\n/g, '<br />')
        };

        const emailHtml = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Closest Office:</strong> ${safe.office}</p>
            <hr />
            <p><strong>Name:</strong> ${safe.name}</p>
            <p><strong>Company:</strong> ${safe.company}</p>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Phone:</strong> ${safe.phone}</p>
            <p><strong>Location:</strong> ${safe.city}, ${safe.state}</p>
            <p><strong>Project Type:</strong> ${safe.projectType}</p>
            <p><strong>Timeline:</strong> ${safe.timeline}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${safe.message}</p>
        `;

        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data: emailData, error } = await resend.emails.send({
            from: 'Canyon State Website <noreply@canyonstateaz.com>',
            to: [recipient],
            replyTo: stripCrLf(email),
            subject: stripCrLf(`New Inquiry from ${name} - ${projectType}`).slice(0, 150),
            html: emailHtml
        });

        if (error) {
            console.error('Resend API error:', error);
            return {
                statusCode: 502,
                body: JSON.stringify({ error: 'Failed to send email' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email sent successfully', id: emailData?.id })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
