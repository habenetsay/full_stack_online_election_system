import React, { useState } from 'react';
import '../CSSFolder/confirmation.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Confirmation = () => {
    const [studentId, setStudentId] = useState('');
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // New state
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

   const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const credentials = { 
        studentId, 
        email,
        fullName: '',   // Add dummy or optional data for fields not being used 
        role: '',       // Add if needed
        password: ''    // Add if needed 
    };


        try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login/check-credentials`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)  // Make sure to send all necessary data
        });

        if (response.ok) {
            setIsConfirmationVisible(true);
            toast.success('Credentials validated! Please enter the confirmation code.');
        } else {
            const errorMessage = await response.text();
            toast.error(errorMessage);
        }
    } catch (err) {
        console.error(err);
        toast.error('Error validating credentials');
    } finally {
        setLoading(false);
    }
};

    // Handle the submission of the confirmation code
    const handleConfirmationSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const confirmationData = { email, confirmationCode, studentId }; // Include studentId

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(confirmationData)
            });

            if (response.ok) {
                const data = await response.json(); // Get the response data
                toast.success('Account successfully verified!');
                // Show password fields
                setIsPasswordVisible(true);
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage || 'Error verifying account');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error verifying confirmation code');
        } finally {
            setLoading(false);
        }
    };

   const handleAccountCreation = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
        toast.error('Passwords do not match.');
        setLoading(false);
        return;
    }

    // Set the role to "voter"
    const accountData = { 
        studentId, 
        email, 
        password, 
        role: 'VOTER' // Set the role here
    }; 

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/accounts/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountData)
        });

        if (response.ok) {
            toast.success('Account created successfully!');
            // Redirect or perform any further actions here
        } else {
            const errorMessage = await response.text();
            toast.error(errorMessage || 'Error creating account');
        }
    } catch (err) {
        console.error(err);
        toast.error('Error creating account');
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="confirmation-container">
            {!isConfirmationVisible ? (
                <form onSubmit={handleInitialSubmit} className="confirmation-form">
                    <h2>Verify Account</h2>
                    <div className="input-group">
                        <label htmlFor="studentId">Student ID:</label>
                        <input
                            type="text"
                            id="studentId"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Validating...' : 'Validate Credentials'}
                    </button>
                </form>
            ) : !isPasswordVisible ? (
                <form onSubmit={handleConfirmationSubmit} className="confirmation-form">
                    <h2>Enter Confirmation Code</h2>
                    <div className="input-group">
                        <label htmlFor="confirmationCode">Confirmation Code:</label>
                        <input
                            type="text"
                            id="confirmationCode"
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Code'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleAccountCreation} className="confirmation-form">
                    <h2>Create Your Account</h2>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </form>
            )}
            <ToastContainer />
        </div>
    );
};

export default Confirmation;
