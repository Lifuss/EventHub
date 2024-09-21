import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { eventsService } from "../lib/service";
import ParticipantCard from "../ui/ParticipantCard";
import { Participant } from "../lib/types/types";
import { useState } from "react";

const ParticipantsPage = () => {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["getEvent participants"],
    queryFn: () => eventsService.getEventParticipants(params.id!),
  });

  const filteredParticipants = data?.participants.filter(
    (participant: Participant) =>
      participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {isPending ? (
        <h1 className="text-2xl mx-auto">Loading...</h1>
      ) : (
        <>
          <h1 className="text-4xl mb-4 md:mb-8 text-center">
            Participants of {data.event.title}
          </h1>

          <input
            type="text"
            placeholder="Search by full name or email"
            className="border rounded p-2 mb-4 bg-beige border-none w-full max-w-md mx-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-10">
            {filteredParticipants && filteredParticipants.length ? (
              filteredParticipants.map((participant: Participant) => {
                return (
                  <ParticipantCard
                    key={participant.email}
                    participant={participant}
                  />
                );
              })
            ) : (
              <div> Not found 😶‍🌫️</div>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default ParticipantsPage;
