import classes from "./starting-page.module.css";
import { useRef, useState, useEffect } from "react";
import Alert from "../../components/ui/alert";

function StartingPageContent() {

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

  async function createCustomer(firstName, lastName, email, cellPhone) {
    console.log(firstName, lastName, email, cellPhone);
    const customerData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      cellPhone: cellPhone,
    };
    console.log(customerData);
    const response = await fetch("api/modifyCustomer", {
      method: "POST",
      body: JSON.stringify(customerData),
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

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const cellPhoneInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    setRequestStatus("pending");
    setGetMessage("pending....");

    try {
      const enteredFirstName = firstNameInputRef.current.value;
      const enteredLastName = lastNameInputRef.current.value;
      const enteredEmail = emailInputRef.current.value;
      const enteredCellPhone = cellPhoneInputRef.current.value;

      const result = await createCustomer(
        enteredFirstName,
        enteredLastName,
        enteredEmail,
        enteredCellPhone
      );
      console.log("result", result);

      setRequestStatus(result.status);
      setGetMessage(result.message);


      firstNameInputRef.current.value = "";
      lastNameInputRef.current.value = "";
      emailInputRef.current.value = "";
      cellPhoneInputRef.current.value = "";
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
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" ref={firstNameInputRef} />
            </div>
            <div className="mb-3 row">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" ref={lastNameInputRef} />
            </div>
            <div className="mb-3 row">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" ref={emailInputRef} required />
            </div>
            <div className="mb-3 row">
              <label htmlFor="cellPhone">Phone</label>
              <input type="tel" id="cellPhone" ref={cellPhoneInputRef} />
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

export default StartingPageContent;
