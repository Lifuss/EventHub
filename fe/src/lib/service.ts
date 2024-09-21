import axios from "axios";
import { GetEventsData, Participant, TEvents } from "./types/types";

const eventApi = axios.create({
  baseURL: "https://be-eventhub.onrender.com/api",
});

class EventsService {
  async getEvents(page: number, sort: string, order: string) {
    const { data } = await eventApi.get<GetEventsData>("/events", {
      params: {
        page,
        sort,
        order,
      },
    });
    return data;
  }
  async getEventById(eventId: string) {
    const { data } = await eventApi.get<{ message: string; event: TEvents }>(
      `/events/${eventId}`
    );
    return data;
  }
  async applyParticipant(eventId: string, credentials: Participant) {
    const { data } = await eventApi.post("/events/participants", {
      eventId,
      credentials,
    });
    return data;
  }
  async getEventParticipants(eventId: string) {
    const { data } = await eventApi.get(`/events/participants/${eventId}`);
    return data;
  }
}
export const eventsService = new EventsService();
