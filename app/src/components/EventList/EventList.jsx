import { useState } from "react";
import useEventFilters from "../../hooks/useEventFilters.jsx";
import useEvents from "../../hooks/useEvents.jsx";
import EventCard from "../EventCard/EventCard.jsx";
import FilterOption from "../FilterOption/FilterOption.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import SearchBar from "../Search/SearchBar.jsx";
import SearchSection from "../Search/SearchSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import SortBar from "../SortBar/SortBar.jsx";
import styles from "./EventList.module.css";

export default function EventList() {
  const { events, loading, error } = useEvents();
  const {
    displayedEvents,
    search,
    setSearch,
    priceFilters,
    handlePriceChange,
    categoryFilters,
    handleCategoryChange,
    handleSortChange,
  } = useEventFilters(events);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = displayedEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* Search */}
      <SearchSection>
        <SearchBar
          search={search}
          onSearch={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          onClearSearch={() => {
            setSearch("");
            setCurrentPage(1);
          }}
        />
      </SearchSection>

      <div className={styles.wrapper}>
        {/* Filter */}
        <SideBar>
          <FilterOption
            filterTitle="Price"
            filterOptions={priceFilters}
            onChange={(e) => {
              handlePriceChange(e);
              setCurrentPage(1);
            }}
          />
          <FilterOption
            filterTitle="Category"
            filterOptions={categoryFilters}
            onChange={(e) => {
              handleCategoryChange(e);
              setCurrentPage(1);
            }}
          />
        </SideBar>

        {/* Main content */}
        <div className={styles.main}>
          {/* Sort bar */}
          <SortBar
            onChange={(e) => {
              handleSortChange(e);
              setCurrentPage(1);
            }}
          />

          {/* Event list */}
          {/* When there are currently no events */}
          {events.length === 0 && (
            <h2 className={styles.noEvent}>
              Stay tuned! More events are on the way...
            </h2>
          )}

          {/* When no event(s) matched after filtering and/or sorting */}
          {events.length > 0 && currentEvents.length === 0 && (
            <h2 className={styles.noEvent}>No events matched!</h2>
          )}

          {currentEvents.length > 0 && (
            <ul className={styles.list}>
              {currentEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </ul>
          )}
        </div>
      </div>

      <Pagination
        eventsPerPage={eventsPerPage}
        totalEvents={displayedEvents.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
