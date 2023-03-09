import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const user = JSON.parse(localStorage.getItem("user"));

const FormProfile = () => {
    const initialValues = {
        about: "",
        height: "",
        weight: "",
        lifestyle: "",
        goals: "",
        mode: "",
        role: user.role,
    };

    const validationSchema = Yup.object().shape({
        about: Yup.string()
            .required("This field is required"),
        height: Yup.string()
            .required("This field is required"),
        weight: Yup.string()
            .required("This field is required"),
        lifestyle: Yup.string()
            .required("Select an option"),
        goals: Yup.string()
            .required("Select an option"),
        mode: Yup.string()
            .required("Select an option"),
    });

    const handleSubmit = (formValue) => {
        console.log(formValue);
    }

    return (
        <div className="profile-form">
            <h1>Complete your profile</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="about">About me:</label>
                        <Field name="about" type="text" className="form-control" />
                        <ErrorMessage
                            name="about"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="height">Height (cm)</label>
                        <Field name="height" type="text" className="form-control" />
                        <ErrorMessage
                            name="height"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weight">Weight (kg)</label>
                        <Field name="weight" type="text" className="form-control" />
                        <ErrorMessage
                            name="weight"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <div>Current Lifestyle</div>
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
                        <div>Goals</div>
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
                        <div>Preffered mode of exercise</div>
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
        </div>
    );
}

export default FormProfile;