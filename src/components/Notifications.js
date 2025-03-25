import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

function Notifications({ role }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch notifications based on the user's role from the backend
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/notices/role/${role}`);
                setNotifications(response.data);
  console.log(response.data);
                // Display a toast notification if there are new notifications
                if (response.data.length > 0) {
                    toast.info(`You have ${response.data.length} new notifications!`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
                toast.error("Failed to load notifications");
            }
        };

        fetchNotifications();
    }, [role]);

    // Handle read notification (if needed)
    const handleReadNotification = async (id) => {
        // Logic to mark the notification as read can go here
        // You may update the backend and remove or update the notification from the list
    };

    return (
        <div className="notifications">
            <h3>Notifications</h3>
            <ListGroup>
                {notifications.length === 0 ? (
                    <ListGroup.Item>No new notifications</ListGroup.Item>
                ) : (
                    notifications.map((notification, index) => (
                        <ListGroup.Item key={index}>
                            {notification.content} {/* Adjust to match your notification content structure */}
                            <small className="float-end">{new Date(notification.date).toLocaleString()}</small>
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>
            <ToastContainer />
        </div>
    );
}

export default Notifications;
