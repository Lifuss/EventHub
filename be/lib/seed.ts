// seed.ts
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Event from "../models/Event";
import { dbUri } from "../server";

mongoose
  .connect(dbUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const generateEvents = (num: number) => {
  const festivals = [];
  for (let i = 0; i < num; i++) {
    festivals.push({
      title: faker.music.genre() + " Event",
      description: faker.lorem.sentence(),
      eventDate: faker.date.future(),
      organizer: faker.company.name(),
    });
  }
  return festivals;
};

const seedDB = async (num: number) => {
  await Event.deleteMany({});
  const festivals = generateEvents(num);
  await Event.insertMany(festivals);
  console.log(`Database seeded with ${num} events!`);
};

seedDB(50).then(() => {
  mongoose.connection.close();
});
