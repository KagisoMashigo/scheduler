import React, { useState, useEffect } from "react";
import "components/Appointment"

import DayList from "components/DayList.js";
import Appointment from "components/Appointment";

import "components/Application.scss";

const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Ellie Williams",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Triss Merigold",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 6,
    time: "5pm",
  }
];

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  const setDays = (days) => {
    //... your code here ...
    setState(prev => ({ ...prev, days }));
  }

  useEffect(() => {

    const url = `http://localhost:8001/api/days`

      axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setDays(response.data)
        })
        .catch((error) => {
          console.log(error.response.status);
        });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
        days={state.days}
        day={state.day}
        setDay={(id) => setDay(id)}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {
          appointments.map((appointment) => {
            return <Appointment
            key={appointment.id}
            {...appointment}
            // time={appointment.time}
            // interview={appointment.interview}
            />
          })
        }
        <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
  
}

