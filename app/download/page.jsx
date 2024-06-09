"use client"
import React, { useState } from 'react';
import axios from 'axios';

const Page = () => {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

    const downloadPdf = () => {
        const url = "http://localhost:3000/22.pdf";
        const fileName = url.split('/').pop(); // Move inside the function

        setLoader(true);
        setError('');
        axios.get(url, { responseType: 'blob' })
            .then((response) => {
                setLoader(false);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                setLoader(false);
                setError(error.message);
            });
    };

    return (
        <>
            <h1>Download PDF File From API</h1>
            <button onClick={downloadPdf}>
                {loader ? 'Downloading...' : 'Download'}
            </button>
            {error && <div>Error: {error}</div>}
        </>
    );
};

export default Page;
