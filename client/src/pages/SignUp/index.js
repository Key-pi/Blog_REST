import React from "react";

import * as path from "../../constants/routes";
import {Container} from "reactstrap";

import {SignUpForm} from "../../components/Forms/SignUpForm/index";
import swal from "sweetalert";
import {signUp} from "../../api/queries/index.js";

const SignUp = props => {
    const handleSignUp = async (values, {setErrors}) => {
        try {
            await signUp(values)
                .then(response => {
                    if (response.status === 201) {
                        props.history.push(path.DASHBOARD);
                    } else {
                        swal({
                            icon: "error",
                            title: "Ooops something wrong!",
                            text: "Please try again"
                        });
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
                    setErrors(errors);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <SignUpForm register={handleSignUp}/>
        </Container>
    );
};

export default SignUp;
