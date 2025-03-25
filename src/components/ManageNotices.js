import React, { useState, useEffect } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ManageNotices = () => {
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('${process.env.REACT_APP_API_URL}/api/notices');
                setNotices(response.data);
            } catch (error) {
                toast.error("Failed to load notices.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotices();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this notice?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/notices/${id}`);
                setNotices(notices.filter(notice => notice.id !== id));
                toast.success("Notice deleted successfully.");
            } catch (error) {
                toast.error("Failed to delete notice.");
            }
        }
    };

    return (
        <Card>
            <Card.Header>Manage Notices</Card.Header>
            <Card.Body>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map((notice) => (
                                <tr key={notice.id}>
                                    <td>{notice.title}</td>
                                    <td>{notice.content}</td>
                                    <td>{notice.type}</td>
                                    <td>
                                        <Button variant="warning" className="me-2">
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(notice.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                <ToastContainer />
            </Card.Body>
        </Card>
    );
};

export default ManageNotices;
