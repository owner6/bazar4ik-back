import express from 'express'
import prisma from './src/lib/prisma.js'
import dotenv from 'dotenv';
import cors from 'cors';

import router from './src/routes/router.js';

dotenv.config();

const app = express();

const PORT = process.env.SERVER_PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/', router)

const start = async () => {
  await prisma.$connect();

  app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}

start()

