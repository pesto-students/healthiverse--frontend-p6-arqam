import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editBusinessProfile } from "../../../slices/businessProfile";
import { getBusinessProfile } from "../../../slices/businessProfile";
import { useNavigate, useParams, Link, UNSAFE_useScrollRestoration } from "react-router-dom";
import { clearMessage } from "../../../slices/message";
import axios from "axios";
import { Avatar } from "@mui/material";
const user = JSON.parse(localStorage.getItem("user"));


const EditBusiness = () => {
    const { businessProfiles } = useSelector((state) => state.business);
    const { id } = useParams();
    const business = businessProfiles?.filter((business) => { return business._id === id })[0];
    // const [alert, setAlert] = useState("");
    // const [option, setOption] = useState("");
    const businessType = business ? business.businessType : "";
    const { message } = useSelector(state => state.message);
    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileUrl, setProfileUrl] = useState(business?.userImage ? business.userImage : "");
    const [profileImage, setProfileImage] = useState("");

    const handleProfileImage = (event) => {
        setProfileImage(event.target.files[0]);
    }
    const uploadProfileImage = () => {
        const data = new FormData()
        data.append("file", profileImage);
        data.append("upload_preset", "tadipaar");
        data.append("cloud_name", "dhkb0cyyy");
        return axios.post("https://api.cloudinary.com/v1_1/dhkb0cyyy/image/upload", data);
    }

    const [otherImagesUrls, setOtherImagesUrls] = useState(business?.otherImages ? business.otherImages : []);
    const [otherImages, setOtherImages] = useState([]);

    const handleOtherImages = (event) => {
        setOtherImages([...event.target.files]);
    }

    const uploadOtherImages = () => {
        const files = [...otherImages];
        const formData = new FormData();
        const requests = [];
        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i]);
            formData.append("upload_preset", "tadipaar");
            formData.append("api_key", "dhkb0cyyy");
            formData.append("timestamp", (Date.now() / 1000) || 0);

            requests.push(axios.post(
                "https://api.cloudinary.com/v1_1/dhkb0cyyy/image/upload",
                formData
            ));

        }
        return requests;
    };

    useEffect(() => {
        const fetchData = () => {
            dispatch(getBusinessProfile());
        };
        if (!businessProfiles) fetchData();
        dispatch(clearMessage())
    }, [dispatch]);

    const initialValues = {
        name: business ? business.name : "",
        about: business ? business.about : "",
        address: business ? business.address : "",
        contact: business ? business.contact : "",
        businessType: business ? business.businessType : "",
        activities: business ? business.activities : [],
        openTime: {
            from: business ? business.openTime.from : "",
            to: business ? business.openTime.to : "",
        },
        membership: {
            one: business ? business.membership.one : "",
            three: business ? business.membership.three : "",
            six: business ? business.membership.six : "",
            twelve: business ? business.membership.twelve : "",
        },
    };
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("This field is required"),
        about: Yup.string()
            .required("This field is required"),
        address: Yup.string(),
        contact: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("This field is required"),
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
        let addedImages = [];
        if (profileImage) {
            console.log("Upload image called");
            const response = await uploadProfileImage();
            setProfileUrl(response.data.url);
            formValue.userImage = response.data.url;
            console.log(profileUrl);
        }
        if (otherImages) {
            console.log("Upload other images called");
            const responses = await Promise.all(uploadOtherImages());
            addedImages = responses.map(response => response.data.url);
        }
        formValue.otherImages = otherImagesUrls.concat(addedImages);
        console.log(formValue);
        dispatch(editBusinessProfile({ ...formValue, id })).unwrap()
            .then(() => {
                setSuccessful(true);
                navigate(`/business/${id}`);
            }).catch(() => {
                setSuccessful(false);
            });
    }

    return (
        <div className="profile-form">
            <Link to={`/business/${id}`}>back</Link>
            <h1>Edit your business profile</h1>
            <div>
                <h3>Profile Image</h3>
                <Avatar
                    alt="Avatar"
                    src={profileUrl}
                    style={{ width: "200px", height: "200px" }}
                />
                <div>
                    <input
                        // ref={inputFileRef}
                        accept="image/*"
                        id="avatar-image-upload"
                        type="file"
                        onChange={handleProfileImage}
                    />
                    <button onClick={() => setProfileUrl("")}>Delete</button>
                </div>
            </div>
            <div>
                <h3>Other Images</h3>
                <input type="file" multiple onChange={handleOtherImages} />

                {otherImagesUrls?.map((url) => (
                    <div>
                        <img key={url} src={url} alt="uploaded" style={{ width: "200px", height: "200px" }} />
                        <button onClick={() => setOtherImagesUrls((prevState) => {
                            const state = [...prevState];
                            const index = state.indexOf(url);
                            if (index > -1) { // only splice array when item is found
                                state.splice(index, 1);
                                return state;
                            }
                        })}>Delete</button>
                    </div>
                ))}
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

export default EditBusiness;