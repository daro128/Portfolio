import axios from "axios";

const sendTelegramMessage = async (message) => {
    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
        chat_id: process.env.CHAT_ID,
        text: message,
    });
};

export default sendTelegramMessage;