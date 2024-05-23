import React from "react";
import "./Button.css";

function Button(props) {
  return (
    // <div className="button-main">
      <a href={props.url} className="link">
      <div className={props.className}>{props.children}</div>
      </a>
    /* </div> */
  );
}

export default Button;