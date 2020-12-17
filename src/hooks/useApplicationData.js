import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {},
  });

  useEffect(() => {
    const daysUrl = `/api/days`;
    const appUrl = `/api/appointments`;
    const IVurl = `/api/interviewers`;

    Promise.all([axios.get(daysUrl), axios.get(appUrl), axios.get(IVurl)]).then(
      (res) => {
        setState((prev) => ({
          ...prev,
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data,
        }));
      }
    );
  }, []);

  // Responsible for booking the interview, uses get request to update spots, which is apparently controversial but I believe is brilliant
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((_res) => {
        return setState({
          ...state,
          appointments: {
            ...state.appointments,
            [id]: appointment,
          },
        });
      })
      .then(() => {
        return axios.get(`/api/days`);
      })
      .then((res) => {
        setState((prev) => ({ ...prev, days: res.data }));
      })
      .catch((err) => console.log(err));
  }

  // Responsible for deleting the interview, uses get request to update spots
  function deleteInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        return setState({
          ...state,
          appointments: {
            ...state.appointments,
            [id]: {
              ...state.appointments[id],
              interview: null,
            },
          },
        });
      })
      .then(() => {
        return axios.get(`/api/days`);
      })
      .then((res) => {
        setState((prev) => ({ ...prev, days: res.data }));
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  };
}