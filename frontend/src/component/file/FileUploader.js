import React, { useState } from 'react';
import { uploadFile } from '../../api/pdf_to_text/Api';
import TextExtractor from './TextExtractor';
import { ProgressBar } from 'react-bootstrap';
const FileUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const [pdfInfo, setPdfInfo] = useState({
        "pdfId": "",
        "total_pages": ""
    });
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async () => {
        setIsUploading(true)
        try {
            const res = await uploadFile(selectedFile, setProgress);
            setPdfInfo(() => {
                return {
                    "pdfId": res.pdf_id,
                    "total_pages": res.total_pages
                }
            });
        } catch (error) {
            console.error(error);
        }
        setIsUploading(false)
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-3 mt-5">
                        {isUploading && (<div className='mb-1'>
                            <ProgressBar animated now={progress} label={`${progress}%`} />
                        </div>)}
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" onChange={handleFileChange} />
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleFileUpload}
                                disabled={!selectedFile || isUploading}
                            >
                                Upload

                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <TextExtractor pdfInfo={pdfInfo} />
        </>
    );
};

export default FileUploader;
