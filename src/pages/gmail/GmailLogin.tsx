import React, { useState } from "react";
import "./gmail.css";
import Button from "../../../components/button/Button";
import Input from "./gmailinput/Input";
import validator from "validator";
// import { googLogo } from "../../../exports/SvgExports";

const GmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailHasError,setEmailHasError] = useState(false);
  const [passwordHasError,setPasswordHasError] = useState(false);
  const isValidPassword = (password:string) => {
    return password.length >= 8
  }

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    let formIsValid = true;

    if(validator.isEmail(email)){
      setEmailHasError(false)
    }else{
      formIsValid = false;
      setEmailHasError(true)
    }

    if(isValidPassword(password)){
      setPasswordHasError(false)
    }else{
      formIsValid = false;
      setPasswordHasError(true)
    }

    alert(formIsValid)

    
  };



  return (
    <div className="gmaillogin">
      <form className="gmail-content" onSubmit={handleSubmit}>
        <div className="header-gmail">
          {/* {googLogo} */}
          <span>Sign in with Google</span>
        </div>
        <div className="main-container">
          <h1>Login</h1>
          <span>To continue to Coinbase </span>
          
            <Input
              labelDescription={"Email address or phone number"}
              typeInput={"text"}
              idInput={"email"}
              state={[email, setEmail]}
              hasError={emailHasError}
            ></Input>
          
      
            <Input
              labelDescription={"Enter your password"}
              typeInput={"password"}
              idInput={"password"}
              state={[password, setPassword]}
              hasError={passwordHasError}
            ></Input>
      
          <div className="description">
            To continue, Google will share your name, email address, language
            preferences, and profile picture with Spotify. Before using the
            Spotify app, you can review its Privacy Policy and Terms of Use.
          </div>
          <div className="underdescription">
            <span>Create an account </span>
            <button>Next</button>
          </div>
        </div>
      </form>
      <div className="footer-content">
        <ul>
          <li>
            <a href="#"> Help</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GmailLogin;
