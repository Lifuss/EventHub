import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { eventsService } from "../lib/service";
import ParticipantCard from "../ui/ParticipantCard";
import { Participant } from "../lib/types/types";

const ParticipantsPage = () => {
  const params = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["getEvent participants"],
    queryFn: () => eventsService.getEventParticipants(params.id!),
  });
  return (
    <div>
      {isPending ? (
        <h1 className="text-2xl mx-auto">Loading...</h1>
      ) : (
        <>
          <h1 className="text-4xl mb-4 md:mb-8 text-center">
            Participants of {data.event.title}
          </h1>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-10">
            {data.participants.length ? (
              data.participants.map((participant: Participant) => {
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
