import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

// const formatSpots = (props) => {
//   if (props === 1) {
//     return `${props} spot remaining`
//   } else if (props === 0) {
//     return `no spots remaining`
//   } else {
//     return `${props} spots remaining`
//   }
// }


export default function InterviewerListItem(props) {

  
  const InterviewClass = classNames("interviewers__item", {

    "interviewers__item--selected": props.selected,
    "interviewers--full": props.spots === 0,
    // "interviewers__item-image": props.selected,
    // Why does the above need to be blanked out? Code review
    // "interviewers__item--selected": props.selected,
    // "interviewers__item--selected-image": props.selected,

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