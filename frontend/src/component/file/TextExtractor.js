import React, { useState, useEffect } from 'react';
import { extractText } from '../../api/pdf_to_text/Api';
import { ProgressBar, Button } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const TextExtractor = ({ pdfInfo }) => {
    const [page, setPage] = useState(1);
    const [text, setText] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const handleTextExtraction = async (currentPage, loading = true) => {
        if (currentPage === 0 || pdfInfo.pdfId === "") {
            return
        }
        if (loading) { setIsLoading(true) };
        setCopied(false)
        try {
            const response = await extractText(pdfInfo.pdfId, currentPage);

            setText(response.text);
            setError(null);
            if (loading) (setIsLoading(false));
            return response.text
        } catch (error) {
            setError('Failed to extract text. Please try again.');
        }
        if (loading) { setIsLoading(false) };
    };
    const handleExtractAll = async () => {
        setText(''); // Reset the text
        let extracted_text = ""
        setIsLoading(true);

        for (let page_i = 1; page_i <= pdfInfo.total_pages; page_i++) {
            extracted_text += await handleTextExtraction(page_i, false);
            setProgress((page_i / pdfInfo.total_pages) * 100);
        }
        setText(extracted_text);
        setIsLoading(false);
        setProgress(0)
    };
    useEffect(() => {
        handleTextExtraction(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pdfInfo]);

    const handleNextPage = () => {
        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            return nextPage; // Return the updated page value
        });
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => {
            const nextPage = Math.max(prevPage - 1, 1);
            return nextPage; // Return the updated page value
        });
    };
    const handleCopyText = () => {
        setCopied(true);
    };
    return (
        <div className="container">
            <div className="row">
                <div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {(
                        <div>
                            <div className="btn-group mb-3" role="group" aria-label="Page navigation">
                                <button className="btn btn-secondary" disabled={page <= 1} onClick={handlePreviousPage}>
                                    Previous Page
                                </button>
                                <span className="btn btn-light">{`Page ${page}`}</span>
                                <button className="btn btn-secondary" disabled={page === pdfInfo.total_pages} onClick={handleNextPage}>
                                    Next Page
                                </button>
                                {(
                                    <button className="btn btn-primary " onClick={handleExtractAll}>
                                        Extract All Page Text
                                    </button>
                                )}
                                <CopyToClipboard text={text} onCopy={handleCopyText}>
                                    <Button variant="secondary" disabled={text === ''}>
                                        {copied ? 'Copied!' : 'Copy Text'}
                                    </Button>
                                </CopyToClipboard>
                            </div>

                            {pdfInfo.pdfId !== "" ? (<div className="card">
                                <div className="card-header">
                                    <h2>Extracted Text: page-{page}</h2>
                                </div>
                                <div className="card-body">
                                    {isLoading ? (
                                        <div className="text-center">
                                            <h5>Loading...</h5>
                                            {progress > 0 && (<div>
                                                <ProgressBar animated now={progress} label={`${progress}%`} />
                                            </div>)}

                                        </div>
                                    ) : text}
                                </div>
                            </div>) :
                                <div class="alert alert-info" role="alert">
                                    Please upload a PDF file.
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TextExtractor;