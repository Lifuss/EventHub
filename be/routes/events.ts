import { Router } from "express";
import getEvents from "../controllers/events/getEvents";

const router = Router();

router.get("/", getEvents);

export default router;
