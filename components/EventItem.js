import React from "react";
import axios from 'axios';
import { toast } from "react-toastify";


const EventItem = ({ event }) => {
    const  deleteHandler = async () => {
        try {
         
            const res = await axios.delete("api/event", event._id);
            toast.success(res.msg);
          } catch (err) {
            toast.error(err.response.data.msg);
          }
    }
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
