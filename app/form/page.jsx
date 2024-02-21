"use client";
import React, { useState,useEffect } from 'react';

const Page = () => {
  const [file, setFile] = useState(null);
  const [birthdate, setBirthdate] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    if (!file) {
      alert("Please select a file.");
      return;
    }
    const data = new FormData();
    data.append("file", file);
    data.append("DOB", birthdate);
    const result = await fetch("http://localhost:3000/backend/api/address/", {
      method: "POST",
      body: data
    });
    console.log(result);
  };
  
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);


  const handleCloseModal = () => {
    setAgreeTerms(true); // Update state to indicate agreement
  };

  return (
    <>
      <main className="container mt-5">
        <h1>Upload Image</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">Choose Image</label>
            <input
              type="file"
              name="upload"
              accept="application/pdf"
              id="fileInput"
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
              readOnly
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            />
            <label className="form-check-label" htmlFor="termsCheckbox">
              I agree to the terms and conditions
            </label>
          </div>

          <button type='submit' className="btn btn-primary" disabled={!agreeTerms}>
            Upload Image
          </button>

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  ...
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary "data-bs-dismiss="modal" aria-label="Close " onClick={handleCloseModal}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default Page;
