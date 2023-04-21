import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import Header from "../login/header";
import ValidationMessage from "../login/error";
import { Button } from "@mui/material";
import * as EmailValidator from "email-validator";
import pic from "./loginPage.jpg";

const SignUp = () => {
    const [loading, setLoading] = useState(false);

    const { message } = useSelector((state) => state.message);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: ""
    });

    const hanldeChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        let nameError = errors.name;
        let emailError = errors.email;
        let passwordError = errors.password;
        const passwordRegex = /(?=.*[0-9])/;
        if (name === "name") {
            if (!value) {
                nameError = "This field is required.";
            } else if (value.length > 100) {
                nameError = "Character limit exceeded.";
            } else {
                nameError = "";
            }
        } else if (name === "email") {
            if (!value) {
                emailError = "This field is required.";
            } else if (!EmailValidator.validate(value)) {
                emailError = "Invalid email address.";
            } else {
                emailError = "";
            }
        } else if (name === "password") {
            if (!value) {
                passwordError = "This field is required";
            } else if (value.length < 8) {
                passwordError = "Password must be 8 characters long.";
            } else if (!passwordRegex.test(value)) {
                passwordError = "Invalid password. Must contain one number.";
            } else {
                passwordError = "";
            }
        }
        setErrors({ name: nameError, email: emailError, password: passwordError });
    }

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("handle login called");
        let formValue = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        if (Object.values(errors).every(el => el === "")) {
            setLoading(true);

            dispatch(register(formValue))
                .unwrap()
                .then(() => {
                    setLoading(false);
                    navigate("/login");
                })
                .catch(() => { setLoading(false) });
        }
    };

    return (
        <div className="flex flex-wrap w-full">
            <div className="flex flex-col w-full md:w-1/2">
                <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
                    <p className="text-3xl text-center">Welcome to HealthiVerse.</p>
                    <form onSubmit={handleRegister}
                        className="flex flex-col pt-3 md:pt-8">
                        <div className="flex flex-col pt-4">
                            <div className="flex relative ">
                                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </span>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Name"
                                    onChange={hanldeChange}
                                />
                            </div>
                            {errors.name &&
                                <div className="bg-red-600 dark:bg-gray-800">
                                    <div className="px-2 py-1 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                        <div className="flex flex-wrap items-center justify-between">
                                            <div className="flex items-center flex-1 w-0">
                                                <span className="flex p-2 bg-red-800 rounded-lg dark:bg-black">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="w-4 h-4 text-white" viewBox="0 0 1792 1792">
                                                        <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z">
                                                        </path>
                                                    </svg>
                                                </span>
                                                <p className="ml-3 text-sm text-white truncate">
                                                    <span className="hidden md:inline">
                                                        {errors.name}
                                                    </span>
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <div className="flex relative ">
                                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </span>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Email"
                                    onChange={hanldeChange}

                                />
                            </div>
                            {errors.email &&
                                <div className="bg-red-600 dark:bg-gray-800">
                                    <div className="px-2 py-1 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                        <div className="flex flex-wrap items-center justify-between">
                                            <div className="flex items-center flex-1 w-0">
                                                <span className="flex p-2 bg-red-800 rounded-lg dark:bg-black">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="w-4 h-4 text-white" viewBox="0 0 1792 1792">
                                                        <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z">
                                                        </path>
                                                    </svg>
                                                </span>
                                                <p className="ml-3 text-sm text-white truncate">
                                                    <span className="hidden md:inline">
                                                        {errors.email}
                                                    </span>
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>}

                        </div>

                        <div className="flex flex-col pt-4 mb-12">
                            <div className="flex relative ">
                                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                </span>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Password"
                                    onChange={hanldeChange}
                                />
                            </div>
                            {errors.password &&
                                <div className="bg-red-600 dark:bg-gray-800">
                                    <div className="px-2 py-1 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                        <div className="flex flex-wrap items-center justify-between">
                                            <div className="flex items-center flex-1 w-0">
                                                <span className="flex p-2 bg-red-800 rounded-lg dark:bg-black">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="w-4 h-4 text-white" viewBox="0 0 1792 1792">
                                                        <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z">
                                                        </path>
                                                    </svg>
                                                </span>
                                                <p className="ml-3 text-sm text-white truncate">
                                                    <span className="hidden md:inline">
                                                        {errors.password}
                                                    </span>
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>}
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2"
                        >
                            <span className="w-full">Sign Up</span>
                        </button>

                        {message &&
                            <div className="bg-red-600 dark:bg-gray-800 mt-4">
                                <div className="px-2 py-1 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div className="flex flex-wrap items-center justify-between">
                                        <div className="flex items-center flex-1 w-0">
                                            <span className="flex p-2 bg-red-800 rounded-lg dark:bg-black">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="w-4 h-4 text-white" viewBox="0 0 1792 1792">
                                                    <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z">
                                                    </path>
                                                </svg>
                                            </span>
                                            <p className="ml-3 text-sm text-white truncate">
                                                <span className="hidden md:inline">
                                                    {message}
                                                </span>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>}
                    </form>
                    <div className="pt-12 pb-12 text-center">
                        <p>
                            Already have an account?
                            <Link to="/login" className="font-semibold underline ml-2">
                                Login here.
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
            <div className="w-1/2 hidden md:block shadow-2xl">
                <img
                    className="object-cover w-full h-screen"
                    src={pic}
                />
            </div>
        </div>
    );

}

export default SignUp;