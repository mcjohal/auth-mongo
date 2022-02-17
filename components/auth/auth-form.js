import { useState, useRef } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import classes from "./Auth-Form.module.css";

async function createUser(email, password) {

  const cred = {
    email: email,
    password:password,
  };
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(cred),
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

const Auth = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    console.log('isLogin', isLogin);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        router.replace("/events");
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
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
       <div className="row">
         <div className="col">
           <button type="submit" className="btn btn-secondary btn-sm">Submit</button>

         </div>
        </div>
      </form>
    </div>
  );
};
export default Auth;
