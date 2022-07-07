import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import auth from '../../firebase.init';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css'

import 'react-toastify/dist/ReactToastify.css';
import useToken from '../Hooks/UseToken/UseToken';
import useToken2 from '../Hooks/UseToken/UseToken2';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';


const LoginBrand = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, [])
    const navigate = useNavigate()
    const location = useLocation();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(
        auth
    );


    let from = location.state?.from?.pathname || "/";
    let Element;

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useToken2(user || user1)

    useEffect(() => {
        if (token) {
            navigate('/brand');
        }
    }, [token, navigate])

    const handleEmailLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setUserEmail(email);
        setUserPassword(password);
        signInWithEmailAndPassword(email, password);

    }

    if (loading || loading1) {
        // Element = <p className='text-dark'><span className='fs-5 fw-bold'>Loading... </span> </p>
        return <Loading></Loading>;
    }
    if (error || error1) {
        Element = <p className='text-dark'><span className='fs-5 fw-bold'>Error  </span> {error?.message} {error1?.message}</p>
    }
    const navigateToSignUp = () => {
        navigate('/signup');
    }
    const handleReset = async () => {
        if (userEmail) {
            await sendPasswordResetEmail(userEmail);
            toast('Sent email');
        }
        else {
            toast('Please enter your email address');
        }
    }


    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#"></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to="/">Home</Nav.Link>



                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ height: '100vh' }} className='background pb-5 pt-4'>
                <div className='container text-black' data-aos="flip-left">
                    {/* <p>This is login page</p> */}
                    <h1 className='text-center text-danger pt-4'><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></h1>
                    <div className='login-form mx-auto bg-danger  rounded-3 '>
                        <form onSubmit={handleEmailLogin} className='px-4 pt-4'>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fs-5">Email address</label>
                                <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='email' required></input>
                                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label fs-5">Password</label>
                                <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder='password' required></input>
                            </div>

                            <button type="submit" className="btn btn-dark mt-2 w-100 py-2">Log In</button>
                            <p className='text-center  mt-2'><button onClick={handleReset} className=' btn-danger text-dark border-0 p-0'><u>Forgotten Password?</u></button></p>
                            {/* {
                            !error ?
                                <p></p>
                                :
                                <div>
                                    <p><span className='fs-5 fw-bold'><u>Error</u>  </span> {error?.message}</p>

                                </div>
                        }
                        {
                            !googleError ?
                                <p></p>
                                :
                                <div>
                                    <p><span className='fs-5 fw-bold'><u>Error</u>  </span> {error?.message}</p>

                                </div>
                        } */}
                            {Element}

                        </form>
                        <div className='pb-4 px-4 pt-2'>
                            <button onClick={() => signInWithGoogle()} className="btn btn-dark mt-2 w-100 py-2">Sign In Using Google</button>
                            <hr />
                            <button onClick={navigateToSignUp} className="btn btn-info mt-2 w-100 py-2">Create a new account</button>
                        </div>

                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default LoginBrand;