import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";

export default function Appointment(props) {
  // Saves user information
  function saveInterview(name, interviewer) {
    transition(SAVING);
    props
      .bookInterview({
        student: name,
        interviewer,
      })
      .then(() => transition(SHOW))
      .catch((err) => {
        transition(ERROR_SAVE, true);
      });
  }

  function deleteInterview() {
    transition(DELETING, true);
    props
      .deleteInterview()
      .then(() => transition(EMPTY))
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRMING)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={saveInterview}
        />
      )}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === CONFIRMING && (
        <Confirm
          message={"DELETE IT, I double dare you..."}
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={saveInterview}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Server error, cannot save."} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Server error, cannot delete."} onClose={back} />
      )}
    </article>
  );
}
