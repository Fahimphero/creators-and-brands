import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactPlayer from 'react-player/lazy';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Header from '../Header/Header';

const Creator = () => {
    const [email, setEmail] = ('')
    const [user] = useAuthState(auth);

    var emailId = user.email;
    // setEmail(user.email)
    const navigate = useNavigate()
    const [brandsData, setBrandsData] = useState([]);
    useEffect(() => {

        fetch('https://powerful-thicket-50600.herokuapp.com/brands')
            .then(res => res.json())
            .then(data => setBrandsData(data))

    }, [])
    return (
        <div>
            <Header></Header>
            <h2 className='text-center my-5'>Brands</h2>
            <div className='container'>


                {
                    brandsData.map(user =>
                        <div key={user._id} className='card'>


                            <div className='d-flex '>
                                <div className="card-body">
                                    <p>Name: {(user?.user === null) ? 'Unknown' : user?.user}</p>
                                    <p>Email: {user?.email}</p>
                                    <button className='btn btn-info'>Apply</button>

                                </div>

                                <div className='card-body '>
                                    <ReactPlayer url={user?.url} />

                                </div>
                            </div>
                        </div>
                        // <div key={user._id} className="card">

                        // </div>

                    )
                }
            </div>
        </div>
    );
};

export default Creator;