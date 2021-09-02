import React, { Fragment } from "react";

import Modal from "../../Forms/ModalForm";
import CreateTaskForm from "../../Forms/CreateTaskForm";
import EditTaskForm from "../../Forms/EditTaskForm";
import ModalDelete from "./ModalDelete";

const Modals = ({
  modalCreate,
  modalEdit,
  modalDelete,
  handleActiveModal,
  handleCreateTask,
  handleUpdateTask,
  handleDateChange,
  deleteTask,
  task,
  id,
  user
}) => (
  <Fragment>
    <Modal
      isActive={modalCreate}
      title="Create task"
      closeModal={() => handleActiveModal("modalCreate")}
      user={user}
    >
      <CreateTaskForm
        submitForm={handleCreateTask}
        changeDate={handleDateChange}
        {...task}
        user={user}
      />
    </Modal>
    <Modal
      isActive={modalEdit}
      title="Edit task"
      closeModal={() => handleActiveModal("modalEdit")}
      user={user}
    >
      <EditTaskForm
        submitForm={handleUpdateTask}
        changeDate={handleDateChange}
        {...task}
        user={user}
      />
    </Modal>
    <ModalDelete
      isActive={modalDelete}
      closeModal={() => handleActiveModal("modalDelete")}
      deleteTask={deleteTask}
      id={id}
    />
  </Fragment>
);

export default Modals;
