"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const Page = () => {
    const router=useRouter();
    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails( {
            ...details,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/backend/api/user/", details);
            console.log("Response data: ", response.data);
    
            if (response.data.success) {
                setDetails({
                    name: "",
                    email: "",
                    password: "",
                });
                router.push('/profile');
            } else {
                console.error("Unsuccessful response: ", response.data);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div className='border border-primary' style={{ height: "300px", width: '300px' }}>
                <form className='d-flex flex-column my-3 p-2' onSubmit={handleSubmit}>
                    <label htmlFor="name" className='mb-2'>Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={details.name}
                        className='mb-2'
                        placeholder='Your Name'
                        required
                    />
                    <label htmlFor="email" className='mb-2'>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        value={details.email}
                        className='mb-2'
                        placeholder='Your Email'
                        required
                    />
                    <label htmlFor="password" className='mb-2'>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={details.password}
                        className='mb-2'
                        placeholder='Your Password'
                        required
                    />
                    <button type="submit" className="btn btn-primary w-100 mt-2">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Page;
