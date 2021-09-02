import React from "react";
import { connect } from "react-redux";
import { verifyToken, getMe } from "../api/queries/index";
export const isAuth = WrappedComponent => {
  class Comp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null
      };
    }
    async componentDidMount() {
      try {
        const response = await verifyToken();
        const me = await getMe(localStorage.getItem('token'))

        this.setState({user: me.data} )

        if(!response.data.verified)  {
          this.props.history.push("/login")
        }
      } catch (error) {
        console.log("error", error);
      }
    }

    render() {
      console.log(this.state.user)
      return <WrappedComponent {...this.props} user={this.state.user} />;
    }
  }
  const mapStateToProps = state => ({
    data: state.user
  });
  return connect(mapStateToProps, null)(Comp);
};
