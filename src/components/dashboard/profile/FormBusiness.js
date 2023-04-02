import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postBusinessProfile } from "../../../slices/businessProfile";
import { useNavigate } from "react-router-dom";
import { clearMessage } from "../../../slices/message";
import axios from "axios";
import { Avatar } from "@mui/material";
const user = JSON.parse(localStorage.getItem("user"));

const FormBusiness = () => {
    const { businessProfiles } = useSelector((state) => state.business);
    // let gymProfiles = businessProfiles.filter(profile => profile.businessType === "gym");
    let trainerProfile = businessProfiles?.filter(profile => profile.businessType === "trainer");
    let dieticianProfile = businessProfiles?.filter(profile => profile.businessType === "dietician");
    const [alert, setAlert] = useState("");
    const [option, setOption] = useState("");
    const [businessType, setBusinessType] = useState("");
    const { message } = useSelector(state => state.message);
    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState("");

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    }
    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image);
        data.append("upload_preset", "tadipaar");
        data.append("cloud_name", "dhkb0cyyy");
        return axios.post("https://api.cloudinary.com/v1_1/dhkb0cyyy/image/upload", data);
    }

    useEffect(() => {
        dispatch(clearMessage())
    }, [dispatch]);

    const initialValues = {
        name: "",
        about: "",
        address: "",
        contact: "",
        businessType: businessType,
        activities: [],
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
        name: Yup.string()
            .required("This field is required"),
        about: Yup.string()
            .required("This field is required"),
        address: Yup.string(),
        contact: Yup.number().typeError("Contact must be a number")
            .integer()
            .required("This field is required"),
        businessType: Yup.string()
            .required("This field is required"),
        activites: Yup.array().min(1, "Select at least one activity"),
        openTime: Yup.object().shape({
            from: Yup.string(),
            to: Yup.string(),
        }),
        membership: Yup.object().shape({
            one: Yup.string().required('This field is required'),
            three: Yup.string().required('This field is required'),
            six: Yup.string().required('This field is required'),
            twelve: Yup.string().required('This field is required'),
        }),
    });

    const handleSubmit = async (formValue) => {
        let url = "";
        if (image) {
            console.log("Upload image called");
            const response = await uploadImage();
            url = response.data.url;
            console.log(url);
        }
        if (url) {
            formValue.userImage = url;
        }
        console.log(formValue);
        dispatch(postBusinessProfile(formValue)).unwrap()
            .then(() => {
                setSuccessful(true);
                navigate("/business");
            }).catch(() => {
                setSuccessful(false);
            });
    }

    const handleChange = (e) => {
        const selection = e.target.value;

        setAlert("");
        if (trainerProfile.length > 0 && selection === "trainer") {
            setAlert("Trainer profile already exists");
        } else if (dieticianProfile.length > 0 && selection === "dietician") {
            setAlert("Dietician profile already exists");
        }
        setOption(e.target.value);
        console.log(e.target.value);
    }
    const handleNext = (e) => {
        e.preventDefault();
        if (alert === "") {
            setBusinessType(option);
        }

    }

    return (
        <div className="profile-form">
            <h1>Create your business profile</h1>
            {businessType === "" ?
                (<>
                    <form onChange={handleChange} onSubmit={handleNext}>
                        <p>Please select your business type:</p>
                        <input type="radio" id="gym" name="business" value="gym" />
                        <label htmlFor="gym">Gym</label>
                        <input type="radio" id="trainer" name="business" value="trainer" />
                        <label htmlFor="trainer">Trainer</label>
                        <input type="radio" id="dietician" name="business" value="dietician" />
                        <label htmlFor="dietician">Dietician</label>
                        <button type="submit">Next</button>
                    </form>
                    {alert && (
                        <div className="form-group">
                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {alert}
                            </div>
                        </div>
                    )}
                </>
                ) :
                (<div>
                    <div>
                        <Avatar
                            alt="Avatar"
                            style={{ width: "200px", height: "200px" }}
                        />
                        <div>
                            <input
                                // ref={inputFileRef}
                                accept="image/*"
                                id="avatar-image-upload"
                                type="file"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                        <Form>
                            <div className="form-group">
                                <label htmlFor="name"><h3>Name:</h3></label>
                                <Field name="name" type="text" className="form-control" />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="about"><h3>About:</h3></label>
                                <Field name="about" type="text" className="form-control" />
                                <ErrorMessage
                                    name="about"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            {businessType === "gym" &&
                                (<div className="form-group">
                                    <label htmlFor="address"><h3>Address:</h3></label>
                                    <Field name="address" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="address"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>)}

                            <div className="form-group">
                                <label htmlFor="contact"><h3>Contact Number:</h3></label>
                                <Field name="contact" type="text" className="form-control" />
                                <ErrorMessage
                                    name="contact"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>


                            {businessType === "dietician" ?
                                (<div className="form-group">
                                    <div><h3>Specializations:</h3></div>
                                    <label>
                                        <Field type="checkbox" name="activities" value="vegan" />
                                        Vegan
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="activities" value="vegetarian" />
                                        Vegetarian
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="activities" value="non-vegetarian" />
                                        Non-Vegetarian
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="activities" value="keto" />
                                        Keto
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="activities" value="paleo" />
                                        Paleo
                                    </label>
                                    <ErrorMessage
                                        name="activities"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>) :
                                (<div className="form-group">
                                    <div><h3>Activities:</h3></div>
                                    <label>
                                        <Field type="checkbox" name="activities" value="Gym" />
                                        Gym
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="activities" value="HIIT" />
                                        HIIT
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="activities" value="CrossFit" />
                                        CrossFit
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="activities" value="Zumba" />
                                        Zumba
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="activities" value="Yoga" />
                                        Yoga
                                    </label>
                                    <ErrorMessage
                                        name="activities"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>)}

                            {businessType === "gym" &&
                                (<div className="form-group">
                                    <div><h3>Open Time:</h3></div>
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
                                </div>)}

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
                </div>)
            }
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

export default FormBusiness;