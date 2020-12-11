import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">    
      {
        props.interviewers.map((interviewer) => {
         return <InterviewerListItem
            //must be called key for any unique property or react will thr error
            setInterviewer={(event) => props.onChange(interviewer.id)}
            key={interviewer.id}
            // the above are needed but the LVList fucntion
            // the below are required by the IVListItem function
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.interviewer}
            />
        })
      } 
      </ul>
    </section>
  );
}