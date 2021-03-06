/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../api';
import LogInImage from '../assets/images/undraw_taking_notes_re_bnaf.svg';
import Theme from './Theme';

function LogIn() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [logInFormData, setLogInFormData] = useState({ email: '', password: '' });

    const tooglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(logInFormData);
    };

    const handleChange = (e) => {
        setLogInFormData({ ...logInFormData, [e.target.name]: e.target.value });
    };

    const googleLogIn = useGoogleLogin({
        onSuccess: async (res) => {
            const result = (await api.googleUserInfo(res?.access_token)).data;

            try {
                dispatch({ type: 'LOGIN', data: { result } });
                navigate('/', { replace: true });
            } catch (error) {
                console.log(error);
            }
        },

        onError: (res) => {
            console.log('[Login Failed] res: ', res);
        },
    });

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content mx-4 flex-col rounded-3xl bg-base-100 shadow-xl shadow-primary/20 md:flex-row-reverse">
                <div className="hidden md:block md:w-1/2">
                    <img src={LogInImage} alt="LoginImage" />
                </div>
                <div className="p-2 sm:p-8 md:w-1/2 md:p-10">
                    <div className="text-4xl font-bold">Login</div>
                    <div className="mt-2">Take notes. You need it, right?</div>

                    <div className="mt-8 flex w-full flex-col">
                        <button type="button" className="btn gap-2" onClick={() => googleLogIn()}>
                            <FcGoogle />
                            Sign in with Google
                        </button>

                        <div className="relative flex items-center">
                            <div className="divider flex-grow" />
                            <span className="mx-4 flex-shrink text-gray-400">
                                or Sign in with email
                            </span>
                            <div className="divider flex-grow" />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
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
                                        type={passwordShown ? 'text' : 'password'}
                                        autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <label className="label">
                                    <a href="##" className="link-hover label-text-alt link">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>

                            <div className="mt-4">
                                <span className="text-sm">
                                    Not resistered yet?{' '}
                                    <Link to="/signup">
                                        <span className="link-primary link font-bold">
                                            Create Account
                                        </span>
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

export default LogIn;
