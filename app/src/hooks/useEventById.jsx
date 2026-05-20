import { useEffect, useState } from "react";
import api from "../api";

export default function useEventById(eventId) {
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(api("events/" + eventId));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  return { event, loading, error };
}
