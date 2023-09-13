const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const SMSNotification = async (options) => {
    try {
        const message = await client.messages.create({
            body: options.message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: options.phoneNumber,
        });

        console.log(message);
    } catch (error) {
        console.log(error);
    }
}

module.exports = SMSNotification;