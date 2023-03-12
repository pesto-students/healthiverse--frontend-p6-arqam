import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";

const BusinessLogin = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("This field is required"),
        password: Yup.string().required("This field is required")
    });

    const handleLogin = (formValue) => {
        console.log("handle login called");
        console.log(formValue);
        setLoading(true);

        dispatch(login({ ...formValue }))
            .unwrap()
            .then(() => {
                navigate("/business");
            }).catch(() => {
                setLoading(false);
            })
    }

    if (isLoggedIn) {
        return <Navigate to={"/business"} />
    }

    return (
        <div className="login-form">
            <div className="heading">
                <h1>Business Login Page</h1>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" className="form-control" />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" className="form-control" />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" >
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
            {loading && (
                <div className="loading">Loading...</div>
            )}
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </div>


    );

};

export default BusinessLogin;