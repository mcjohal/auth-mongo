import React, { useState, useEffect } from "react";
import EventCreateInput from '../../components/EventCreateInput';
import axios from "axios";
import { toast } from "react-toastify";
import EventItem from "../../components/EventItem";
import ModalConfirm from "../../components/ui/modal-confirm"

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

   const deleteEventHandler = async (id) => {
  try {
    const res = await axios.delete("api/event", id);
    toast.success(res.data.msg);
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};
  return (
    <div>
      <EventCreateInput />
     <div className="container">
        {
          events.map((event) => (
            <EventItem key={event._id} event={event}
              onDeleteHandler= {deleteEventHandler}
          />
        ))
        }
      </div>
      {loading && <h2>Loading ....</h2>}
      <ModalConfirm title="Delete Modal" message="Delete Event?"
        onModalResponse={deleteEventHandler}
      />
    </div>
  );
};

export default Events;
