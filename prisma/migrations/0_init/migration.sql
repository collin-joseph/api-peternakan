-- CreateTable
CREATE TABLE "gps" (
    "id_gps" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "kandang" (
    "id_kandang" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gps" INTEGER NOT NULL,
    "kelembapan" REAL NOT NULL,
    "kadar_co2" REAL NOT NULL,
    CONSTRAINT "kandang_gps_fkey" FOREIGN KEY ("gps") REFERENCES "gps" ("id_gps") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "nutrisi" (
    "id_nutrisi" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sapi" INTEGER NOT NULL,
    "kondisi" TEXT NOT NULL,
    CONSTRAINT "nutrisi_sapi_fkey" FOREIGN KEY ("sapi") REFERENCES "sapi" ("id_sapi") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "sapi" (
    "id_sapi" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kandang" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "suhu" REAL NOT NULL,
    "detak_jantung" INTEGER NOT NULL,
    CONSTRAINT "sapi_kandang_fkey" FOREIGN KEY ("kandang") REFERENCES "kandang" ("id_kandang") ON DELETE NO ACTION ON UPDATE NO ACTION
);

