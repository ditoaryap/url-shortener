import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import crypto from "crypto"

const prisma = new PrismaClient()



export const getUrlController = async(
    req: Request,
    res: Response
) => {
    try {
        const urls = await prisma.urls.findMany()
        res.status(200).json({
            message: "Data berhasil diambil",
            urls
        })
    } catch (error) {
        console.log("Data error")
        res.status(500).json({ error: "ga tau ngapa"})
    }
}

export const createUrlController = async(
    req: Request,
    res: Response
) => {
    const { url_long } = req.body

    try {
        const hash = crypto.createHash('sha256').update(url_long).digest('hex').slice(0, 8);

        // Save the long URL and the generated hash to the database
        const url = await prisma.urls.create({
            data: {
                url_long,
                url_short: `www.ditoaryap.com/url/${hash}`,
            }
        });

        console.log(url)


        res.status(201).json({
            message: "URL berhasil dibuat",
            url
        });
    } catch (error) {
        console.error("Error creating URL:", error);
        res.status(500).json({ error: "Gagal membuat URL." });
    }
}

export const getUrlByIdController = async(
    req: Request,
    res: Response
) => {
    try {
        const idUrl = req.params.id

        const checkUrl = await prisma.urls.findUnique({
            where: {
                id: Number(idUrl)
            }
        })

        if(!checkUrl) res.status(400).json({
            message: "data tidak ditemukan",
            checkUrl
        })

        res.status(200).json({
            message: "data berhasil diambil",
            checkUrl
        })
    } catch (error) {
        
    }
}