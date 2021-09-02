import React from "react";
import swal from "sweetalert";

import { connect } from "react-redux";
import { Container } from "reactstrap";
import { LoginForm } from "../../components/Forms/LoginForm/index";

import { login } from "../../api/queries/index";

const Login = props => {
  const handleLogin = async values => {
    try {
      await login(values)
        .then(response => {
          if (response.status === 200) {
            props.dispatch({ type: "SET_TOKEN", payload: response.data.key });
            localStorage.setItem("token", response.data.key);
            props.history.push("/dashboard");
          }
        })
        .catch(error => {
          const errors = {};
          const errorData = error.response.data;
          for (const key in errorData) {
            if (errorData.hasOwnProperty(key)) {
              const element = errorData[key];
              errors[key] = element.toString();
            }
          }
          swal({
            icon: "error",
            title: "Ooops something wrong!",
            text: errors.non_field_errors
          });
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <LoginForm login={handleLogin}></LoginForm>
    </Container>
  );
};

const mapStateToProps = state => ({
  data: state.user
});

export default connect(mapStateToProps)(Login);
