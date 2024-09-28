import express from 'express'
import prisma from './src/lib/prisma.js'
import authRouter from './src/routes/auth.router.js'
import adsRouter from './src/routes/creatingAds.router.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config(); 

const app = express();

const PORT = process.env.SERVER_PORT || 3000

app.use(cors())

app.use(express.json())

app.use("/auth", authRouter)
app.use("/ads", adsRouter);

const start = async () => {
  await prisma.$connect();

  app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}

start()

