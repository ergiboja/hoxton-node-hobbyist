import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['warn', 'error', 'info', 'query'] })
const app = express()
app.use(cors())
app.use(express.json())

const port = 4000

app.get('/user', async (req, res) => {
    const user = await prisma.user.findMany({
      include: { Hobby: true}
    })
    res.send(user)
  })

  app.get('/user/:id', async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      include: { Hobby:true}
    })
  
    if (user) {
      res.send(user)
    } else {
      res.status(404).send({ error: '404 Data Not found' })
    }
  })
  app.get('/hobby', async (req, res) => {
    const hobby = await prisma.hobby.findMany({
      include: { user: true}
    })
    res.send(hobby)
  })

  app.get('/hobby/:id', async (req, res) => {
    const hobby = await prisma.hobby.findUnique({
      where: { id: Number(req.params.id) },
      include: { user:true}
    })
  
    if (hobby) {
      res.send(hobby)
    } else {
      res.status(404).send({ error: '404 Data Not found' })
    }
  })
  app.post('/user', async (req, res) => {
    const user = await prisma.user.create({
      data: req.body,
      include: {Hobby:true}
    })
    res.send(user)
  })
  app.post('/hobby', async (req, res) => {
    const hobby = await prisma.hobby.create({
      data: req.body,
      include: {user:true}
    })
    res.send(hobby)
  })
  app.delete('/user/:id', async (req, res) => {
    const id = Number(req.params.id)
    const user = await prisma.user.delete({
      where: { id }
    })
    res.send(user)
  })
  app.patch('/user/:id', async (req, res) => {
    const id = Number(req.params.id)
    const user = await prisma.user.update({
      where: { id },
      data: req.body,
      include: { Hobby:true }
    })
    res.send(user)
  })



app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`)
  })