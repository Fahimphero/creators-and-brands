import React, { useEffect, useState } from 'react';

const useToken2 = (user) => {
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    useEffect(() => {
        console.log(user);
        const email = user?.user?.email;
        const name = user?.user?.displayName;

        const currentUser = { email: email, user: name, role: 'brand' };
        console.log(currentUser)
        if (email) {
            fetch(`http://localhost:5000/brand/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('data inside useToken', data);

                    const accessToken = data.token;
                    const role = data.role;
                    console.log(role)
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('role', role);
                    setToken(accessToken);
                    setRole(role);
                })
        }

    }, [user]);
    return [token, setToken];
}

export default useToken2;