import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import logo from '../images/voteLogo.jpg';
import '../CSSFolder/Header.css'; // Import your CSS file for custom styles

function Header() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role'); // Get the user role from local storage
    const [notifications, setNotifications] = useState([]); // State to hold notifications
    const [showNotifications, setShowNotifications] = useState(false); // State to control notification visibility

    // Function to handle user logout
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('studentId');
        localStorage.removeItem('role');

        toast.success("Logged out successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "light",
        });

        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    // Function to fetch notifications based on user role
    const fetchNotifications = async () => {
        try {
            console.log("Role being sent:", role);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/notices/role/${role}`);
            console.log("Full response from server:", response);
            setNotifications(response.data); // Update notifications state
            console.log("Notifications received:", response.data);

            if (response.data.length === 0) {
                toast.info("No new notifications", { position: "top-right" });
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
            toast.error("Failed to load notifications");
        }
    };

    // Fetch notifications when the component mounts
    useEffect(() => {
        if (role) {
            fetchNotifications();
        }
    }, [role]);

    // Function to toggle notification visibility
    const handleNotificationToggle = () => {
        setShowNotifications((prevShow) => !prevShow);
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={logo}
                        width="100"
                        height="80"
                        className="d-inline-block align-top"
                        alt="Online Election System Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                                <Nav.Link as={Link} to="/help">Help</Nav.Link>


                        {role === 'ROLE_ADMIN' && (
                            <>
                                <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/candidateDashboard">View Candidates</Nav.Link>
                            </>
                        )}
                        {role === 'ROLE_VOTER' && (
                            <>
                              <Nav.Link as={Link} to="/viewResult">view result</Nav.Link>

                            </>
                        )}
                        {role === 'ROLE_MEMBEROFPARLIAMENT' && (
                            <>
                                <Nav.Link as={Link} to="/apply">Apply</Nav.Link>
                                <Nav.Link as={Link} to="/viewResult">view result</Nav.Link>

                            </>
                        )}
                        {role === 'ROLE_ELECTIONCOMMITTEE' && (
                            <>
                                <NavDropdown title="Manage Notices" id="manage-notices-dropdown">
                                    <NavDropdown.Item as={Link} to="/post-notice">Post Notice</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/delete-notice">Delete Notice</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/update-notice">Update Notice</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/candidateDashboard">View Candidates</Nav.Link>
                                <Nav.Link as={Link} to="/announceResult">Announce Result</Nav.Link>
                            </>
                        )}
                    </Nav>

                   

                    <Nav className="ms-3">
                        {role && (
                            <>
                                <Button 
                                    variant="outline-info" 
                                    className="me-2" 
                                    onClick={handleNotificationToggle}
                                >
                                    Notifications ({notifications.length})
                                </Button>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        )}
                        {!role && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

          {/* Notifications Banner */}
{showNotifications && notifications.length > 0 && (
    <div className="notifications-banner" style={{ marginTop: '80px', zIndex: 1000 }}>
        <div className="notifications-content">
            <h5>Notifications</h5>
            {notifications.map((notification, index) => (
                <div key={index} className="notification-item">
                    {notification} {/* Directly render the notification string */}
                    {/* You can also add a link or button for redirection if needed */}
                </div>
            ))}
            <Button variant="outline-danger" onClick={handleNotificationToggle} className="dismiss-button">
                Dismiss
            </Button>
        </div>
    </div>
)}


            <ToastContainer />
        </>
    );
}

export default Header;
