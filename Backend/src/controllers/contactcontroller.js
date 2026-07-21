import sendTelegramMessage from "../util/sendTelegramMessage.js";

const sendContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const text = `
📩 New Contact

👤 Name: ${name}
📧 Email: ${email}

💬 Message:
${message}
`;

        await sendTelegramMessage(text);

        res.status(200).json({
            success: true,
            message: "Message sent successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to send message."
        });
    }
};
export default sendContact;