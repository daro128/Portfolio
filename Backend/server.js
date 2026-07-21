import dotenv from "dotenv";

dotenv.config();
import app from './src/app.js'

const port = process.env.PORT || 5000
console.log("BOT_TOKEN:", process.env.BOT_TOKEN);
console.log("CHAT_ID:", process.env.CHAT_ID);

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});
