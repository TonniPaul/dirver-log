const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const config = {
    service : 'gmail',
    auth : {
        user: process.env.SENDER_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
};

const transporter = nodemailer.createTransport(config);

const MailGenerator = new Mailgen({
    theme: 'default',
    product : {
        name: "Mailgen",
        link : 'https://mailgen.js/'
    }
});

const emailNotification = async (userEmail, triplog, req) => {
    const response = {
        body: {
            name : `${triplog.admin.name}`,
            intro: "New Triplog created!",
            table : {
                data : [
                    {
                        item : `<p>Triplog created by ${req.user.firstName + ' ' + req.user.lastName}</p>
                                <p>DateTime: ${triplog.updatedAt}</p>
                                <p>Origin: ${triplog.originAddress}</p>
                                <p>Destination: ${triplog.destinationAddress}</p>
                                <p>Distance: ${triplog.distance}</p>
                                <p>Vehicle: ${triplog.vehicle}</p>
                                <p>Purpose: ${triplog.purpose}</p>
                                <p>Remarks: ${triplog.comments}</p>`,
                        description: "Triplog",
                    }
                ]
            },
            outro: `Driver: ${req.user.firstName + ' ' + req.user.lastName}`
        }
    };

    const mail = MailGenerator.generate(response);

    const message = {
        from : process.env.SENDER_EMAIL,
        to : userEmail,
        subject: "Driver Log Entry",
        html: mail
    };

    try {
        await transporter.sendMail(message);
    } catch(err) {
        console.error(`Error sending email to ${userEmail}:`, err);
        throw new Error('Internal server error');
    }
}

module.exports = { emailNotification };