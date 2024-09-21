import ctrlWrapper from "../../lib/ctrlWrapper";
import { Request, Response } from "express";
import Event from "../../models/Event";
import { SortOrder } from "mongoose";

const getEvents = ctrlWrapper(async (req: Request, res: Response) => {
  const {
    page = "1",
    limit = "12",
    sort = "title",
    order = "desc",
  } = req.query as {
    sort?: "title" | "organizer" | "date";
    order?: "desc" | "asc";
    page?: string;
    limit?: string;
  };

  const sortOrder: SortOrder = order === "asc" ? 1 : -1;
  const sortOptions: Record<string, SortOrder> = {
    [sort]: sortOrder,
  };

  const events = await Event.find({})
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .sort(sortOptions);

  if (!events) {
    console.log(events);
    res.status(404).json({ message: "Events not found =(" });
  }

  const total = await Event.countDocuments({});
  const totalPages = Math.ceil(total / +limit);
  const hasMore = +page < totalPages;

  res
    .status(200)
    .json({ message: "Successful", hasMore, total, totalPages, events });
});

export default getEvents;
