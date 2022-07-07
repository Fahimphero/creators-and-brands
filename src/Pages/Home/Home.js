import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const navigate = useNavigate()

    const handleBrandLogin = () => {
        navigate('/brand')
    }
    const handleCreatorLogin = () => {
        navigate('/creator')
    }

    return (
        <div style={{ height: '87vh' }} className='py-5 background' >
            <div className='container py-5 '>
                <div className='w-50 mx-auto'>
                    <h2 className='text-center pb-4'>Social commerce, collaborations {'&'} community growth</h2>
                    <h5 className='text-center pb-5'>for modern brands and influential creators</h5>
                    <div className='d-flex justify-content-around'>
                        <button onClick={handleBrandLogin} className='btn btn-info'>I'm a brand</button>

                        <button onClick={handleCreatorLogin} className='btn btn-primary'>I'm a creator</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;