import React, { useState, useEffect } from "react";
const axios = require('axios');

export default function useApplicationData() {

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
      console.log("IV: ", res[2].data); 
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
      
    })
  }, []);

  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day]
  }


  function bookInterview(id, interview) {

    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const dayOfWeek = findDay(state.day)

    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek]
    }
  
    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1
      } 
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots
      } 
    }
  
    let days = state.days
    days[dayOfWeek] = day;

    return axios.put(`/api/appointments/${id}`, appointment)
      .then((_res) => {
        //console.log(`PUT /api/appointments/${id}`, res);
        setState({
          appointments: {
            ...state.appointments,
            [id]: appointment,
            days
          }
        });
      })
      .catch((err) => console.log(err));
  }

  function deleteInterview(id) {
    // console.log("deleteInterview: id:", id);
    const dayOfWeek = findDay(state.day)

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    }

    let days = state.days
    days[dayOfWeek] = day;

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        console.log(`DELETE /api/appointments/${id}`, res);
        setState({
          appointments: {
            ...state.appointments,
            days,
            [id]: {
              ...state.appointments[id],
              interview: null
            }
          }
        });
      })
      //.catch((err) => console.log(`DELETE /api/appointments/${id}`, err));
  }


  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}