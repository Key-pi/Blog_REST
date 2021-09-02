import React from "react";
import { MDBCard, MDBCardText } from "mdbreact";
import { Pie } from "react-chartjs-2";
import { getTask } from "../../api/queries/index";

class GetTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  async componentDidMount() {
    await getTask(true)
      .then(task => {
        this.setState({ tasks: task.data });
      })
      .catch(error => console.log(error));
  }
  render() {
    const stylesOnCard = { width: "22rem", marginTop: "1rem" };
    const tasks = this.state.tasks;
    return (
      <div>
        <div>
          <MDBCard className="card-body" style={stylesOnCard}>
            <h3>Tasks: {tasks ? tasks.length : 0}</h3>
          </MDBCard>
        </div>
        <div>
          <MDBCard className="card-body" style={stylesOnCard}>
            <h3>Tasks: {tasks ? tasks.length : 0}</h3>
            <MDBCardText>
              {tasks ? (
                <Pie
                  data={{
                    labels: ["In progress", "Done", "To Do"],
                    datasets: [
                      {
                        data: [
                          tasks.filter(task => task.status === 0).length,
                          tasks.filter(task => task.status === 1).length,
                          tasks.filter(task => task.status === 2).length
                        ],
                        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
                      }
                    ]
                  }}
                  options={{ responsive: true }}
                />
              ) : null}
            </MDBCardText>
          </MDBCard>
        </div>
      </div>
    );
  }
}
export default GetTasks;
