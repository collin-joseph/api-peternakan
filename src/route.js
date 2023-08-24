// Prerequisites
const express = require('express')
const app = express()
const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('C:\\Users\\colli\\Documents\\Nusameta\\Sprint 2\\api-peternakan\\src\\peternakan.db')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Peternakan',
            version: '2.0.0',
            description: 'API yang melacak data-data nutrisi sapi dari sebuah peternakan'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],
    },
    apis: ['C:\\Users\\colli\\Documents\\Nusameta\\Sprint 2\\api-peternakan\\src\\route.js']
}

const specs = swaggerJsDoc(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(express.json())

/**
 * @swagger
 * components:
 *  schemas:
 *      kandang:
 *          type: object
 *          required:
 *              - id_kandang
 *              - lokasi
 *              - lintang
 *              - bujur
 *              - kelembapan
 *              - co2
 *              - metana
 *              - kebisingan
 *          properties:
 *              id_kandang:
 *                  type: integer
 *                  description: ID yang tergenerasi secara otomatis untuk setiap kandang
 *              lokasi:
 *                  type: string
 *                  description: Lokasi perkiraan
 *              lintang:
 *                  type: float
 *                  description: Koordinat garis lintang
 *              bujur:
 *                  type: float
 *                  description: Koordinat garis bujur
 *              kelembapan:
 *                  type: float
 *                  description: Kadar kelembapan dalam kandang
 *              co2:
 *                  type: float
 *                  description: Kadar gas karbondioksida dalam kandang
 *              metana:
 *                  type: float
 *                  description: Kadar gas metana dalam kandang
 *              kebisingan:
 *                  type: float
 *                  description: Nilai kebisingan dalam kandang
 *          example:
 *              id_kandang: 1
 *              lokasi: Kebon Jeruk
 *              lintang: 90
 *              bujur: 90
 *              kelembapan: 80
 *              co2: 40
 *              metana: 10
 *              kebisingan: 30
 *      sapi:
 *          type: object
 *          required:
 *              - id_sapi
 *              - kandang
 *              - nama
 *              - jenis_kelamin
 *              - suhu
 *              - detak_jantung
 *              - kesehatan
 *          properties:
 *              id_sapi:
 *                  type: integer
 *                  description: ID yang tergenerasi secara otomatis untuk setiap sapi
 *              kandang:
 *                  type: integer
 *                  description: ID kandang dari tabel kandang
 *              nama:
 *                  type: string
 *                  description: Nama sapi
 *              jenis_kelamin:
 *                  type: string
 *                  description: Jenis kelamin dari sapi
 *              suhu:
 *                  type: float
 *                  description: Suhu tubuh sapi
 *              detak_jantung:
 *                  type: float
 *                  description: Detak jantung rata-rata sapi
 *              kesehatan:
 *                  type: string
 *                  description: Kondisi kesehatan sapi
 *          example:
 *              id_sapi: 1
 *              kandang: 1
 *              nama: Collin
 *              jenis_kelamin: Laki-laki
 *              suhu: 38
 *              detak_jantung: 78
 *              kesehatan: Sehat
 */

/**
 * @swagger
 * tags:
 *  - name: Kandang
 *    description: Route untuk tabel kandang
 *  - name: Sapi
 *    description: Route untuk tabel sapi
 */

/**
 * @swagger
 * /kandang:
 *  get:
 *      summary: Display semua data kandang
 *      tags: [Kandang]
 *      responses:
 *          200:
 *              description: Successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/kandang'
 * /kandang/{id}:
 *  get:
 *      summary: Display data sebuah kandang
 *      tags: [Kandang]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID kandang
 *      responses:
 *          200:
 *              description: Successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/kandang'
 * /new/kandang:
 *  post:
 *      summary: Buat kandang baru
 *      tags: [Kandang]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/kandang'
 *      responses:
 *          200:
 *              description: Successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/kandang'
 * /update/kandang/{id}:
 *  put:
 *      summary: Memperbarui data kandang
 *      tags: [Kandang]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID kandang
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/kandang'
 *      responses:
 *          200:
 *              description: Successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/kandang'
 * /delete/kandang/{id}:
 *  delete:
 *      summary: Hapus kandang
 *      tags: [Kandang]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID kandang
 *      responses:
 *          200:
 *              description: Successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/kandang'
 * /sapi:
 *  get:
 *      summary: Display semua data sapi
 *      tags: [Sapi]
 *      responses:
 *          200:
 *              description: Successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/sapi'
 * /sapi/{id}:
 *  get:
 *      summary: Display data sebuah sapi
 *      tags: [Sapi]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID sapi
 *      responses:
 *          200:
 *              description: Successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/sapi'
 * /new/sapi:
 *  post:
 *      summary: Buat sapi baru
 *      tags: [Sapi]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/sapi'
 *      responses:
 *          200:
 *              description: Successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/sapi'
 * /update/sapi/{id}:
 *  put:
 *      summary: Memperbarui data sapi
 *      tags: [Sapi]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID sapi
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/sapi'
 *      responses:
 *          200:
 *              description: Successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/sapi'
 * /delete/sapi/{id}:
 *  delete:
 *      summary: Hapus sapi
 *      tags: [Sapi]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID sapi
 *      responses:
 *          200:
 *              description: Successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/sapi'
 */

// Basic HTTP authentication
app.use((req, res, next) => {
    if(!req.get('Authorization')){
        res.status(401).set('WWW-Authenticate', 'Basic')
        next(err)
    }
    else{
        var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
        .toString()
        .split(':')
        var username = credentials[0]
        var password = credentials[1]
        if(!(username === 'admin' && password === 'peternakan123')){
            var err = new Error('Not Authenticated!')
            res.status(401).set('WWW-Authenticate', 'Basic')
            next(err)
        }
        res.status(200)
        next()
    }
})

app.get('/', async (req, res) => {
    res.send('Protected route with Basic HTTP authentication')
})

// Get data
app.get('/sapi', async (req, res) => {
    const sapi = await prisma.sapi.findMany({})
    res.json(sapi)
})

app.get('/sapi/:id', async (req, res) => {
    const { id } = req.params
    try {
      const query = `
        SELECT sapi.*, kandang.*
        FROM sapi
        INNER JOIN kandang ON sapi.kandang = kandang.id_kandang
        WHERE sapi.id_sapi = ?;
      `
      db.all(query, [id], (err, rows) => {
        if (err) {
          console.error(err)
          return res.status(500).send()
        }
        res.json(rows)
      });
    } catch (err) {
      console.error(err)
      res.status(500).send()
    }
  })
  

app.get('/kandang', async (req, res) => {
    const kandang = await prisma.kandang.findMany({})
    res.json(kandang)
})

app.get('/kandang/:id', async (req, res) => {
    const { id } = req.params
    try {
        const query = `
            SELECT kandang.*, sapi.*
            FROM kandang
            INNER JOIN sapi ON kandang.id_kandang = sapi.kandang
            WHERE kandang.id_kandang = ?;
            `
        db.all(query, [id], (err, rows) => {
            const kandangUnique = {
                kandang: null,
                sapi: [],
              }
            if (rows.length > 0) {
                kandangUnique.kandang = {
                    id_kandang: rows[0].id_kandang,
                    lokasi: rows[0].lokasi,
                    lintang: rows[0].lintang,
                    bujur: rows[0].bujur,
                    kelembapan: rows[0].kelembapan,
                    co2: rows[0].co2,
                    metana: rows[0].metana,
                    kebisingan: rows[0].kebisingan,
                }
                kandangUnique.sapi = rows.map((row) => ({
                    id_sapi: row.id_sapi,
                    nama: row.nama,
                    jenis_kelamin: row.jenis_kelamin,
                    suhu: row.suhu,
                    detak_jantung: row.detak_jantung,
                    kesehatan: row.kesehatan,
                }))
            }
            res.json(kandangUnique);
        })
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

// Input data
app.post('/new/sapi', async (req, res) => {
    const { kandang, nama, jenis_kelamin, suhu, detak_jantung, kesehatan } = req.body
    try {
        console.log(kandang)
        console.log(nama)
        console.log(jenis_kelamin)
        console.log(suhu)
        console.log(detak_jantung)
        console.log(kesehatan)
        const newSapi = await prisma.sapi.create({
            data: {
                kandang: kandang,
                nama,
                jenis_kelamin,
                suhu,
                detak_jantung,
                kesehatan,
            },
        })
        res.json(newSapi)
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

app.post('/new/kandang', async (req, res) => {
    const { lokasi, lintang, bujur, kelembapan, co2, metana, kebisingan } = req.body
    try {
        console.log(lokasi)
        console.log(lintang)
        console.log(bujur)
        console.log(kelembapan)
        console.log(co2)
        console.log(metana)
        console.log(kebisingan)
        const newKandang = await prisma.kandang.create({
            data: {
                lokasi,
                lintang,
                bujur,
                kelembapan,
                co2,
                metana,
                kebisingan,
            },
        })
        res.json(newKandang)
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

// Update data
app.put('/update/sapi/:id', async (req, res) => {
    const { id } = req.params
    const { kandang, nama, jenis_kelamin, suhu, detak_jantung, kesehatan } = req.body
    try {
        console.log(kandang)
        console.log(nama)
        console.log(jenis_kelamin)
        console.log(suhu)
        console.log(detak_jantung)
        console.log(kesehatan)
        const updateSapi = await prisma.sapi.update({
            where: { id_sapi: Number(id) },
            data: {
                kandang: kandang,
                nama,
                jenis_kelamin,
                suhu,
                detak_jantung,
                kesehatan,
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
    const { lokasi, lintang, bujur, kelembapan, co2, metana, kebisingan } = req.body
    try {
        console.log(lokasi)
        console.log(lintang)
        console.log(bujur)
        console.log(kelembapan)
        console.log(co2)
        console.log(metana)
        console.log(kebisingan)
        const updateKandang = await prisma.kandang.update({
            where: { id_kandang: Number(id) },
            data: {
                lokasi,
                lintang,
                bujur,
                kelembapan,
                co2,
                metana,
                kebisingan,
            }
        })
        res.json(updateKandang)
    } catch {
        console.error(err)
        res.status(500).send()
    }
})

// Delete data
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

// Call API
const server = app.listen(3000, () =>
    console.log(`🚀 Server ready at: http://localhost:3000`))