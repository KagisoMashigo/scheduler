import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {

  
  const InterviewClass = classNames("interviewers__item", {

    "interviewers__item--selected": props.selected,
    "interviewers--full": props.spots === 0,
    
  })

  return (
    <li onClick={() => props.setInterviewer(props.name)} className={InterviewClass}>
      <img
        className={InterviewClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name: ""}
    </li>
  );
}