import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) => {
          return (
            <InterviewerListItem
              setInterviewer={(event) => props.onChange(interviewer.id)}
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === props.interviewer}
            />
          );
        })}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;