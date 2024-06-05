import React from "react";
import "./Button.css";

function Button(props) {
  const buttonClick = (event) => {
    if (props.onClick) {
      props.onClick(event);
    }
    if (props.url) {
      event.preventDefault();
      window.location
        ? window.location.assign(props.url)
        : console.log("No URL provided");
    }
  }

  return (
    <button onClick={buttonClick} className={props.className} type={props.type}>{props.children}</button>
  );
  
};

export default Button;