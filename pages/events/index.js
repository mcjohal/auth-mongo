import React, { useState, useEffect } from "react";
import EventCreateInput from '../../components/EventCreateInput';
import axios from "axios";
import { toast } from "react-toastify";
import EventItem from "../../components/EventItem";
import ModalConfirm from "../../components/ui/modal-confirm"
import { connectToDatabase } from "../../helpers/db";


const Events = (props) => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  {/*useEffect(() => {
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
  }, []); This works well but it does not refresh without a trigger.  I will try getstaticprops with revalidate.*/} 

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
          props.events.map((event) => (
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

export async function getStaticProps(){
  const client = await connectToDatabase();
  const eventsCollection = client.db().collection("events");
  const events = await eventsCollection.find().toArray();
  console.log(events);
  

  return{
    props:{
      events:events.map((event) =>({
        title:event.title || "",
        location:event.location || "",
        rt_event:event.rt_event,
        id: event._id.toString(),
      })),
    },
    revalidate:5,
  }
}

export default Events;
