export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed.'
        });
    }

    try {
        const {
            name,
            age,
            location,
            email,
            problem
        } = req.body;

        if (!name || !email || !problem) {
            return res.status(400).json({
                success: false,
                message: 'Please provide your name, email and problem.'
            });
        }

        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is missing.');

            return res.status(500).json({
                success: false,
                message: 'Email service is not configured.'
            });
        }

        if (!process.env.NOTIFY_EMAIL) {
            console.error('NOTIFY_EMAIL is missing.');

            return res.status(500).json({
                success: false,
                message: 'Notification email is not configured.'
            });
        }

        const timestamp = new Date().toLocaleString();

        const emailText = `
Someone Needs Michael's Help! 🪽

Visitor Details
-------------------------
Name: ${name}
Age: ${age || 'Not provided'}
Location: ${location || 'Not provided'}
Email: ${email}
Submission Time: ${timestamp}

Problem / Request
-------------------------
${problem}

-------------------------
Submitted through Michael's Superhero Portal
        `;

        const response = await fetch(
            'https://api.resend.com/emails',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: 'Michael Portal <onboarding@resend.dev>',
                    to: [process.env.NOTIFY_EMAIL],
                    subject: `Someone Needs Michael's Help - ${name}`,
                    text: emailText
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error('Resend error:', data);

            return res.status(500).json({
                success: false,
                message: 'Failed to send the request.'
            });
        }

        console.log(`Request received from ${name}`);
        console.log('Resend email ID:', data.id);

        return res.status(200).json({
            success: true,
            message: 'Request successfully sent to Michael!',
            emailId: data.id
        });

    } catch (error) {
        console.error('Email error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to process the request.'
        });
    }
}