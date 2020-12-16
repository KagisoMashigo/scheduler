import React, { useState } from 'react'
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  // props.value instead of interviewer?
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("");

  // Not resseting name
  const reset = () => {
    setName("")
    setInterviewer(null)
  }
  
  const cancel = () => {
    reset()
    props.onCancel()
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("")
    props.onSave(name, interviewer);
  }

  // const save = () => {
  //   props.onSave(name, interviewer)
  // }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            // the below is sus
            name="name"
            value={name}
            // Should the below be here
            onChange={evt => setName(evt.target.value)}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
            /*
              This must be a controlled component
            */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} save>Save</Button>
        </section>
      </section>
    </main>
  );
  
}