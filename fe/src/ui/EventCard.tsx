import { TEvents } from "../lib/types/types";
import { ButtonClassName } from "./Button";
import { Link, useLocation } from "react-router-dom";

const EventCard = ({ event }: { event: TEvents }) => {
  const location = useLocation();
  const { title, description, organizer, eventDate, _id } = event;
  return (
    <li className="border border-terracotta shadow-sm rounded-lg px-2 py-4 xl:px-4 text-sm h-[350px] flex flex-col bg-beige">
      <h2 className="font-medium mb-2 text-xl">{title}</h2>
      <p>{description}</p>
      <div className="mt-auto mb-1">
        <p>Organizer</p>
        <p className="font-medium">{organizer}</p>
      </div>
      <div className="mb-4">
        <p>Date</p>
        <p className="font-medium">
          {new Date(eventDate).toLocaleDateString("uk-UA")}
        </p>
      </div>
      <div className="flex justify-between ">
        <Link
          className={ButtonClassName}
          state={{ from: location }}
          to={`/register/${_id.toString()}`}
        >
          Register
        </Link>
        <Link
          className={ButtonClassName}
          state={{ from: location }}
          to={`/${_id.toString()}`}
        >
          View
        </Link>
      </div>
    </li>
  );
};

export default EventCard;
