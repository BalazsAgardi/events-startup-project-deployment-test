import { useState } from "react";

export default function useEventFilters(events) {
  const [selector, setSelector] = useState("default");
  const [search, setSearch] = useState("");
  const [checkedPrice, setCheckedPrice] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const handlePriceChange = (e) => handleFilterChange(e, setCheckedPrice);
  const handleCategoryChange = (e) => handleFilterChange(e, setCheckedCategory);
  const priceFilters = ["Free", "Paid"];
  const categoryFilters = [...new Set(events.map((event) => event.category))];
  const displayedEvents = sortEvents(filterEvents());

  function sortEvents(filteredEvents) {
    if (selector === "default") {
      return filteredEvents;
    }

    if (selector === "soonest") {
      return [...filteredEvents].sort((a, b) => a.date.localeCompare(b.date));
    }

    if (selector === "latest") {
      return [...filteredEvents].sort((a, b) => b.date.localeCompare(a.date));
    }

    if (selector === "lowest") {
      return [...filteredEvents].sort((a, b) => a.price - b.price);
    }

    if (selector === "highest") {
      return [...filteredEvents].sort((a, b) => b.price - a.price);
    }

    return filteredEvents;
  }

  function handleSortChange(e) {
    setSelector(e.target.value);
  }

  function filterEvents() {
    return events.filter((event) => {
      const priceType = event.price === 0 ? "Free" : "Paid";
      const matchPrice =
        checkedPrice.length === 0 || checkedPrice.includes(priceType);
      const matchCategory =
        checkedCategory.length === 0 ||
        checkedCategory.includes(event.category);
      const matchSearch =
        search === "" ||
        event.name.toLowerCase().includes(search.toLowerCase());

      return matchSearch && matchPrice && matchCategory;
    });
  }

  function handleFilterChange(e, setCheckedFilter) {
    const { name, checked } = e.target;
    if (checked) {
      setCheckedFilter((previous) => [...previous, name]);
    } else
      setCheckedFilter((previous) => previous.filter((item) => item !== name));
  }

  return {
    displayedEvents,
    search,
    setSearch,
    priceFilters,
    handlePriceChange,
    categoryFilters,
    handleCategoryChange,
    handleSortChange,
  };
}
