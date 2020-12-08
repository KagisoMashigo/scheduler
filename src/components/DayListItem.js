import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

const formatSpots = (props) => {
  if (props === 1) {
    return `${props} spot remaining`
  } else if (props === 0) {
    return `no spots remaining`
  } else {
    return `${props} spots remaining`
  }
}


export default function DayListItem(props) {


  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0 

  })

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2> 
      <h3 className={dayClass}>{formatSpots(props.spots)}</h3>
    </li>
  );
}