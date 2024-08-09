import express from "express";
import {
    getUrlController,
    createUrlController,
    getUrlByIdController
} from "../controller/url.controller"

const router = express.Router();

router.get("/", getUrlController)
router.get("/:id", getUrlByIdController)
router.post("/", createUrlController)

export default router