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

const emailNotification = async (userEmail, logEntry, req) => {
    const response = {
        body: {
            name : "DriverLog",
            intro: "New Log Entry Created!",
            table : {
                data : [
                    {
                      item : `<p>New log entry created by ${req.user.firstName + ' ' + req.user.lastName} : </p> <p>on: ${logEntry.logDate} </p> <p>Distance: ${logEntry.trip.distance} </p> <p>Vehicle: ${logEntry.vehicle.licensePlate} </p> <p>Purpose: ${logEntry.trip.purpose} </p> <p>Remarks: ${logEntry.comments}</p>`,
                      description: "Log Entry",
                    }
                ]
            },
            outro: `Log entry created by ${req.user.firstName + ' ' + req.user.lastName}`
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
        console.log(`Email sent to ${userEmail}`);
    } catch(err) {
        console.error(`Error sending email to ${userEmail}:`, err);
        throw new Error('Internal server error');
    }
}

module.exports = { emailNotification };