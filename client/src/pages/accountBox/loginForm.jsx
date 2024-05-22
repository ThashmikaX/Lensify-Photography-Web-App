import React, { useContext, useState } from "react";
import axios from 'axios';
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
import { useAuth } from '../../auth/Auth';

export function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { switchToSignup } = useContext(AccountContext);

  const { login, auth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log(response.data.message); // 'Logged in successfully.'
      login(response.data.userId);
      console.log(auth.userId); // { userId: '60f7b1f3f7e8e6b0b4d3b5b3' }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Don't have an accoun?{" "}
        <BoldLink onClick={switchToSignup} href="#">
          Signup
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}