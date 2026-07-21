import sendTelegramMessage from "../util/sendTelegramMessage.js";

const sendComment = async (req, res) => {
    try {
        const { name, message } = req.body;

        const text = `
💬 New Comment

👤 Name: ${name}

📝 Message:
${message}
`;

        await sendTelegramMessage(text);

        res.status(200).json({
            success: true,
            message: "Comment notification sent successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to send comment notification."
        });
    }
};
export default sendComment;
