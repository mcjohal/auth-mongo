import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import classes from "./auth-form.module.css";
import {toast} from 'react-toastify';

async function createUser(email, password) {
  const credData = { email: email, password: password };
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(credData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Something went wrong!");
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

const Auth = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [buttonLabel, setButtonLabel] = useState("Login");
  const [loading,setLoading] = useState(false);

   useEffect(() =>{
     setLoading(true);
     emailInputRef.current.focus();
     setLoading(false);
   },[])

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    if (buttonLabel === "Login") {
      setButtonLabel("Sign Up");
    } else {
      setButtonLabel("Login");
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      if(!enteredEmail){
        toast.error("Enter email address.");
        return;
      }
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        emailInputRef.current.value= '';
        passwordInputRef.current.value='';
        router.replace("/events");
      }
      else
      {
        toast.error(result.error);
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        router.replace("/profile");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={`${classes.auth} d-flex justify-content-center`}>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email" className="form-label col-md-5 col-sm-12">
            Email address
          </label>
          <input
            type="email"
            className="form-control col-md-3 col-sm-12"
            id="email"
            aria-describedby="emailHelp"
            ref={emailInputRef}
          />
          <div id="emailHelp" className={classes.text}>
            <p>We&apos;ll never share your email.</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label col-md-2 col-sm-12">
            Password
          </label>
          <input
            type="password"
            className="form-control col-md-3 col-sm-12"
            id="password"
            ref={passwordInputRef}
          />
        </div>

        <div className="form-group col-auto">
          <span id="passwordHelpInline" className={classes.text}>
            Must be 8-20 characters long.
          </span>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="approve" />
          <label className="approve" htmlFor="approve">
            Check me out
          </label>
        </div>
        <div>
          {isLogin && (
            <a href="#" onClick={switchAuthModeHandler}>
              sign-up
            </a>
          )}
          {!isLogin && (
            <a href="#" onClick={switchAuthModeHandler}>
              Login
            </a>
          )}  |  <span>forgot password</span>
        </div>

        <div className={`${classes.actions} my-3`}>
          <button type="submit" className="btn btn-dark btn-md">
            {buttonLabel}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Auth;