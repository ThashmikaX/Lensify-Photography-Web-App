import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from './accountContext';
import Axios from "axios";




export function SignupForm(props) {

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (event) => {
    console.log("submitting");
    event.preventDefault();
    console.log(firstName, lastName, email, confirmPassword);
  Axios.post("http://localhost:3001/register", {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Password: confirmPassword,
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
}
   

  const { switchToSignin } = useContext(AccountContext);
  return (
    <BoxContainer onSubmit={handleSubmit}>
      <FormContainer>
        <Input type="text" placeholder="First name"
          onChange={(e) => {
            setfirstName(e.target.value);
          }} />
        <Input type="text" placeholder="Last name"
          onChange={(e) => {
            setlastName(e.target.value);
            }} />
        <Input type="email" placeholder="Email"
        onChange={(e) => {
            setEmail(e.target.value);
            }}/>
        <Input type="password" placeholder="Password"
        onChange={(e) => {
            setPassword(e.target.value);
            }}/>
        <Input type="password" placeholder="Confirm password"
          onChange={(e) => {
            if (e.target.value == password) {
              setConfirmPassword(e.target.value);
            }
            else {
              console.log("Passwords do not match");   
            }
          }} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <button type="submit" onClick={handleSubmit} className="button submit">
          Submit
      </button>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} href="#">
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}