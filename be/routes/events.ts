import { Router } from "express";
import getEvents from "../controllers/events/getEvents";
import registerParticipant from "../controllers/events/registerParticipantToEvent";
import validateBody from "../middlewares/validateBodyJoi";
import { registerSchema } from "../lib/joiValidation";
import getEventById from "../controllers/events/getEventById";
import getAllEventParticipants from "../controllers/events/getAllEventParticipants";

const router = Router();

router.get("/", getEvents);
router.post("/participants", validateBody(registerSchema), registerParticipant);

router.get("/:id", getEventById);
router.get("/participants/:id", getAllEventParticipants);

export default router;
