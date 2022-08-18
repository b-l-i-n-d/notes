/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    const { error } = useSelector((state) => state.auth);

    if (error) {
        if (error?.name) {
            toast.error(error.name, {
                className: 'bg-base-200 text-base-content shadow-xl shadow-error/30',
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                closeButton: null,
            });
        }
        if (error?.email) {
            toast.error(error.email, {
                className: 'bg-base-200 text-base-content shadow-xl shadow-error/30',
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                closeButton: null,
            });
        }
        if (error?.password) {
            toast.error(error.password, {
                className: 'bg-base-200 text-base-content shadow-xl shadow-error/30',
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                closeButton: null,
            });
        }
    }

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
                        {/* <GoogleLogin
                            buttonText="Sign in with Google"
                            render={() => (
                                <button type="button" className="btn gap-2">
                                    <FcGoogle />
                                    Sign up with Google
                                </button>
                            )}
                        /> */}

                        <div className="relative flex items-center">
                            <div className="divider flex-grow" />
                            <span className="mx-4 flex-shrink text-gray-400">
                                Sign up with email
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
                                    pattern="^[a-zA-Z0-9]{3,}"
                                    className="input input-bordered"
                                    onChange={handleChange}
                                    required
                                    onInvalid={(event) =>
                                        event.target.setCustomValidity(
                                            'Must be at least 3 chars long'
                                        )
                                    }
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
                                    className="input input-bordered"
                                    onChange={handleChange}
                                    required
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
                                        className="input input-bordered w-full"
                                        id="password"
                                        name="password"
                                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$"
                                        placeholder="Min. 6 chars long"
                                        type={passwordShown ? 'text' : 'password'}
                                        autoComplete="off"
                                        onChange={handleChange}
                                        onInvalid={(event) =>
                                            event.target.setCustomValidity(
                                                'Password should be combination of one uppercase , one lower case, one special char.'
                                            )
                                        }
                                        required
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
                                        <span className="link link-primary font-bold">Log in</span>
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
