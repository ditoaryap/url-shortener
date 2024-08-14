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

        if (getLongUrl) {
            const urlLong = getLongUrl.url_long
            res.redirect(urlLong);
        } else {
            res.status(404).json({ error: "URL tidak ditemukan" });
        }

    } catch (error) {
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
        res.status(500).json({ error: "Gagal mengambil data." });
    }
};

export const createUrlController = async (
    req: Request,
    res: Response
) => {
    const { url_long, url_short } = req.body;

    if (!url_long) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const hash = crypto.randomBytes(6).toString('base64').replace(/[^A-Za-z0-9]/g, '').substring(0, 6);
        const generatedUrlShort = url_short || hash;

        const existingUrl = await prisma.urls.findUnique({
            where: { url_short: generatedUrlShort }
        });

        if (existingUrl) {
            return res.status(400).json({ error: `URL dengan nama ${url_short} sudah ada` });
        }
        
        const url = await prisma.urls.create({
            data: {
                url_long,
                url_short: generatedUrlShort
            }
        });

        res.status(201).json({
            message: "URL berhasil dibuat",
            url
        });

    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
};
