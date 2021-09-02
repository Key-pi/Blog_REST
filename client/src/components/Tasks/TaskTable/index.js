import React, { Fragment } from "react";
import ReactTable from "react-table";

import IosRemoveCircleOutline from "react-ionicons/lib/IosRemoveCircleOutline";
import IosCreateOutline from "react-ionicons/lib/IosCreateOutline";
import Pagination from "./PaginateTable";

class TaskTable extends React.Component {
  render() {
    const columns = [
      {
        Header: "General",
        columns: [
          {
            Header: "Title",
            accessor: "name"
          },
          {
            Header: "Description",
            accessor: "description"
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Status",
            accessor: "status",
            Cell: row =>
              row.original.status === 0
                ? "To Do"
                : row.original.status === 1
                ? "In Progress"
                : row.original.status === 2
                ? "Done"
                : null
          },
          {
            Header: "Due date",
            accessor: "due_date"
          },
          {
            Header: "Estimated time",
            accessor: "estimated_time"
          }
        ]
      },
      {
        Header: "Responsibility",
        columns: [
          {
            Header: "Assigned to",
            accessor: "assigned_to",
            Cell: row =>
              row.original.assigned_to ? row.original.assigned_to.email : null
          }
        ]
      },
      {
        Header: "Actions",
        Cell: row => (
          <div>
            <IosCreateOutline
              onClick={() => this.props.modal("modalEdit", row.original)}
              fontSize="30px"
              color="#007bff"
            />
            <IosRemoveCircleOutline
              onClick={() => this.props.modal("modalDelete", row.original)}
              fontSize="30px"
              color="#007bff"
            />
          </div>
        )
      }
    ];
    return (
      <Fragment>
        <ReactTable
          data={this.props.tasks}
          columns={columns}
          showPagination={false}
          showPageJump={false}
          showPageSizeOptions={false}
          defaultPageSize={10}
          className="-striped -highlight table"
        />
        <Pagination
          fetchData={this.props.fetchData}
          page={this.props.page}
          pages={this.props.pages}
        />
      </Fragment>
    );
  }
}
export default TaskTable;
