import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSSFolder/login.css';

function ChangePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if studentId exists in local storage
        const studentId = localStorage.getItem('studentId');
        if (!studentId) {
            toast.error('No student ID found. Please log in again.');
            navigate('/login');
        }
    }, [navigate]);

    const handlePasswordChangeSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        const studentId = localStorage.getItem('studentId'); // Retrieve studentId from local storage
        const passwordChangeData = { studentId, password };

        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/admin/accounts/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(passwordChangeData),
            });

            if (response.ok) {
                navigate('/member-of-parliament');
                toast.success('Password changed successfully!');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Error changing password.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Error changing password');
        }
    };

    return (
        <div className="login-container">
            <ToastContainer />
            <div className="login-card">
                <h1>Change Password</h1>
                <form onSubmit={handlePasswordChangeSubmit}>
                    <div className="input-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">Submit New Password</button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
