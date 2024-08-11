import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import crypto from "crypto"

const prisma = new PrismaClient()


export const redirectToLongUrl = async (
    req: Request,
    res: Response
) => {
    const { shortUrl } = req.params;
    try {
        const getLongUrl = await prisma.urls.findUnique({
            where: {
                url_short: shortUrl
            }
        })
        
        const test = getLongUrl?.url_long

        if(!test) return res.status(400).json({messag: "url tidak ditemukan"})

        if (getLongUrl) {
            // Menambahkan protokol jika tidak ada
            const urlLong = getLongUrl.url_long

            res.redirect(urlLong);
        } else {
            res.status(404).json({ error: "URL tidak ditemukan" });
        }

        res.redirect(test)

    } catch (error) {
        console.error("Error during redirect:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
};

export const getUrlController = async(
    req: Request,
    res: Response
) => {
    try {
        const urls = await prisma.urls.findMany();
        res.status(200).json({
            message: "Data berhasil diambil",
            urls
        });
    } catch (error) {
        console.log("Data error:", error);
        res.status(500).json({ error: "Gagal mengambil data." });
    }
};

export const createUrlController = async (
    req: Request,
    res: Response
) => {
    const { url_long } = req.body; 

    if (!url_long) {
        return res.status(400).json({ error: "url_long is required" });
    }

    try {
        const hash = crypto.createHash('sha256').update(url_long).digest('hex').slice(0, 8);
        const url = await prisma.urls.create({
            data: {
                url_long,
                url_short: hash
            }
        });

        res.status(201).json({
            message: "URL berhasil dibuat",
            url
        });
    } catch (error) {
        res.status(500).json({ error: "URL sudah ada" });
    }
};