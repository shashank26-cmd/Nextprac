"use client"
import React from 'react';

const Page = () => {
  const PDF_FILE = "http://localhost:3000/22.pdf";

  const downloadFile = (url) => {
    const fileName = url.split('/').pop();
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.setAttribute('download', fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }

  return (
    <div>
      <button onClick={() => { downloadFile(PDF_FILE) }}>Download File</button>
    </div>
  );
}

export default Page;
