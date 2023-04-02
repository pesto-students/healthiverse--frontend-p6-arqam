import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { clearMessage } from "../../../slices/message";
import { updateAccountDetails } from "../../../slices/auth";

const EditAccount = () => {
    const { user } = useSelector((state) => state.auth);
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        name: user ? user.name : "",
        email: user ? user.email : "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("This field is required"),
        email: Yup.string()
            .email("This is not a valid email")
            .required("This field is required"),
        password: Yup.string()
            .test("len",
                "The password must be between 6 and 40 characters",
                (val) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40)
            .required("This field is required"),
    });

    const handleSubmit = (formValue) => {
        setSuccessful(false);
        dispatch(updateAccountDetails(formValue))
            .unwrap()
            .then(() => {
                setSuccessful(true);

            })
            .catch(() => { setSuccessful(false) });
    };

    return (
        <div className="signup-form">

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                <Form>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field name="name" type="text" className="form-control" />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

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
                                <Field
                                    name="password"
                                    type="password"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </div>
                        </div>
                    )}
                </Form>
            </Formik>

            {message && (
                <div className="form-group">
                    <div
                        className={successful ? "alert alert-success" : "alert alert-danger"}
                        role="alert"
                    >
                        {message}
                    </div>
                </div>
            )}

        </div>
    );

}

export default EditAccount;