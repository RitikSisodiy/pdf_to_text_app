import axios from 'axios';

  var BASE_URL = process.env.REACT_APP_API_BASE_URL;


/**
 * Uploads a PDF file for text extraction.
 *
 * @param {File} file - The PDF file to upload.
 * @returns {Promise<Object>} The API response containing the uploaded PDF ID.
 */
// Model for the upload file API response
const validateResponseData = (data, model) => {
  for (const key in model) {
    if (!(key in data)) {
      throw new Error(`Response data does not match the expected model.`);
    }
    // Additional validation logic can be added here if needed
  }
};
const UploadFileResponseModel = {
  pdf_id: '',
};
const uploadFile = async (file, setProgress) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${BASE_URL}/upload_file`, formData, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setProgress(progress);
      }
    });
    validateResponseData(response.data, UploadFileResponseModel);
    // Example response: { pdf_id: "5181905964" }
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves the text for a specific page of a PDF file.
 *
 * @param {string} pdfId - The ID of the PDF file.
 * @param {number} page - The page number to extract text from.
 * @returns {Promise<Object>} The API response containing the page number and extracted text.
 */
// Model for the extract text API response
const ExtractTextResponseModel = {
  page: '',
  text: '',
};
const extractText = async (pdfId, page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/extract_text?pdf_id=${pdfId}&page=${page}`
    );

    // Example response: { page: "1", text: "Lorem ipsum dolor sit amet." }
    // Validate the response data against the model
    validateResponseData(response.data, ExtractTextResponseModel);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export { uploadFile, extractText };
