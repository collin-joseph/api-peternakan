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
    res.json(nutrisiNew);
})

app.post('/new/sapi', async (req, res) => {
    const { id_kandang, nama, jenis_kelamin, suhu, detak_jantung,  } = req.body
    const newSapi = await prisma.sapi.create({
        data: {
            id_kandang,
            nama,
            jenis_kelamin,
            suhu,
            detak_jantung,
        },
    })
    res.json(newSapi);
})

app.post('/new/kandang', async (req, res) => {
    const { gps, kelembapan, kadar_co2 } = req.body
    const newKandang = await prisma.kandang.create({
        data: {
            gps: { connect: { id_gps: gps } },
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

app.put('/update/nutrisi/:id', async (req, res) => {
    const { id } = req.params;
    const { sapi, kondisi } = req.body;
    const updateNutrisi = await prisma.nutrisi.update({
        where: { id_nutrisi: Number(id)},
        data: {
            sapi: { connect: { id_sapi: sapi } },
            kondisi,
        }
    })
    res.json(updateNutrisi)
})

app.put('/update/sapi/:id', async (req, res) => {
    const { id } = req.params;
    const { kandang, nama, jenis_kelamin, suhu, detak_jantung } = req.body
    const updateSapi = await prisma.sapi.update({
        where: { id_sapi: Number(id) },
        data: {
        kandang: { connect: { id_kandang: kandang } },
        nama,
        jenis_kelamin,
        suhu,
        detak_jantung
        }
    })
    res.json(updateSapi)
})

app.put('/update/kandang/:id', async (req, res) => {
    const { id } = req.params;
    const { gps, kelembapan, kadar_co2 } = req.body
    const updateKandang = await prisma.kandang.update({
        where: { id_kandang: Number(id) },
        data: {
        gps: { connect: { id_gps: gps } },
        kelembapan,
        kadar_co2,
        }
    })
    res.json(updateKandang)
})

app.put('/update/gps/:id', async (req, res) => {
    const { id } = req.params;
    const { latitude, longitude } = req.body
    const updateGps = await prisma.gps.update({
        where: { id_gps: Number(id) },
        data: {
        latitude,
        longitude,
      }
    })
    res.json(updateGps)
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

app.delete('/kandang/:id', async (req, res) => {
    const { id } = req.params;
    const deleteKandang = await prisma.kandang.delete({
        where: {
            id_kandang: Number(id),
        },
    })
    res.json(deleteKandang)
})

app.delete('/gps/:id', async (req, res) => {
    const { id } = req.params;
    const deleteGps = await prisma.gps.delete({
        where: {
            id_gps: Number(id),
        },
    })
    res.json(deleteGps)
})

const server = app.listen(3000, () =>
    console.log(`
🚀 Server ready at: http://localhost:3000`),
)