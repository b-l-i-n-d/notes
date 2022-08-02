/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../actions/auth';
import SignUpImage from '../assets/images/undraw_taking_notes_re_bnaf.svg';
import Theme from './Theme';

function SignUp() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [signUpFormData, setSignUpFormData] = useState({ name: '', email: '', password: '' });

    const tooglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signup(signUpFormData, navigate));
    };

    const handleChange = (e) => {
        setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content mx-4 flex-col rounded-3xl bg-base-100 shadow-xl shadow-primary/20 md:flex-row-reverse">
                <div className="hidden md:block md:w-1/2">
                    <img src={SignUpImage} alt="LoginImage" />
                </div>
                <div className="p-2 sm:px-8 md:w-1/2 md:px-10">
                    <div className="text-4xl font-bold">Signup</div>
                    <div className="mt-2">Take notes. You need it, right?</div>

                    <div className="mt-8 flex w-full flex-col">
                        <GoogleLogin
                            buttonText="Sign in with Google"
                            render={() => (
                                <button type="button" className="btn gap-2">
                                    <FcGoogle />
                                    Sign up with Google
                                </button>
                            )}
                        />

                        <div className="relative flex items-center">
                            <div className="divider flex-grow" />
                            <span className="mx-4 flex-shrink text-gray-400">
                                or Sign up with email
                            </span>
                            <div className="divider flex-grow" />
                        </div>

                        <form action="get" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="input-bordered input"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="mail@website.com"
                                    className="input-bordered input"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                        <button
                                            type="button"
                                            className="cursor-pointer px-2 py-1"
                                            htmlFor="password"
                                            onClick={tooglePassword}
                                        >
                                            {passwordShown ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <input
                                        className="input-bordered input w-full"
                                        id="password"
                                        name="password"
                                        placeholder="Min. 8 characters"
                                        type={passwordShown ? 'text' : 'password'}
                                        autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Signup
                                </button>
                            </div>

                            <div className="mt-4">
                                <span className="text-sm">
                                    Already have an account?{' '}
                                    <Link to="/login">
                                        <span className="link-primary link font-bold">Log in</span>
                                    </Link>
                                </span>
                            </div>
                        </form>
                        <div className="px-20">
                            <Theme />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
