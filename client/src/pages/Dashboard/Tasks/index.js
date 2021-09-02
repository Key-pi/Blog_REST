import React from "react";
import { connect } from "react-redux";
import { getCurrentDate } from "../../../utils";
import TableHeader from "../../../components/Tasks/TaskTable/TableHeader";
import TaskTable from "../../../components/Tasks/TaskTable";
import Modals from "../../../components/Tasks/Modals";

import "react-table/react-table.css";
import "../../../index.css";
import swal from "sweetalert";

import { setTask } from "../../../actions/index";
import { PAGINATION } from "../../../constants/index";
import { isAuth } from "../../../hoc/isAuth";
import {
  getUsers,
  getTask,
  createTask,
  deleteTask,
  updateTask
} from "../../../api/queries";
class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDelete: false,
      modalEdit: false,
      modalCreate: false,
      page: 1,
      pages: 1,
      date: "",
      user: [],
      task: {
        name: "",
        description: "",
        status: "",
        dueDate: "",
        estimatedTime: "",
        assignedTo: ""
      },
      id: ""
    };
  }
  componentDidMount() {
    getTask(false, 1).then((response) => {
      this.props.dispatch(setTask(response.data.results));
      this.setState({
        pages: Math.ceil(response.data.count / PAGINATION)
      });
    });
    getUsers().then((response) => {
      this.setState({
        user: response.data.map((user) => ({ id: user.id, email: user.email }))
      });
    });
  }
  handleSwitchModal = (type, task) => {
    this.setState((state) => ({
      [type]: !state[type],
      task: task,
      id: task.id
    }));
  };

  handleActiveModal = (type) => {
    this.setState((state) => ({
      [type]: !state[type]
    }));
  };

  handleDateChange = (date) => {
    this.setState({
      date: getCurrentDate(date)
    });
  };

  handleCreateTask = (values, { setErrors }) => {
    try {
      createTask({ ...values })
        .then((response) => {
          if (response.status === 201) {
            getTask(false, this.state.page).then((response) => {
              this.setState({
                pages: Math.ceil(response.data.count / PAGINATION)
              });
              this.props.dispatch(setTask(response.data.results));
            });
          }
        })
        .catch((error) => {
          swal({
            icon: "error",
            title: `${error.response}`,
            text: "Please try again"
          });
        });
      this.setState({ modalCreate: false });
    } catch (error) {
      return setErrors(error);
    }
  };

  handleUpdateTask = (values, { setErrors }) => {
    const { id } = this.state;
    console.log(values);
    try {
      updateTask(id, { ...values })
        .then((response) => {
          if (response.status === 200) {
            getTask(false, this.state.page).then((response) => {
              this.props.dispatch(setTask(response.data.results));
            });
          }
        })
        .catch((error) => {
          swal({
            icon: "error",
            title: `${error.response}`,
            text: "Please try again"
          });
        });
      this.setState({ modalEdit: false });
    } catch (error) {
      return setErrors(error);
    }
  };

  handleDeleteTask = async ({ setErrors }) => {
    const { id } = this.state;
    try {
      let page = this.state.page;
      deleteTask(id)
        .then((response) => {
          if (response.status === 204) {
            if (this.props.tasks.data.length > 1) {
              getTask(false, page).then((response) => {
                this.setState({
                  pages: Math.ceil(response.data.count / PAGINATION)
                });
                this.props.dispatch(setTask(response.data.results));
              });
            } else {
              page -= 1;
              if (!page === 0) {
                getTask(false, page).then((response) => {
                  this.setState({
                    pages: Math.ceil(response.data.count / PAGINATION),
                    page: page
                  });
                  this.props.dispatch(setTask(response.data.results));
                });
              } else {
                getTask(false, 1).then((response) => {
                  this.setState({
                    pages: Math.ceil(response.data.count / PAGINATION),
                    page: 1
                  });
                  this.props.dispatch(setTask(response.data.results));
                });
              }
            }
          }
        })
        .catch((error) => {
          swal({
            icon: "error",
            title: `${error.response}`,
            text: "Please try again"
          });
        });
      this.setState({ modalDelete: false });
    } catch (error) {
      setErrors(error);
      return false;
    }
  };

  fetchData = (item) => {
    const page = this.state.page;
    this.setState({
      page: item === "prev" ? page - 1 : page + 1
    });
    getTask(false, item === "prev" ? page - 1 : page + 1)
      .then((response) => {
        this.props.dispatch(setTask(response.data.results));
      })
      .catch((error) => {
        swal({
          icon: "error",
          title: `${error.response}`,
          text: "Please try again"
        });
      });
  };

  render() {
    const {
      modalCreate,
      modalEdit,
      modalDelete,
      page,
      pages,
      task,
      id
    } = this.state;
    return (
      <div>
        <TableHeader
          title="Task list"
          modalCreate={() => this.handleActiveModal("modalCreate")}
        />
        <TaskTable
          tasks={this.props.tasks.data}
          fetchData={this.fetchData}
          page={page}
          pages={pages}
          modal={this.handleSwitchModal}
        />
        <Modals
          modalCreate={modalCreate}
          modalEdit={modalEdit}
          modalDelete={modalDelete}
          handleActiveModal={this.handleActiveModal}
          handleCreateTask={this.handleCreateTask}
          handleUpdateTask={this.handleUpdateTask}
          handleDateChange={this.handleDateChange}
          deleteTask={this.handleDeleteTask}
          task={task}
          user={this.state.user}
          id={id}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}
export default connect(mapStateToProps)(isAuth(Tasks));
