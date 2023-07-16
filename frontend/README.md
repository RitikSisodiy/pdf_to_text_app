
# PDF-to-Text Converter

This web application allows users to upload PDF files and extract text from them. The extracted text can be viewed and copied to the clipboard.

## Features

- Upload PDF files for text extraction
- Extract text from individual pages of a PDF
- Extract text from all pages of a PDF
- Copy extracted text to the clipboard

## Technologies Used

- React.js for the frontend
- Node.js and Express.js for the backend
- [PDF-to-Text API](http://127.0.0.1:5000) for text extraction
- Bootstrap for styling

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/ritiksisodiy/pdf-to-text-converter.git
   ``` 

2.  Navigate to the project directory:
    
    
    ```
    cd pdf-to-text-converter
    ``` 
    
3.  Install the dependencies for the frontend:
    
    ```
    npm install
    ``` 
    
    
5.  Start the frontend and backend servers concurrently:
    
    ```
    npm run dev
    ``` 
    
6.  Open your web browser and visit `http://localhost:3000` to access the application.
    

## API Documentation

The backend server provides the following API endpoints:

### Upload File

-   URL: `http://127.0.0.1:5000/upload_file`
-   Method: `POST`
-   Description: Uploads a PDF file for text extraction.
-   Request Body:
    -   Type: `form-data`
    -   Parameters:
        -   `file`: PDF file to upload

### Extract Text

-   URL: `http://127.0.0.1:5000/extract_text`
-   Method: `GET`
-   Description: Retrieves the text for a specific page of a PDF file.
-   Query Parameters:
    -   `pdf_id`: ID of the PDF file
    -   `page`: Page number to extract text from

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
