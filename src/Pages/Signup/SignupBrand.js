import { async } from '@firebase/util';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../firebase.init';
import useToken from '../Hooks/UseToken/UseToken';
import useToken2 from '../Hooks/UseToken/UseToken2';
import Loading from '../Loading/Loading';
import './Signup.css'


const SignUpBrand = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [customError, setCustomError] = useState('');
    const navigate = useNavigate()
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });


    const [token] = useToken2(user)

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate])


    if (loading || updating) {
        return <Loading></Loading>
    }




    const handleEmailSignUp = async (event) => {
        event.preventDefault();
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const displayName = event.target.userName.value;
        console.log(displayName)
        const confirmPassword = event.target.confirmPassword.value;
        // console.log(confirmPassword)
        setUserEmail(email);
        setUserPassword(password);
        setUserConfirmPassword(confirmPassword);
        if (confirmPassword === password) {
            await createUserWithEmailAndPassword(email, password);
            toast('Verification Email Sent')
            await updateProfile({ displayName: displayName });


        }
        else {
            setCustomError("Your two passwords didn't match");

        }

    }



    return (
        <div style={{ height: '100vh' }} className='background pb-5 pt-4'>
            <div className='container text-black'>
                {/* <p>This is login page</p> */}
                <h1 className='text-center text-danger pt-4'><FontAwesomeIcon style={{ color: 'royalblue' }} icon={faUserPlus}></FontAwesomeIcon></h1>
                <div className='signup-form mx-auto button  rounded-3 '>
                    <form onSubmit={handleEmailSignUp} className='p-4'>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label fs-5">Your Name</label>
                            <input type="text" name='userName' className="form-control" id="formGroupExampleInput" placeholder="name" required></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label fs-5">Email address</label>
                            <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='email' required></input>
                            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label fs-5">Password</label>
                            <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder='password' required></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleConfirmPassword1" className="form-label fs-5">Confirm Password</label>
                            <input type="password" name='confirmPassword' className="form-control" id="exampleConfirmPassword1" placeholder='confirm password' required></input>
                        </div>

                        <button type="submit" className="btn btn-dark mt-2 w-100 py-2 mb-3">SignUp</button>

                        {
                            customError ? <p><span className='fs-5 fw-bold'><u>Error</u>  </span> {customError}</p> : ''
                        }
                        {
                            !error || !updateError ?
                                <p></p>
                                :
                                <div>
                                    <p><span className='fs-5 fw-bold'><u>Error</u>  </span> {error?.message}</p>

                                </div>
                        }

                    </form>

                </div>
            </div>

        </div>
    );
};

export default SignUpBrand;