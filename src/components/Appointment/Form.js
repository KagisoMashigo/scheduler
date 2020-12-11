import React, { useState } from 'react'
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  // props.value instead of interviewer?
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  const handleChange = (evt) => {
    setName(evt.target.value)
  }

  // Not resseting name
  const reset = () => {
    setName("")
    setInterviewer(null)
  }
  
  const cancel = () => {
    reset()
    props.onCancel()
  }

  const save = () => {
    props.onSave(name, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            // Should the below be here
            onChange={evt => setName(evt.target.value)}
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={save} save>Save</Button>
        </section>
      </section>
    </main>
  );
  
}