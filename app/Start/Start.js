"use client"
import React from 'react';
import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css';


const Start = () => {
  const router =useRouter();
  const handleRegisterroute=()=>{
    console.log("register click")
    router.push("/register")
  }
  return (
    <div className=' d-flex justify-content-center align-items-center border p-5 border-primary ' style={{height:"100vh"}}>
      <div className='d-flex gap-3 '>
        <button type="button" onClick={()=>router.push("/login")} className="btn btn-primary ">Login</button>
        <button type="button" onClick={handleRegisterroute}   className="btn btn-primary">Register</button>

      </div>
    </div>
  );
}

export default Start;
