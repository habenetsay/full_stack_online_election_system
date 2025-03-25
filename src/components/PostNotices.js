import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Select from 'react-select';

const options = [
    { value: 'ROLE_ALL', label: 'All Users' }, 
    { value: 'ROLE_MEMBEROFPARLIAMENT', label: 'Member of Parliament' },
    { value: 'ROLE_CANDIDATE', label: 'Candidate' },
    { value: 'ROLE_VOTER', label: 'Voter' },
    { value: 'ROLE_ADMIN', label: 'Admin' },
    { value: 'ROLE_ELECTIONCOMMITTEE', label: 'Election Committee' }
];

function PostNotices() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [targetRoles, setTargetRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [studentId, setStudentId] = useState('');

    useEffect(() => {
        const storedStudentId = localStorage.getItem('studentId');
        if (storedStudentId) {
            setStudentId(storedStudentId);
        } else {
            toast.error("Student ID not found. Please log in again.", { position: "top-right" });
        }
    }, []);

    const handleRoleChange = (selectedOptions) => {
        if (selectedOptions) {
            const isAllUsersSelected = selectedOptions.some(option => option.value === 'ROLE_ALL');

            if (isAllUsersSelected) {
                setTargetRoles(options.filter(option => option.value !== 'ROLE_ALL'));
            } else {
                setTargetRoles(selectedOptions);
            }
        } else {
            setTargetRoles([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || targetRoles.length === 0 || !studentId) {
            toast.warn("Please fill in all fields.", { position: "top-right" });
            return;
        }

        setIsLoading(true);

        try {
            console.log("Preparing to post notice...", { title, content, targetRoles, studentId });
            const response = await axios.post('${process.env.REACT_APP_API_URL}/api/notices', {
                title,
                content,
                targetRoles: targetRoles.map(role => role.value),
                studentId
            }, { timeout: 5000 });
            console.log("Response from server:", response.data);
            toast.success("Notice posted successfully!", { position: "top-right" });
            setTitle('');
            setContent('');
            setTargetRoles([]);
        } catch (error) {
            console.error("Error posting notice:", error.response ? error.response.data : error);
            if (error.code === 'ECONNABORTED') {
                toast.error("Request timed out. Please try again.", { position: "top-right" });
            } else {
                toast.error("Failed to post notice. Try again later.", { position: "top-right" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="mt-9">
            <Card className="shadow-sm mb-4">
                <Card.Header className="bg-primary text-white text-center">
                    <h4>Post a New Notice</h4>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="noticeTitle" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the title of the notice"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="noticeContent" className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Write the notice content here"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="noticeTargetRoles" className="mb-3">
                            <Form.Label>Target Roles</Form.Label>
                            <Select
                                isMulti
                                name="targetRoles"
                                options={options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={targetRoles}
                                onChange={handleRoleChange}
                                placeholder="Select Target Roles"
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isLoading} className="w-100">
                            {isLoading ? 'Posting...' : 'Post Notice'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <ToastContainer />
        </Container>
    );
}

export default PostNotices;
