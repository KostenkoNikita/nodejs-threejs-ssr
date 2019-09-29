import express from "express";
import { rendererRouter } from './renderer';

const router = express.Router();

router.use("/renderer", rendererRouter);
router.use("/", express.static("./client/dist"));

export { router as indexRouter }