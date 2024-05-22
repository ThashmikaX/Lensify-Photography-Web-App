import React from "react";
import "./Button.css";

function Button(props) {
  return (
    <a href={props.url} className={props.className}>
      {props.children}
    </a>
  );
}

export default Button;