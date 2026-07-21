import express from 'express'
import cors from 'cors'
import healthRoutes from './routes/health.routes.js'
import contactRoutes from './routes/contact.routes.js'
import commentRoutes from './routes/comment.routes.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/health', healthRoutes)
app.use("/api/contact", contactRoutes);
app.use("/api/comment", commentRoutes);

app.use(notFound)
app.use(errorHandler)

export default app
