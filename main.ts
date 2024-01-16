import { PrismaClient } from '@prisma/client'
import { ZenStackMiddleware } from '@zenstackhq/server/express'
import express from 'express'

const app = express()
app.use(express.json())

const prisma = new PrismaClient()
app.use('/api/rpc', ZenStackMiddleware({ getPrisma: () => prisma }))

app.listen(3000, () => console.log('🚀 Server ready at: http://localhost:3000'))
