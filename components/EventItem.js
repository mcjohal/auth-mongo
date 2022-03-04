import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";

const EventItem = ({ event }) => {

  const id = event._id;

  const deleteHandler = async () => {
    try {      
      const res = await axios.delete("api/event", { id });
      toast.success(res.data.msg);
      Router.push("/events");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const updateHandler = async () => {
    Router.push(`/events/event-update/${id}`)
  };
  return (
    <div id="event-list" className="border shadow-sm rounded my-3">
      <div className="row my-3 p-2  text-capitalized">
        <div className="col-md-1 col-3">Title:</div>
        <div className="col-md-7 col-6">{event.title}</div>
        <div className="col-md-3 col-3">
          <a href="#" onClick={deleteHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
            </svg>
          </a>
          <a href="#" onClick={updateHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <rect fill="none" height="24" width="24" />
              <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M16.17,14.76l-1.1-1.1c0.71-1.33,0.53-3.01-0.59-4.13C13.79,8.84,12.9,8.5,12,8.5c-0.03,0-0.06,0.01-0.09,0.01 L13,9.6l-1.06,1.06L9.11,7.83L11.94,5L13,6.06l-0.96,0.96c1.27,0.01,2.53,0.48,3.5,1.44C17.24,10.17,17.45,12.82,16.17,14.76z M14.89,16.17L12.06,19L11,17.94l0.95-0.95c-1.26-0.01-2.52-0.5-3.48-1.46c-1.71-1.71-1.92-4.35-0.64-6.29l1.1,1.1 c-0.71,1.33-0.53,3.01,0.59,4.13c0.7,0.7,1.63,1.04,2.56,1.01L11,14.4l1.06-1.06L14.89,16.17z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="row my-3 p-2">
        <div className="col-md-1 col-sm-3 col-3">Location:</div>
        <div className="col-md-5 col-sm-9 col-9">{event.location}</div>
        <div className="col-md-1 col-sm-3 col-3">RT Event:</div>
        <div className="col-md-5 col-sm-9 col-9">{event.location}</div>
      </div>
    </div>
  );
};

export default EventItem;
