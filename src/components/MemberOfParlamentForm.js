import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSSFolder/memberofparliament.css';

const MemberOfParliament = () => {
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      studentId,
      role: 'MemberOfParliament', // Set role directly to "MemberOfParliament"
    };

    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/admin/accounts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Show success toast
        toast.success('Account successfully created!');
        // Reset form fields
        setStudentId('');
      } else {
        // Show error toast
        toast.error('Student already exists');
        throw new Error('Error creating account');
      }
    } catch (err) {
      // Show error toast
      toast.error('Error creating account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h2 className="form-title">Add Member of Parliament</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Registration ID:</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          className="form-input"
        />

        <button type="submit" disabled={loading} className="form-button">
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default MemberOfParliament;
