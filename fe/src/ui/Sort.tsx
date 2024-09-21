interface SortProps {
  sort: "title" | "organizer" | "date";
  setSort: (value: "title" | "organizer" | "date") => void;
  order: "asc" | "desc";
  setOrder: (value: "asc" | "desc") => void;
}

const Sort = ({ sort, setSort, order, setOrder }: SortProps) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="flex flex-col">
        <h2>Sort By:</h2>
        <label>
          <input
            type="radio"
            name="sort"
            value="title"
            checked={sort === "title"}
            onChange={() => setSort("title")}
          />
          Title
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="organizer"
            checked={sort === "organizer"}
            onChange={() => setSort("organizer")}
          />
          Organizer
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="date"
            checked={sort === "date"}
            onChange={() => setSort("date")}
          />
          Date
        </label>
      </div>
      <div className="flex flex-col ml-4">
        <h2>Order:</h2>
        <label>
          <input
            type="radio"
            name="order"
            value="asc"
            checked={order === "asc"}
            onChange={() => setOrder("asc")}
          />
          Ascending
        </label>
        <label>
          <input
            type="radio"
            name="order"
            value="desc"
            checked={order === "desc"}
            onChange={() => setOrder("desc")}
          />
          Descending
        </label>
      </div>
    </div>
  );
};

export default Sort;
