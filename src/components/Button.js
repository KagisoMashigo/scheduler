import React from "react";
import "components/Button.scss";
const classNames = require('classnames');

export default function Button(props) {
   // let buttonClass = "button";
   // console.log("PROPS: ", props)

   const buttonClass = classNames("button", {
      " button--confirm": props.confirm, 
      " button--danger": props.danger 
   })

   // Using condtional staements to do the above

   // if (props.confirm) {
   //   buttonClass += " button--confirm";
   // }

   // if (props.danger) {
   //    buttonClass += " button--danger";
   // }
    
   return (
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  }