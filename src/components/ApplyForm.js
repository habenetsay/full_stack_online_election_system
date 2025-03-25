import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import '../CSSFolder/ApplyForm.css';
import { useNavigate } from 'react-router-dom';

const ApplyForm = () => {
  const studentId = useSelector((state) => state.user.studentId); // Get studentId from Redux state
  const [candidatePhoto, setCandidatePhoto] = useState(null);
  const [experience, setExperience] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match('image.*')) {
      setCandidatePhoto(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    } else {
      setError('Only image files are allowed');
    }
  };

  const handleExperienceChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setExperience(file);
      setError(null);
    } else {
      setError('Only PDF files are allowed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('studentId', studentId); // Use studentId from state
    formData.append('candidatePhoto', candidatePhoto);
    formData.append('experience', experience);

    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/campaign/apply', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        setCandidatePhoto(null);
        setExperience(null);
        setPhotoPreview(null);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Error submitting application');
      }
    } catch (err) {
      setError(err.message || "Error in submission");
      console.log("Submission error");
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <div className="apply-form-container">
        <h2 className="form-title">Apply to Be a Candidate</h2>
        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-group">
            <label className="file-input-label">
              Candidate Photo <span className="required">*</span>
              <input 
                type="file" 
                onChange={handleFileChange} 
                accept="image/*" 
                required 
              />
              {photoPreview && <img src={photoPreview} alt="Candidate" className="photo-preview" />}
            </label>
          </div>

          <div className="form-group">
            <label className="file-input-label">
              Experience (PDF only) <span className="required">*</span>
              <input 
                type="file" 
                onChange={handleExperienceChange} 
                accept=".pdf" 
                required 
              />
            </label>
          </div>

          <button type="submit" className="submit-button">Submit Application</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default ApplyForm;
