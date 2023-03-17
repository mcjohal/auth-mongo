import classes from "./create-announcements.module.css";
import { useRef, useState, useEffect } from "react";
import Alert from "../ui/alert";

const CreateAnnouncements = () => {
 
  const [requestStatus, setRequestStatus] = useState("");
  const [getMessage, setGetMessage] = useState("");

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error'){
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setGetMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function createAnnouncement(date, announcement) {
    console.log(date, announcement);
    const announcementData = {
      date: date,
      announcement: announcement,
      
    };
    console.log(announcementData);
    const response = await fetch("api/createAnnouncement", {
      method: "POST",
      body: JSON.stringify(announcementData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    return data;
  }

  const dateInputRef = useRef();
  const announcementInputRef = useRef();
  

  async function submitHandler(event) {
    event.preventDefault();

    setRequestStatus("pending");
    setGetMessage("pending....");

    try {
      const enteredDate = dateInputRef.current.value;
      const enteredAnnouncement = announcementInputRef.current.value;
     

      const result = await createAnnouncement(
        enteredDate,
        enteredAnnouncement,
 
      );
      console.log("result", result);

      setRequestStatus(result.status);
      setGetMessage(result.message);


      dateInputRef.current.value = "";
      announcementInputRef.current.value = "";
      
    } catch (e) {
      console.log(e);    
      setRequestStatus("error");
      setGetMessage("There has been an error. Please try again.");
      
    }
  }
  let alertMessage;
  if (requestStatus) {
    alertMessage = {
      message: getMessage,
    };
  }

  return (
    <section
      className={`${classes.starting} container-fluid`}
    >
      {requestStatus && (
        <div className="row pb-5">
          <div className="col d-flex justify-content-center">
            <Alert message={alertMessage.message} />
          </div>
        </div>
      )}
      <div className="row">
        <div className="co d-flex justify-content-center">
          <form onSubmit={submitHandler}>
            <div className="mb-3 row">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" ref={dateInputRef} />
            </div>
            <div className="mb-3 row">
              <label htmlFor="announcement">Announcement</label>
              <textarea rows="4" col="100" type="text" id="announcement" ref={announcementInputRef} />
            </div>
           

            <button className="btn btn-dark btn-md" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default CreateAnnouncements
