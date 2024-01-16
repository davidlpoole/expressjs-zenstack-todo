import { PrismaClient } from '@prisma/client'
import { enhance } from '@zenstackhq/runtime'
import { ZenStackMiddleware } from '@zenstackhq/server/express'
import express, { Request } from 'express'
import RESTHandler from '@zenstackhq/server/api/rest'

const app = express()
app.use(express.json())

const prisma = new PrismaClient()

function getUser(req: Request) {
  if (req.headers['x-user-id']) {
    return { id: parseInt(req.headers['x-user-id'] as string) }
  } else {
    return undefined
  }
}

app.use(
  '/api/rpc',
  ZenStackMiddleware({
    getPrisma: (req) => enhance(prisma, { user: getUser(req) }),
  })
)

app.use(
  '/api/rest',
  ZenStackMiddleware({
    handler: RESTHandler({ endpoint: 'http://localhost:3000/api/rest' }),
    getPrisma: (req) => enhance(prisma, { user: getUser(req) }),
  })
)

app.listen(3000, () => console.log('🚀 Server ready at: http://localhost:3000'))
