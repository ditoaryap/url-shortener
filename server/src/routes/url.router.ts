import express from "express";
import {
    getUrlController,
    createUrlController,
    redirectToLongUrl,
} from "../controller/url.controller"

const router = express.Router();

router.get("/urls", getUrlController)
router.post("/", createUrlController)
router.get("/:shortUrl", redirectToLongUrl)

export default router