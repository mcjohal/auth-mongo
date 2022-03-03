import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import Router from 'next/router' 


const EventInput = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [rt_event, setRt_event] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEvent = {
        title: title,
        location: location,
        rt_event: rt_event,
      };
      const res = await axios.post("api/event", { newEvent });
      toast.success(res.data.msg)
      setLocation('')
      setTitle('')
      setRt_event('')
      Router.push('/events')
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div className="container-sm">
      <h2 className="text-center text-secondary mt-4">Events</h2>

      <form
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
            <div className="col-3"><label htmlFor="title" className="form-label">
            Title
          </label></div>
          
          <div className="col-9"> <input
            type="text"
            value={title}
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          /></div>
         
        </div>

        <div className="mb-3">
        <div className="col-3"> <label htmlFor="location" className="form-label">
            Location
          </label></div>
         
          <div className="col-9"> <input
            type="text"
            value={location}
            className="form-control"
            onChange={(e) => setLocation(e.target.value)}
          /></div>
         
        </div>

        <div className="mb-3">
        <div className="col-3"> <label htmlFor="rt_event" className="form-label">
            RT Event?
          </label></div>
         
          <div className="col-9"><input
            type="text"
            value={rt_event}
            className="form-control"
            onChange={(e) => setRt_event(e.target.value)}
          /></div>
          
        </div>

        <button type="submit" className="btn btn-dark">
          Create
        </button>
      </form>
    </div>
  );
};

export default EventInput;
