const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const emailNotification = async (options) => {
    try {
        const msg = {
            to: options.email,
            from: options.from,
            subject: options.subject,
            text: options.message,
            html: options.html
        }
        await sgMail.send(msg)
    } catch (error) {
        console.log(error)
    }
}

module.exports = emailNotification;