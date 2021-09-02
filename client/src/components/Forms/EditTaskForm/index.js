import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "mdbreact";
import { ReactstrapInput } from "reactstrap-formik";
import DatePicker from "react-datepicker";

import Select from "react-select";
import { TaskSchema } from "../CreateTaskForm/validation";
import "../CreateTaskForm/style.scss";
import "react-datepicker/dist/react-datepicker.css";

const EditTaskForm = props => (
  <Formik
    initialValues={{
      title: props.name,
      description: props.description,
      statusSelect: props.status,
      dueDate: props.due_date,
      estimatedTime: props.estimated_time,
      assignedTo: props.assigned_to
    }}
    validationSchema={TaskSchema}
    onSubmit={props.submitForm}
  >
    {({ values, setFieldValue, touched, errors }) => (
      <div className="card">
        <div className="card-body">
          <Form>
            <Field
              name="title"
              type="text"
              component={ReactstrapInput}
              label="Title"
            />
            <Field
              name="description"
              type="text"
              component={ReactstrapInput}
              label="Description"
            />
            <label>Status</label>
            <select
              id="statusSelect"
              name="status"
              className="browser-default custom-select position-relative form-group"
              onChange={e => setFieldValue("statusSelect", e.target.value)}
              value={values.statusSelect}
            >
              <option value="0">ToDo</option>
              <option value="1">InProgress</option>
              <option value="2">Done</option>
            </select>
            <div className="position-relative form-group">
              <label>Due date</label>
              <div>
                <DatePicker
                  selected={new Date(values.dueDate)}
                  onChange={date => setFieldValue("dueDate", date)}
                  className={`date-picker ${
                    errors.dueDate && touched.dueDate
                      ? "data-picker-is-invalid"
                      : ""
                  }`}
                />
                {errors.dueDate && touched.dueDate && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {errors.dueDate}
                  </div>
                )}
              </div>
            </div>
            <Field
              name="estimatedTime"
              type="number"
              component={ReactstrapInput}
              label="Estimate Time"
              value={values.estimatedTime}
            />
            <label>Assigned to</label>
            <Field
              name="assignedTo"
              component={Select}
              options={props.user.map(user => ({
                label: user.email,
                value: user.id
              }))}
              label="Assigned to"
              onChange={e => setFieldValue("assignedTo", e)}
              value={{
                label: values.assignedTo.email || values.assignedTo.label,
                value: values.assignedTo.id
              }}
              className={` ${
                errors.assignedTo && touched.assignedTo
                  ? "select-is-ivalid"
                  : ""
              }`}
              classNamePrefix="select"
            />
            <br />
            <div>
              <Button color="primary" type="submit" style={{ margin: 0 }}>
                Save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    )}
  </Formik>
);

export default EditTaskForm;
