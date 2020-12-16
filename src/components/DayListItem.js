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
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}