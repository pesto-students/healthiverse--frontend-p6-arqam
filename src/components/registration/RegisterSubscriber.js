import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { register } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import Header from "../login/header";
import ValidationMessage from "../login/error";
import { Button } from "@mui/material";

const RegisterSubscriber = () => {
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        name: "",
        email: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().test("len",
            "Name can not be longer than 40 characters",
            (val) =>
                val &&
                val.toString().length <= 40)
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

    const handleRegister = (formValue) => {

        setSuccessful(false);

        dispatch(register({ ...formValue }))
            .unwrap()
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => { setSuccessful(false) });
    };

    return (
        <div className="flex w-full py-4">
            <div className="w-1/2">
                Image
            </div>
            <div className="w-1/2 flex justify-center">
                <div className="max-w-max flex flex-col px-5 content-center justify-center">
                    <Header
                        heading="Create your account"
                        paragraph="Already have an account? "
                        linkName="Login"
                        linkUrl="/login"
                    />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleRegister}>
                        <Form>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <Field name="name" type="text" className="form-control p-1 h-8 w-80" />
                                        <ValidationMessage name="name" />

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field name="email" type="email" className="form-control p-1 h-8 w-80" />
                                        <ValidationMessage name="email" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field
                                            name="password"
                                            type="password"
                                            className="form-control p-1 h-8 w-80"
                                        />
                                        <ValidationMessage name="password" />
                                    </div>

                                    <div className="mt-4 flex justify-center">
                                        <Button className="bg-blue-500" type="submit" variant="contained">Submit</Button>
                                    </div>

                                </div>
                            )}
                        </Form>
                    </Formik>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >

    );

}

export default RegisterSubscriber;