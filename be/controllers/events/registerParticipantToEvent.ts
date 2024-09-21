import ctrlWrapper from "../../lib/ctrlWrapper";
import { Request, Response } from "express";
import Event from "../../models/Event";

const registerParticipant = ctrlWrapper(async (req: Request, res: Response) => {
  const { eventId, credentials: newParticipant } = req.body;

  const applyParticipant = await Event.findById(eventId);
  if (
    applyParticipant?.participants.find(
      (el) => el.email === newParticipant.email
    )
  ) {
    res.status(409).json({ message: "This participant already applied" });
    return;
  }

  if (!applyParticipant) {
    res.status(500).json({ message: "Applying participant failed" });
    return;
  }
  applyParticipant.participants.push(newParticipant);
  await applyParticipant.save();
  res.status(201).json({ message: "Successful" });
});

export default registerParticipant;
