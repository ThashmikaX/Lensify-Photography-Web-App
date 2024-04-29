import React from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./accountBox/common";
import { Marginer } from "../pages/marginer";
import "./CompleteProf.css"

const CompleteProf = () => {

  return (
    <div className="BoxContainer">
      <FormContainer>
        <Input type="text" placeholder="Full name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink href="#">
          Signin
        </BoldLink>
      </LineText>
    </div>
  );
}

export default CompleteProf