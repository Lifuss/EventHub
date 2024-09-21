import mongoose, { Schema, Document } from "mongoose";
import { Participant } from "../lib/types";

export interface TEvents extends Document {
  title: string;
  description: string;
  _id: string;
  eventDate: Date;
  organizer: string;
  participants: Participant[];
}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    organizer: { type: String, required: true },
    participants: [
      {
        fullName: String,
        email: String,
        dateOfBirth: Date,
        hearAboutUs: String,
      },
    ],
  },
  { versionKey: false }
);

const Event = mongoose.model<TEvents>("Event", EventSchema);
export default Event;
