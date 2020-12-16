import { useState, useEffect } from "react";
// const axios = require('axios');
import axios from "axios";

export default function useApplicationData() {

  const setDay = day => setState({ ...state, day });
    
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });

  useEffect(() => {
    
    const daysUrl = `/api/days`
    const appUrl = `/api/appointments`
    const IVurl = `/api/interviewers`
    
    Promise.all([
      axios.get(daysUrl),
      axios.get(appUrl),
      axios.get(IVurl)
    ]).then((res) => {
      // console.log("DAYS: ", res[0]);
      // console.log("APP: ", res[1]);
      // console.log("IV: ", res[2].data); 
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
      
    })
  }, []);

  function bookInterview(id, interview) {

    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then((_res) => {
        //console.log(`PUT /api/appointments/${id}`, res);
        return setState({
          ...state,
          appointments: {
            ...state.appointments,
            [id]: appointment
          }
        });
      })
      .then(() => {
        return axios.get(`/api/days`)    
      })
      .then((res) => {
        setState(prev => ({...prev, days: res.data}))
      })
      .catch((err) => console.log(err));
  }

  function deleteInterview(id) {
    // console.log("deleteInterview: id:", id);
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        console.log(`DELETE /api/appointments/${id}`, res);
        return setState({
          ...state,
          appointments: {
            ...state.appointments,
            [id]: {
              ...state.appointments[id],
              interview: null
            }
          }
        })
      })
      .then(() => {
        return axios.get(`/api/days`)    
      })
      .then((res) => {
        setState(prev => ({...prev, days: res.data}))
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