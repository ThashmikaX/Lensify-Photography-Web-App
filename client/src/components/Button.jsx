import React from "react";
import "./Button.css";

function Button(props) {
  const buttonClick = (event) => {
    event.preventDefault();
    window.location
      ? window.location.assign(props.url)
      : console.log("No URL provided");
  }

  return (
    <button onClick={buttonClick} href={props.url} className={props.className}>{props.children}</button>
  );
  
};

export default Button;