import { useEffect, useState } from "react";
import api from "../api";

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(api("events"));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
}
