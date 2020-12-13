// review this function
export function getAppointmentsForDay(state, day) {

  if(!state.days){
    return [];
  }
  let theDay = state.days.filter(d => d.name === day)[0];
  if(!theDay){
    return [];
  }
  let result = [];
  for(const id of theDay.appointments){
    const appointmentObj = state.appointments[id];
    result.push(appointmentObj);
  }

  return result;
}

export function getInterview(state, interview) {
  let interviewersObj = state.interviewers;
  let result = {};

  if(!interviewersObj || !interview){
    return null;
  }

  result.interviewer = interviewersObj[interview.interviewer]
  result.student = interview.student

  return result;
}

export function getInterviewersForDay(state, day) {
  let result = [];
  let days = state.days;
  let interviewersForStateDay;

  //Checks validity of state.days
  if(state.days.length < 1){
    return [];
  }

  //Retrieves interviewers for day
  for(const stateDay of days){
    if(stateDay.name === day){
      interviewersForStateDay = stateDay.interviewers;
    }
  }

  //if no day is found, return empty []
  if(!interviewersForStateDay){
    return [];
  }

  //Push interviewer objects to results;
  for(const id of interviewersForStateDay){
    let interviewer = state.interviewers[id];
    result.push(interviewer);
  }

  return result;
}