/**
 * Netlify Serverless Function: Contact Form Handler
 * Routes emails to appropriate team members based on selected office
 */

const OFFICE_EMAIL_MAP = {
    'kingman': 'office@canyonstateaz.com',
    'phoenix': 'John@canyonstateaz.com',
    'lasvegas': 'Andrew@canyonstatenv.com'
};

export const handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body);
        const { name, company, email, phone, city, state, closestOffice, projectType, timeline, message } = data;

        // Validate required fields
        if (!name || !email || !phone || !closestOffice || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Get recipient based on office selection
        const recipient = OFFICE_EMAIL_MAP[closestOffice];
        if (!recipient) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid office selection' })
            };
        }

        // Format email content
        const emailHtml = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Closest Office:</strong> ${closestOffice.charAt(0).toUpperCase() + closestOffice.slice(1)}</p>
            <hr />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Location:</strong> ${city}, ${state}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br />')}</p>
        `;

        // Send email via Resend
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Canyon State Contact <onboarding@resend.dev>',
                to: recipient,
                reply_to: email,
                subject: `New Inquiry from ${name} - ${projectType}`,
                html: emailHtml
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Resend API error:', errorData);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to send email' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email sent successfully' })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
