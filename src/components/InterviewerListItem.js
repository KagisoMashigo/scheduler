import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {

  const InterviewClass = classNames("interviewers__item", {

    "interviewers__item--selected": props.selected,

  })

  // let InterviewClass = "interviewers__item";

  // if (props.selected) {
  //   InterviewClass += " --selected";
  // }

  return (
    <li className={InterviewClass} onClick={props.setInterviewer}>
      <img
        className={"interviewers__item-image"}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name: ""}
    </li>
  );
}