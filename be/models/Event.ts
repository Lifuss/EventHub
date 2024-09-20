import mongoose, { Schema, Document } from "mongoose";

interface IEvent extends Document {
  title: string;
  description: string;
  eventDate: Date;
  organizer: string;
}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    organizer: { type: String, required: true },
  },
  { versionKey: false }
);

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;
