import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import { getSubscriberProfile } from "../../slices/subscriberProfile";
import { getBusinessProfile } from "../../slices/businessProfile";
import Header from "./header";
import ValidationMessage from "./error";
import { Button } from "@mui/material";

const Login = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/subscriber");
        }
        dispatch(clearMessage());
    }, []);


    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("This is not a valid email")
            .required("This field is required"),
        password: Yup.string().required("This field is required")
    });

    const handleLogin = (formValue) => {
        console.log("handle login called");
        console.log(formValue);
        setLoading(true);

        dispatch(login({ ...formValue }))
            .unwrap()
            .then(() => {
                dispatch(getSubscriberProfile());
                dispatch(getBusinessProfile());
                navigate("/subscriber");
            }).catch(() => {
                setLoading(false);
            })
    }


    return (
        <div className="flex flex-1 w-full h-full overflow-hidden">
            <div className="w-1/2">
                {/* 
                <img src="https://res.cloudinary.com/dhkb0cyyy/image/upload/v1681331400/graham-mansfield-E8VOttj22s4-unsplash_ydv1cm.jpg"
                        className="object-contain max-h-full max-w-full"
                    /> */}

            </div>
            <div className="w-1/2 flex justify-center">
                <div className="max-w-max flex flex-col px-5 content-center justify-center">
                    <Header
                        heading="Login to your account"
                        paragraph="Don't have an account? "
                        linkName="Register"
                        linkUrl="/register"
                    />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}>
                        <Form className="flex flex-col">
                            <div className="">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="email" className="form-control p-1 h-8 w-80" />
                                <ValidationMessage name="email" />
                            </div>

                            <div className="">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className="form-control p-1 h-8 w-80" />
                                <ValidationMessage name="password" />
                            </div>

                            <div className="mt-4 flex justify-center">
                                <Button className="bg-blue-500" type="submit" variant="contained">Submit</Button>
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
            </div>
        </div >



    );

};

export default Login;