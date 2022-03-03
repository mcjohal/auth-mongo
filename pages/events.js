import React, { useState, useEffect } from "react";
import EventInput from "../components/EventInput";
import axios from "axios";
import { toast } from "react-toastify";
import EventItem from "../components/EventItem";

const Events = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get("api/event");
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.msg);
      }
    }
    fetchEvents()
  }, []);
  return (
    <div>
      <EventInput />
      <div className="container">
        {
        events.map((event) => (
          <EventItem key={event._id} event={event} />
        ))
        }
      </div>
      { loading && <h2>Loading ....</h2> }
    </div>
  );
};

export default Events;
