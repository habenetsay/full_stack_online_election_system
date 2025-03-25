import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function CommitteeRegistrationForm({ status, onStatusChange }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [yearOfStudy, setYearOfStudy] = useState('');
    const [studentId, setStudentId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [committeeDescription, setCommitteeDescription] = useState('');
    const [email, setEmail] = useState(''); // New state for email

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'yearOfStudy':
                setYearOfStudy(value);
                break;
            case 'studentId':
                setStudentId(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'committeeDescription':
                setCommitteeDescription(value);
                break;
            case 'email': // Handle email input change
                setEmail(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validation for empty fields
        if (!firstName || !lastName || !phoneNumber || !email || !committeeDescription || (status === 'inProgress' && (!yearOfStudy || !studentId))) {
            toast.error("Please fill out all required fields.", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        // Create a FormData object to handle the submission
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('yearOfStudy', yearOfStudy);
        formData.append('studentId', studentId);
        formData.append('phoneNumber', phoneNumber);
        formData.append('committeeDescription', committeeDescription);
        formData.append('email', email); // Append email to form data

        try {
            // Send POST request to the server
            await axios.post('${process.env.REACT_APP_API_URL}/electioncom/nominees', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Registration successful!", {
                position: "top-center",
                autoClose: 3000,
            });
            // Reset form fields
            setFirstName('');
            setLastName('');
            setYearOfStudy('');
            setStudentId('');
            setPhoneNumber('');
            setCommitteeDescription('');
            setEmail(''); // Reset email field
        } catch (error) {
            toast.error("Registration failed: " + error.message, {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    return (
        <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ textAlign: 'center' }}>Registration Form for Committee</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label><br />
                <input type="text" id="firstName" name="firstName" value={firstName} onChange={handleInputChange} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }} /><br />
                <label htmlFor="lastName">Last Name:</label><br />
                <input type="text" id="lastName" name="lastName" value={lastName} onChange={handleInputChange} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }} /><br />
                <label htmlFor="phoneNumber">Phone Number:</label><br />
                <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={handleInputChange} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }} /><br />
                
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" value={email} onChange={handleInputChange} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }} /><br />

                <label htmlFor="status">Status:</label><br />
                <select id="status" name="status" value={status} onChange={onStatusChange} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}>
                    <option value="graduated">Graduated</option>
                    <option value="inProgress">In Progress</option>
                </select><br />
                
                {status === 'inProgress' && <>
                    <label htmlFor="yearOfStudy">Year of Study:</label><br />
                    <input type="text" id="yearOfStudy" name="yearOfStudy" value={yearOfStudy} onChange={handleInputChange} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }} /><br />
                    <label htmlFor="studentId">Student ID:</label><br />
                    <input type="text" id="studentId" name="studentId" value={studentId} onChange={handleInputChange} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }} /><br />
                </>}
                
                <label htmlFor="committeeDescription">Description:</label><br />
                <textarea id="committeeDescription" name="committeeDescription" value={committeeDescription} onChange={handleInputChange} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}></textarea><br />

                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Post</button>
            </form>
            <ToastContainer />
        </div>
    );
}
