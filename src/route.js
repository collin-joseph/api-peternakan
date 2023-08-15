// Prerequisites
const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// Update data sapi
app.get('/nutrisi', async (req, res) => {
    const nutrisi = await prisma.nutrisi.findMany({})
    res.json(nutrisi)
})

app.get('/sapi', async (req, res) => {
    const sapi = await prisma.sapi.findMany({})
    res.json(sapi)
})

app.get('/kandang', async (req, res) => {
    const kandang = await prisma.kandang.findMany({})
    res.json(kandang)
})

app.get('/gps', async (req, res) => {
    const gps = await prisma.gps.findMany({})
    res.json(gps)
})

app.post('/new/nutrisi', async (req, res) => {
    const { sapi, kondisi } = req.body
    try {
        console.log(sapi)
        console.log(kondisi)
        const nutrisiNew = await prisma.nutrisi.create({
            data: {
                sapi: sapi,
                kondisi,
            },
        })
        res.json(nutrisiNew)
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

app.post('/new/sapi', async (req, res) => {
    const { kandang, nama, jenis_kelamin, suhu, detak_jantung,  } = req.body
    try {
        console.log(kandang)
        console.log(nama)
        console.log(jenis_kelamin)
        console.log(suhu)
        console.log(detak_jantung)
        const newSapi = await prisma.sapi.create({
            data: {
                kandang: kandang,
                nama,
                jenis_kelamin,
                suhu,
                detak_jantung,
            },
        })
        res.json(newSapi)
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

app.post('/new/kandang', async (req, res) => {
    const { gps, kelembapan, kadar_co2 } = req.body
    try {
        console.log(gps)
        console.log(kelembapan)
        console.log(kadar_co2)
        const newKandang = await prisma.kandang.create({
            data: {
                gps: gps,
                kelembapan,
                kadar_co2,
            },
        })
        res.json(newKandang)
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

app.post('/new/gps', async (req, res) => {
    const { latitude, longitude } = req.body
    try {
        console.log(latitude)
        console.log(longitude)
        const newGps = await prisma.gps.create({
            data: {
                latitude,
                longitude,
            },
        })
        res.json(newGps)
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

app.put('/update/nutrisi/:id', async (req, res) => {
    const { id } = req.params
    const { sapi, kondisi } = req.body
    try {
        console.log(id)
        console.log(sapi)
        console.log(kondisi)
        const updateNutrisi = await prisma.nutrisi.update({
            where: { id_nutrisi: Number(id)},
            data: {
                sapi: sapi,
                kondisi,
            }
        })
        res.json(updateNutrisi)
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

app.put('/update/sapi/:id', async (req, res) => {
    const { id } = req.params
    const { kandang, nama, jenis_kelamin, suhu, detak_jantung } = req.body
    try {
        console.log(kandang)
        console.log(nama)
        console.log(jenis_kelamin)
        console.log(suhu)
        console.log(detak_jantung)
        const updateSapi = await prisma.sapi.update({
            where: { id_sapi: Number(id) },
            data: {
            kandang: kandang,
            nama,
            jenis_kelamin,
            suhu,
            detak_jantung
            }
        })
        res.json(updateSapi)
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

app.put('/update/kandang/:id', async (req, res) => {
    const { id } = req.params
    const { gps, kelembapan, kadar_co2 } = req.body
    try {
        console.log(gps)
        console.log(kelembapan)
        console.log(kadar_co2)
        const updateKandang = await prisma.kandang.update({
            where: { id_kandang: Number(id) },
            data: {
            gps: gps,
            kelembapan,
            kadar_co2,
            }
        })
        res.json(updateKandang)
    } catch {
        console.error(err)
        res.status(500).send()
    }
})

app.put('/update/gps/:id', async (req, res) => {
    const { id } = req.params
    const { latitude, longitude } = req.body
    try {
        console.log(latitude)
        console.log(longitude)
        const updateGps = await prisma.gps.update({
            where: { id_gps: Number(id) },
            data: {
            latitude,
            longitude,
        }
        })
        res.json(updateGps)
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

app.delete('/delete/nutrisi/:id', async (req, res) => {
    const { id } = req.params;
    const deleteNutrisi = await prisma.nutrisi.delete({
        where: {
            id_nutrisi: Number(id),
        },
    })
    res.json(deleteNutrisi)
})

app.delete('/delete/sapi/:id', async (req, res) => {
    const { id } = req.params;
    const deleteSapi = await prisma.sapi.delete({
        where: {
            id_sapi: Number(id),
        },
    })
    res.json(deleteSapi)
})

app.delete('/delete/kandang/:id', async (req, res) => {
    const { id } = req.params;
    const deleteKandang = await prisma.kandang.delete({
        where: {
            id_kandang: Number(id),
        },
    })
    res.json(deleteKandang)
})

app.delete('/delete/gps/:id', async (req, res) => {
    const { id } = req.params;
    const deleteGps = await prisma.gps.delete({
        where: {
            id_gps: Number(id),
        },
    })
    res.json(deleteGps)
})

// Get data sapi
app.get('/sapi/:id', async (req, res) => {
    const { id } = req.params
    try {
        const sapiUnique = await prisma.sapi.findUnique({
            where: {
                id_sapi: Number(id),
            },
        })
        res.json(sapiUnique)
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

// Call API
const server = app.listen(3000, () =>
    console.log(`🚀 Server ready at: http://localhost:3000`))