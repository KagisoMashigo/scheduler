import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  
    return(
      // practice mapping, reducing & filtering
      <ul>
      {
        props.days.map((day) => {
         return <DayListItem
            key={day.id}
            name={day.name} 
            spots={day.spots} 
            selected={day.id === props.day}
            setDay={(event) => props.setDay(day.id)}  
            />
        })
      }
    </ul>
    )

    
}