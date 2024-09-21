import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "../ui/Button";
import EventCard from "../ui/EventCard";
import { eventsService } from "../lib/service";
import { useEffect, useRef, useState } from "react";
import { TEvents } from "../lib/types/types";
import Sort from "../ui/Sort";

const BoardPage = () => {
  const loadMoreRef = useRef(null);
  const [sort, setSort] = useState<"title" | "organizer" | "date">("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["events", sort, order],
      queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
        eventsService.getEvents(pageParam, sort, order),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? pages.length + 1 : undefined;
      },
      select: (data) => data.pages.flatMap((page) => page.events),
    });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="h-[400px] text-2xl grid place-items-center">
        <h1>Ocurred error while fetching data</h1>
        <Button onClick={() => fetchNextPage()}>Try again</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl grid place-items-center h-[400px]">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl mb-4 md:mb-6 text-center text-terracotta">
        EventHub
      </h1>
      <Sort order={order} setOrder={setOrder} sort={sort} setSort={setSort} />
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-10">
        {data.length ? (
          data.map((event: TEvents) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <div> Not found 😶‍🌫️</div>
        )}
      </ul>
      <div ref={loadMoreRef} className="h-10" />
    </>
  );
};

export default BoardPage;
