import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import FileUploader from './component/file/FileUploader';
import Navbar from './component/file/Navbar';
import Footer from './component/file/Footer';
import About from './pages/About';
const App = () => {
  return (
     <div>
      <Navbar />

      <div className="container mt-5">
        <Routes>
          <Route exact path="/" element={<FileUploader />} />
          <Route exact path="/about" element={<About/>} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
