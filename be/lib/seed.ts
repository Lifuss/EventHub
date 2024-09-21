// seed.ts
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Event from "../models/Event";
import { dbUri } from "../server";

mongoose
  .connect(dbUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const generateParticipants = (num: number) => {
  const participants = [];
  for (let i = 0; i < num; i++) {
    participants.push({
      fullName: faker.name.fullName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate({ min: 18, max: 60, mode: "age" }),
      hearAboutUs: faker.helpers.arrayElement([
        "friends",
        "social",
        "myself",
        "other",
      ]),
    });
  }
  return participants;
};

const generateEvents = (num: number) => {
  const events = [];
  for (let i = 0; i < num; i++) {
    events.push({
      title: faker.music.genre() + " Event",
      description: faker.lorem.sentence(),
      eventDate: faker.date.future(),
      organizer: faker.company.name(),
      participants: generateParticipants(7),
    });
  }
  return events;
};

const seedDB = async (num: number) => {
  await Event.deleteMany({});
  const events = generateEvents(num);
  await Event.insertMany(events);
  console.log(`Database seeded with ${num} events!`);
};

seedDB(120).then(() => {
  mongoose.connection.close();
});
