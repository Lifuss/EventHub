export type Participant = {
  fullName: string;
  email: string;
  dateOfBirth: Date;
  hearAboutUs: "friends" | "social" | "myself" | "other";
};
export interface TEvents {
  title: string;
  description: string;
  _id: string;
  eventDate: Date;
  organizer: string;
  participants: Participant[];
}
export interface GetEventsData {
  message: string;
  events: TEvents[];
  total: number;
  totalPages: number;
}
