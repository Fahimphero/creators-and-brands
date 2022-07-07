import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import HeaderBrand from '../Header/HeaderBrand';

const Brand = () => {
    const [email, setEmail] = ('')
    const [user] = useAuthState(auth);

    var emailId = user.email;
    // setEmail(user.email)
    const navigate = useNavigate()
    const [creatorsData, setCreatorsData] = useState([]);
    useEffect(() => {

        fetch('https://lit-reaches-92387.herokuapp.com/creators')
            .then(res => res.json())
            .then(data => setCreatorsData(data))

    }, [])

    const handleUpload = (event) => {
        event.preventDefault();
        const name = event.target.filename.value;
        const currentUser = { url: name };
        console.log(currentUser)

        fetch(`https://lit-reaches-92387.herokuapp.com/brand/ad/${emailId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Ad uploaded successfully')
            })



    }

    return (
        <div >
            <HeaderBrand></HeaderBrand>
            <h2 className='text-center my-5'>Creator Profiles</h2>
            <div className='container'>

                <form className='mb-3 ' onSubmit={handleUpload}>
                    <input className='ps-2' type="text" placeholder='video-url' name="filename"></input>
                    <input className='ms-2' type="submit" value='Publish Ad'></input>
                </form>

                {
                    creatorsData.map(user =>
                        <div key={user._id} className="card">
                            <div className="card-body">
                                <p>Name: {(user?.user === null) ? 'Unknown' : user?.user}</p>
                                <p>Email: {user?.email}</p>
                                <button className='btn btn-info'>Hire</button>
                            </div>
                        </div>

                    )
                }
            </div>
        </div>
    );
};

export default Brand;