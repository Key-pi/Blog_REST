import React from "react";

import { Formik, Form, Field } from "formik";
import { Button } from "mdbreact";
import { ReactstrapInput } from "reactstrap-formik";
import DatePicker from "react-datepicker";

import Select from "react-select";

import { TaskSchema } from "./validation";

import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

const CreateTaskForm = props => (
  <Formik
    initialValues={{
      title: "",
      description: "",
      estimatedTime: 0,
      statusSelect: 2,
      dueDate: new Date(),
      assignedTo: "",
      user: []
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
                  selected={values.dueDate}
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
              value={values.assignedTo}
              className={` ${
                errors.assignedTo && touched.assignedTo
                  ? "select-is-ivalid"
                  : ""
              }`}
              classNamePrefix="select"
            />
            {errors.assignedTo && touched.assignedTo && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {errors.assignedTo}
              </div>
            )}
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

export default CreateTaskForm;
