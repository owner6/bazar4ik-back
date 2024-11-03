import express from 'express'
import prisma from './src/lib/prisma.js'
import dotenv from 'dotenv';
import cors from 'cors';
import { authMiddleware } from './src/middleware/authMiddleware.js';
import authRouter from './src/routes/auth.router.js';
import creatingListingsRouter from './src/routes/creatingListings.router.js';
import listingsUserRouter from './src/routes/listingsUser.router.js';
dotenv.config(); 

const app = express();

const PORT = process.env.SERVER_PORT || 3000

app.use(cors())

app.use(express.json())
app.use("/auth", authRouter)
app.use('/create-listings', authMiddleware, creatingListingsRouter);
app.use('/user-listings', authMiddleware, listingsUserRouter)
const start = async () => {
  await prisma.$connect();

  app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}

start()

