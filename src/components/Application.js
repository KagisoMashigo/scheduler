import React, { useState, useEffect } from "react";
import "components/Appointment"

import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

import "components/Application.scss";

const axios = require('axios');

export default function Application(props) {
  
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });
  
  useEffect(() => {
    
    const daysUrl = `http://localhost:8001/api/days`
    const appUrl = `http://localhost:8001/api/appointments`
    const IVurl = `http://localhost:8001/api/interviewers`
    
    Promise.all([
      axios.get(daysUrl),
      axios.get(appUrl),
      axios.get(IVurl)
    ]).then((res) => {
      // console.log("DAYS: ", res[0]);
      // console.log("APP: ", res[1]);
      // console.log("IV: ", res[2]); 
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
    })
  }, []);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
      key={appointment.id}
      {...appointment}
      interview={interview}
      // time={appointment.time}
      />
    )
  })

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
        setDay={setDay}
        // setDay={day => setDay({ day })}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
  
}

