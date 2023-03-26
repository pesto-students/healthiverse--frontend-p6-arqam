import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postSubscriberProfile } from "../../../slices/subscriberProfile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getSubscriberProfile } from "../../../slices/subscriberProfile";

const FormProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const { subscriberProfileData } = useSelector(state => state.subscriber);
    let navigate = useNavigate();

    const initialValues = {
        about: subscriberProfileData ? subscriberProfileData.about : "",
        height: subscriberProfileData ? subscriberProfileData.height : "",
        weight: subscriberProfileData ? subscriberProfileData.weight : "",
        lifestyle: subscriberProfileData ? subscriberProfileData.lifestyle : "",
        goals: subscriberProfileData ? subscriberProfileData.goals : "",
        mode: subscriberProfileData ? subscriberProfileData.mode : "",
    };

    const validationSchema = Yup.object().shape({
        about: Yup.string()
            .required("This field is required"),
        height: Yup.number()
            .positive()
            .required('This field is required'),
        weight: Yup.number()
            .positive()
            .required('This field is required'),
        lifestyle: Yup.string()
            .required("Select an option"),
        goals: Yup.string()
            .required("Select an option"),
        mode: Yup.string()
            .required("Select an option"),
    });

    useEffect(() => {
        const fetchData = () => {
            dispatch(getSubscriberProfile());
        };
        if (!user) {
            navigate("/login");
        } else {
            fetchData();
        }
    }, []);


    const dispatch = useDispatch();

    const handleSubmit = (formValue) => {
        console.log(formValue);
        dispatch(postSubscriberProfile(formValue))
            .unwrap()
            .then(() => {
                navigate("/subscriber");
                window.location.reload();
            });
    }

    return (

        <div className="profile-form">
            <Link to="/subscriber">back</Link>
            <h1>Complete your profile</h1 >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="about"><h3>About me:</h3></label>
                        <Field name="about" type="text" className="form-control" />
                        <ErrorMessage
                            name="about"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="height"><h3>Height (cm)</h3></label>
                        <Field name="height" type="text" className="form-control" />
                        <ErrorMessage
                            name="height"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weight"><h3>Weight (kg)</h3></label>
                        <Field name="weight" type="text" className="form-control" />
                        <ErrorMessage
                            name="weight"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <div><h3>Current Lifestyle</h3></div>
                        <label>
                            <Field type="radio" name="lifestyle" value="Sedentary" />
                            Sedentary
                        </label>
                        <label>
                            <Field type="radio" name="lifestyle" value="Moedrately Active" />
                            Moedrately Active
                        </label>
                        <label>
                            <Field type="radio" name="lifestyle" value="Active" />
                            Active
                        </label>
                        <ErrorMessage
                            name="lifestyle"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <div><h3>Goals</h3></div>
                        <label>
                            <Field type="radio" name="goals" value="Weight/Fat Loss" />
                            Weight/Fat Loss
                        </label>
                        <label>
                            <Field type="radio" name="goals" value="Weight/Muscle Gain" />
                            Weight/Muscle Gain
                        </label>
                        <label>
                            <Field type="radio" name="goals" value="Just be healthier" />
                            Just be healthier
                        </label>
                        <ErrorMessage
                            name="goals"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <div><h3>Preffered Workout:</h3></div>
                        <label>
                            <Field type="radio" name="mode" value="Gym Workouts" />
                            Gym Workouts
                        </label>
                        <label>
                            <Field type="radio" name="mode" value="Home Workouts" />
                            Home Workouts
                        </label>
                        <ErrorMessage
                            name="mode"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">
                            Submit Form
                        </button>
                    </div>

                </Form>
            </Formik>
        </div >


    );
}

export default FormProfile;