import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postProfile } from "../../../slices/profile";
import { useDispatch } from "react-redux";

const user = JSON.parse(localStorage.getItem("user"));

const FormGym = () => {
    const initialValues = {
        about: "",
        address: "",
        activites: [],
        openTime: {
            from: "",
            to: "",
        },
        membership: {
            one: "",
            three: "",
            six: "",
            twelve: "",
        },
    };

    const validationSchema = Yup.object().shape({
        about: Yup.string()
            .required("This field is required"),
        address: Yup.string()
            .required("This field is required"),
        activites: Yup.array().min(1,"Select at least one activity"),
        openTime: Yup.object().shape({
            from: Yup.string().required('Opening hours are required'),
            to: Yup.string().required('Opening hours are required')
        }),
        membership: Yup.object().shape({
            one: Yup.string().required('Membership price is required'),
            three: Yup.string().required('Membership price is required'),
            six: Yup.string().required('Membership price is required'),
            twelve: Yup.string().required('Membership price is required'),
        }),
    });

    const dispatch = useDispatch();

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
                        <label htmlFor="about"><h3>About:</h3></label>
                        <Field name="about" type="text" className="form-control" />
                        <ErrorMessage
                            name="about"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address"><h3>Address:</h3></label>
                        <Field name="address" type="text" className="form-control" />
                        <ErrorMessage
                            name="address"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <div><h3>Activities:</h3></div>
                        <label>
                            <Field type="checkbox" name="activites" value="Gym" />
                            Gym
                        </label>
                        <label>
                            <Field type="checkbox" name="activites" value="HIIT" />
                            HIIT
                        </label>
                        <label>
                            <Field type="checkbox" name="activites" value="CrossFit" />
                            CrossFit
                        </label>
                        <label>
                            <Field type="checkbox" name="activites" value="Powerlifting" />
                            Powerlifting
                        </label>
                        <label>
                            <Field type="checkbox" name="activites" value="Zumba" />
                            Zumba
                        </label>
                        <label>
                            <Field type="checkbox" name="activites" value="Yoga" />
                            Yoga
                        </label>
                        <ErrorMessage
                            name="activites"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <div><h3>Opening Hours:</h3></div>
                        <label htmlFor="openTime.from"><b>From:</b></label>
                        <Field name="openTime.from" type="text" className="form-control" />
                        <ErrorMessage
                            name="openTime.from"
                            component="div"
                            className="alert alert-danger"
                        />
                        <label htmlFor="openTime.to"><b>To:</b></label>
                        <Field name="openTime.to" type="text" className="form-control" />
                        <ErrorMessage
                            name="openTime.to"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <div><h3>Membership Price:</h3></div>
                        <label htmlFor="membership.one"><b>One Month:</b></label>
                        <Field name="membership.one" type="text" className="form-control" />
                        <ErrorMessage
                            name="membership.one"
                            component="div"
                            className="alert alert-danger"
                        />
                        <label htmlFor="membership.three"><b>Three Months:</b></label>
                        <Field name="membership.three" type="text" className="form-control" />
                        <ErrorMessage
                            name="membership.three"
                            component="div"
                            className="alert alert-danger"
                        />
                        <label htmlFor="membership.six"><b>Six Months:</b></label>
                        <Field name="membership.six" type="text" className="form-control" />
                        <ErrorMessage
                            name="membership.six"
                            component="div"
                            className="alert alert-danger"
                        />
                        <label htmlFor="membership.twelve"><b>One Year:</b></label>
                        <Field name="membership.twelve" type="text" className="form-control" />
                        <ErrorMessage
                            name="membership.twelve"
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

export default FormGym;