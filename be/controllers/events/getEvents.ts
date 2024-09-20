import ctrlWrapper from "../../lib/ctrlWrapper";
import { Request, Response } from "express";
import Event from "../../models/Event";

const getEvents = ctrlWrapper(async (req: Request, res: Response) => {
  const events = await Event.find({});
  if (!events) {
    console.log(events);
    res.status(404).json({ message: "Events not found =(" });
  }
  res.status(200).json({ message: "Successful", events });
});

export default getEvents;
