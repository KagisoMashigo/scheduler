import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  
    return(
      // practice mapping, reducing & filtering
      <ul>
      {
        props.days.map((day) => {
         return <DayListItem 
            name={day.name} 
            spots={day.spots} 
            selected={day.name === props.day}
            setDay={props.setDay}  
            />
        })
      }
    </ul>
    )

    
}