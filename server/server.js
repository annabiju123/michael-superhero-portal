import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/send-request', async (req, res) => {
    console.log('📩 API request received:', req.body);

    try {
        const {
            name,
            age,
            location,
            email,
            problem
        } = req.body;

        // Basic validation
        if (!name || !email || !problem) {
            return res.status(400).json({
                success: false,
                message: 'Please provide your name, email and problem.'
            });
        }

        if (!process.env.RESEND_API_KEY) {
            console.error('❌ RESEND_API_KEY is missing.');

            return res.status(500).json({
                success: false,
                message: 'Email service is not configured.'
            });
        }

        if (!process.env.NOTIFY_EMAIL) {
            console.error('❌ NOTIFY_EMAIL is missing.');

            return res.status(500).json({
                success: false,
                message: 'Notification email is not configured.'
            });
        }

        const timestamp = new Date().toLocaleString();

        // --------------------------------------------------
        // EMAIL 1 — CANDIDATE NOTIFICATION
        // --------------------------------------------------

        const candidateEmailText = `
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

        const candidateResponse = await fetch(
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
                    text: candidateEmailText
                })
            }
        );

        const candidateData = await candidateResponse.json();

        if (!candidateResponse.ok) {
            console.error(
                '❌ Candidate email failed:',
                candidateData
            );

            return res.status(500).json({
                success: false,
                message: 'Could not send the notification email.'
            });
        }

        console.log(
            `📧 Candidate notification sent for ${name}`
        );

        console.log(
            'Candidate email ID:',
            candidateData.id
        );

        // --------------------------------------------------
        // EMAIL 2 — VISITOR CONFIRMATION
        // --------------------------------------------------

        const visitorEmailText = `
Hello ${name},

Thank you for reaching out to Michael. 🪽

Your request has been received successfully.

Here is a summary of what you shared:

-------------------------
Your Details
-------------------------
Name: ${name}
Age: ${age || 'Not provided'}
Location: ${location || 'Not provided'}
Email: ${email}
Submitted: ${timestamp}

-------------------------
Your Request
-------------------------
${problem}

-------------------------

Michael has heard you.

You don't have to carry everything alone.
Take a breath. You are not alone. ✦

With hope,
Michael
Guardian of Hope
        `;

        let visitorEmailSent = false;
        let visitorEmailId = null;

        try {
            const visitorResponse = await fetch(
                'https://api.resend.com/emails',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: 'Michael Portal <onboarding@resend.dev>',
                        to: [email],
                        subject: 'Michael Has Received Your Request 🪽',
                        text: visitorEmailText
                    })
                }
            );

            const visitorData = await visitorResponse.json();

            if (visitorResponse.ok) {
                visitorEmailSent = true;
                visitorEmailId = visitorData.id;

                console.log(
                    `📨 Visitor confirmation sent to ${email}`
                );

                console.log(
                    'Visitor email ID:',
                    visitorData.id
                );
            } else {
                console.warn(
                    '⚠️ Visitor confirmation could not be sent:',
                    visitorData
                );
            }

        } catch (visitorError) {
            console.warn(
                '⚠️ Visitor email error:',
                visitorError
            );
        }

        // --------------------------------------------------
        // FINAL RESPONSE
        // --------------------------------------------------

        return res.status(200).json({
            success: true,
            message: 'Request successfully received by Michael!',

            candidateEmailSent: true,
            candidateEmailId: candidateData.id,

            visitorEmailSent,
            visitorEmailId
        });

    } catch (error) {
        console.error('❌ Email error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to process the request.'
        });
    }
});

app.listen(PORT, () => {
    console.log(
        `🪽 Michael Backend running at http://localhost:${PORT}`
    );
});