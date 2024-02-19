"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // corrected import
import Cookies from "js-cookie";

const Page = () => {
  const router = useRouter();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login request with data:", details); // Log the data being sent
      const data = await axios.post("http://localhost:3000/api/login/",
        details
      );
console.log(data);


      if (data.status == 200 ) {
        setDetails({
          email: "",
          password: "",
        });
        router.push("/form")
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="border border-primary"
        style={{ height: "300px", width: "300px" }}
      >
        <form onSubmit={handleSubmit} className="d-flex flex-column my-3 p-2">
          {" "}
          {/* Changed onClick to onSubmit */}
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            value={details.email}
            className="mb-2"
            placeholder="Your email"
          />
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="mb-2"
            id="password"
            onChange={handleChange}
            value={details.password}
            placeholder="Your Password"
          />
          <button type="submit" className="btn btn-primary w-100 mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
