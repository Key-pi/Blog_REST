import * as Yup from "yup";

export const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Name is not required!"),
  description: Yup.string().required("Description is required!"),
  estimatedTime: Yup.number().required("Estimated time is required!"),
  statusSelect: Yup.number().required("Status is required!"),
  assignedTo: Yup.string().required("Assigned to is required!"),
  dueDate: Yup.date().required("Due date is required!")
});
