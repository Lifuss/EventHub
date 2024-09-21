import ctrlWrapper from "../../lib/ctrlWrapper";
import { Request, Response } from "express";
import Event from "../../models/Event";

const getEventById = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Event.findById(id);

  if (!event) {
    res.status(404).json({ message: "Event not found =(" });
  }

  res.status(200).json({ message: "Successful", event });
});

export default getEventById;
