import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from './userActions';
import 'react-toastify/dist/ReactToastify.css';
import '../CSSFolder/login.css';
import { Spinner } from 'react-bootstrap';

function Login() {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const saveUserDataToLocalStorage = (studentId, role, token) => {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('studentId', studentId);
        localStorage.setItem('role', role);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form from reloading the page
        setError(null); // Clear any previous errors
        setLoading(true); // Show loading indicator
    
        // Validate input before sending the request
        if (!studentId || !password) {
            setError("Both student ID and password are required.");
            toast.error("Both student ID and password are required.");
            setLoading(false);
            return;
        }
    
        // Prepare the login data object
        const loginData = { studentId, password };
    
        try {
            // Send POST request to the backend
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login/checking`, {
                method: 'POST', // Use POST method
                headers: {
                    'Content-Type': 'application/json', // Ensure the correct content type is set
                },
                body: JSON.stringify(loginData), // Send the login data as a JSON string
            });
    
            // If the response is not OK (status is not in the 200 range)
            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error Data from backend:", errorData); // Log error data for debugging
                throw new Error(errorData.error || 'Incorrect username or password');
            }
    
            // If response is OK, parse the response data
            const data = await response.json();
            const { role, token } = data;
    
            // Save user data to localStorage and Redux (for state management)
            saveUserDataToLocalStorage(studentId, role, token);
            dispatch(setUser({ studentId, role, token }));
    
            let location;
            // Redirect based on user role
            if (role === 'ROLE_MEMBEROFPARLIAMENT') {
                const passwordChangedResponse = await fetch(
                    `${process.env.REACT_APP_API_URL}/admin/accounts/check-password-changed?studentId=${studentId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }, // Send token in Authorization header
                    }
                );
    
                if (!passwordChangedResponse.ok) {
                    throw new Error('Unable to check password status.');
                }
    
                const isPasswordChanged = await passwordChangedResponse.json();
                location = isPasswordChanged ? '/member-of-parliament' : '/change-password';
            } else {
                switch (role) {
                    case 'ROLE_ADMIN':
                        location = '/admin';
                        break;
                    case 'ROLE_VOTER':
                        location = '/voterDashboard';
                        break;
                    case 'ROLE_ELECTIONCOMMITTEE':
                        location = '/election_committee';
                        break;
                    case 'ROLE_CANDIDATE':
                        location = '/candidateDashboard';
                        break;
                    default:
                        throw new Error('Unknown role.');
                }
            }
    
            // Navigate to the appropriate page based on the user role
            navigate(location);
    
        } catch (error) {
            // Handle errors from the login request
            setError(error.message); // Display error message to the user
            toast.error(error.message); // Display error in toast notification
        } finally {
            setLoading(false); // Stop loading spinner after the request is done
        }
    };
    

    return (
        <div className="login-container">
            <ToastContainer />
            <div className="login-card">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </form>
                <p className="register-link">
                    Don't have an account? <a href="/register">Register here</a>.
                </p>
            </div>
        </div>
    );
}

export default Login;
