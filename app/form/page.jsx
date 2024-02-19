"use client"
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Page = () => {
  const [file, setFile] = useState();
  const [birthdate, setBirthdate] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    const data = new FormData();
    data.set("file", file);
    data.set("birthdate", birthdate); // Adding birthdate to FormData
    const result = await fetch("http://localhost:3000/api/address/", {
      method: "POST",
      body: data
    });
    console.log(result);
  }

  return (
    <>
      <main className="container mt-5">
        <h1>Upload Image</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">Choose Image</label>
            <input
              type='file'
              id='fileInput'
              className="form-control"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="birthdateInput" className="form-label">Birthdate</label>
            <input
              type='date'
              id='birthdateInput'
              className="form-control"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheckbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
            />
            <label className="form-check-label" htmlFor="termsCheckbox">I agree to the terms and conditions</label>
          </div>
          <button type='submit' className="btn btn-primary" disabled={!agreeTerms}>Upload Image</button>
        </form>
      </main>
    </>
  );
}

export default Page;
