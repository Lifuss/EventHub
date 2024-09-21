import { Participant } from "../lib/types/types";

const ParticipantCard = ({ participant }: { participant: Participant }) => {
  const { fullName, email } = participant;
  return (
    <li className="border border-terracotta shadow-sm rounded-lg px-2 py-4 xl:px-4 text-sm h-[150px] flex flex-col bg-beige">
      <h2 className="font-medium mb-2 text-xl">{fullName}</h2>
      <p className="break-words md:text-lg">{email}</p>
    </li>
  );
};

export default ParticipantCard;
