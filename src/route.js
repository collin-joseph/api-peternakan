const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/nutrisi', async (req, res) => {
    const nutrisi = await prisma.nutrisi.findMany({})
    res.json(nutrisi)
})

app.get('/sapi', async (req, res) => {
    const sapi = await prisma.sapi.findMany({})
    res.json(sapi)
})

app.get('/sapi/:id', async (req, res) => {
    const { id } = req.params
    const sapiUnique = await prisma.sapi.findUnique({
        where: {
            id_sapi: Number(id),
        },
    });
    res.json(sapiUnique)
})

app.get('/kandang', async (req, res) => {
    const kandang = await prisma.kandang.findMany({})
    res.json(kandang)
})

app.post('/new/nutrisi', async (req, res) => {
    const { id_sapi, kondisi } = req.body
    const nutrisiNew = await prisma.nutrisi.create({
        data: {
            id_sapi,
            kondisi,
        },
    })
    const nutrisiConnect = await prisma.nutrisi.update({
        where: {
            id_nutrisi,
        },
        data: {
            sapi: {
                connect: {
                    id_sapi,
                }
            }
        }
    })
    res.json(nutrisiNew);
    res.json(nutrisiConnect);
})

app.post('/new/sapi', async (req, res) => {
    const { latitude, longitude } = req.body
    const gps = await prisma.gps.create({
        data: {
            latitude,
            longitude,
        },
    })
    res.json(gps);
})

app.post('/new/kandang', async (req, res) => {
    const { id_gps, kelembapan, kadar_co2 } = req.body
    const newKandang = await prisma.kandang.create({
        data: {
            id_gps,
            kelembapan,
            kadar_co2,
        },
    })
    res.json(newKandang);
})

app.post('/new/gps', async (req, res) => {
    const { latitude, longitude } = req.body
    const newGps = await prisma.gps.create({
        data: {
            latitude,
            longitude,
        },
    })
    res.json(newGps);
})

app.delete('/nutrisi/:id', async (req, res) => {
    const { id } = req.params;
    const deleteNutrisi = await prisma.nutrisi.delete({
        where: {
            id_nutrisi: Number(id),
        },
    })
    res.json(deleteNutrisi)
})

app.delete('/sapi/:id', async (req, res) => {
    const { id } = req.params;
    const deleteSapi = await prisma.sapi.delete({
        where: {
            id_sapi: Number(id),
        },
    })
    res.json(deleteSapi)
})

const server = app.listen(3000, () =>
    console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`),
)