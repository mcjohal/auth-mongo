import React, { useState,useEffect, useRef } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import Router from 'next/router' 


const EventUpdateInput = (props) => {
  const [loading,setLoading] = useState(false)
  useEffect(() =>{
    setLoading(true);
    titleInputRef.current.focus();  
    setLoading(false);
  },[])

  const titleInputRef = useRef();
  const locationInputRef = useRef();
  const rt_eventInputRef = useRef()
  const {id,title,location,rt_event} = props;
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("here in handler")
    const enteredTitle = titleInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredRt_event = rt_eventInputRef.current.value;
    console.log(`enteredTitle ${enteredTitle} id ${id}`)
    try {
      const updateEvent = {
        id:id,
        title: enteredTitle,
        location: enteredLocation,
        rt_event: enteredRt_event,
        
      };
      const res = await axios.patch("/api/event", { id:id,
        title: enteredTitle,
        location: enteredLocation,
        rt_event: enteredRt_event,})
      toast.success(res.data.msg)      
      Router.push('/events')
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div className="container-sm">
      <h2 className="text-center text-secondary mt-4">Event Update</h2>

      <form
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
            <div className="col-3"><label autoFocus htmlFor="title" className="form-label">
            Title
          </label></div>
          
          <div className="col-9"> <input
            type="text"
            id="title"
            className="form-control"
            defaultValue={title}
            ref={titleInputRef}
          /></div>
         
        </div>

        <div className="mb-3">
        <div className="col-3"> <label htmlFor="location" className="form-label">
            Location
          </label></div>
         
          <div className="col-9"> <input
            type="text"
            id="location"
            className="form-control"
            defaultValue={location}
            ref={locationInputRef}
          /></div>
         
        </div>

        <div className="mb-3">
        <div className="col-3"> <label htmlFor="rt_event" className="form-label">
            RT Event?
          </label></div>
         
          <div className="col-9"><input
            type="text"
            id="rt_event"
            className="form-control"
            defaultValue={rt_event}
            ref={rt_eventInputRef}
          /></div>
          
        </div>

        <button type="submit" className="btn btn-dark">
          Update
        </button>
      </form>
    </div>
  );
};

export default EventUpdateInput;
