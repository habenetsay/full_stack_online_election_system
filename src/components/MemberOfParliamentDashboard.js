import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Header from './Header'; // Adjust the path as necessary
import { Link, useNavigate } from 'react-router-dom';
import Notifications from './Notifications'; // Import Notifications component

const MemberOfParliamentDashboard = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]); // State to manage notifications
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    // Check if user is logged in by checking for the JWT token
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            // If token does not exist, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    // Function to add a notification
    const addNotification = (message) => {
        setNotifications((prev) => [...prev, { message, timestamp: new Date() }]);
    };

    // Function to handle modal visibility
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <>
            <Header 
                notifications={notifications} 
                addNotification={addNotification} 
            />

            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1>Member of Parliament Dashboard</h1>
                       
                    </Col>
                </Row>
            </Container>

            {/* Notification area on the right */}
            <div style={{
                position: 'fixed',
                top: '100px', // Adjust this based on your header height
                right: '20px', // Adjust spacing from the right
                width: '300px',
                backgroundColor: '#f8f9fa', // Light background for contrast
                border: '1px solid #dee2e6', // Light border
                borderRadius: '5px',
                padding: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Shadow for depth
                zIndex: '9999', // Ensure it's above other content
                maxHeight: '70%', // Limit the height to prevent overflow
                overflowY: 'auto', // Allow scrolling if too many notifications
            }}>
                <h5>Notifications</h5>
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div key={index} className="mb-2">
                            <strong>{notification.timestamp.toLocaleString()}:</strong> {notification.message}
                        </div>
                    ))
                ) : (
                    <p>new notifications</p>
                )}
            </div>
        </>
    );
};

export default MemberOfParliamentDashboard;
