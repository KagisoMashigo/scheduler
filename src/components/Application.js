import React from "react";

import "components/Appointment"
import useApplicationData from "hooks/useApplicationData";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";
// Bugs: show transtion not working due to error on line 13 in show when interverw namm needed
// After deleting, editing or any actions that makes transiotn, I get error
// Day not showing as selected

export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)

  const schedule = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);
    // console.log(interviewers)

    return (
      <Appointment
      key={appointment.id}
      {...appointment}
      interview={interview}
      interviewers={interviewers}
      bookInterview={(interview) => bookInterview(appointment.id, interview)}
      deleteInterview={() => deleteInterview(appointment.id)}
      time={appointment.time}
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

