import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../CSSFolder/Help.css'; // Import your CSS file for styling
import Header from './Header'
const Help = () => {


    return (
        <>
                    <Header />

        <Container className="help-container">
            <h1 className="text-center mb-4">Help & Support for Online Elections</h1>
            <Row>
                <Col md={6}>
                    <Card className="help-card">
                        <Card.Body>
                            <Card.Title>Understanding the Election Process</Card.Title>
                            <Card.Text>
                                The Student Union Online Election System is designed to ensure a fair and transparent voting process. Here are the key steps:
                                <ul>
                                    <li><strong>Registration:</strong> Ensure you are registered to vote. Check your registration status on the voter dashboard.</li>
                                    <li><strong>Voting:</strong> Cast your vote during the designated voting period. Access the voting portal through your dashboard.</li>
                                    <li><strong>Results Announcement:</strong> Results will be announced after the voting period closes. Stay updated through notifications.</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="help-card">
                        <Card.Body>
                            <Card.Title>How to Vote</Card.Title>
                            <Card.Text>
                                Voting is simple! Follow these steps to ensure your voice is heard:
                                <ul>
                                    <li>Log in to your account on the online election system.</li>
                                    <li>Navigate to the voting section on your dashboard.</li>
                                    <li>Select your preferred candidates and confirm your vote.</li>
                                    <li>You will receive a confirmation of your vote submission.</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={12}>
                    <Card className="help-card">
                        <Card.Body>
                            <Card.Title>Frequently Asked Questions</Card.Title>
                            <Card.Text>
                                Here are some common questions about the online election system:
                                <ul>
                                    <li><strong>What if I encounter issues while voting?</strong> If you face any technical difficulties, please contact support immediately via the contact information below.</li>
                                    <li><strong>Can I change my vote after submitting it?</strong> No, once a vote is submitted, it cannot be changed. Please review your choices carefully before confirming.</li>
                                    <li><strong>What to do if I am not registered?</strong> You can register during the registration period. Check the announcements for details on how to register.</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={12}>
                    <Card className="help-card">
                        <Card.Body>
                            <Card.Title>Contact Support</Card.Title>
                            <Card.Text>
                                For further assistance or inquiries regarding the online election system, feel free to reach out:
                                <ul>
                                    <li><strong>Email:</strong> support@studentunion.edu</li>
                                    <li><strong>Phone:</strong> (123) 456-7890</li>
                                    <li><strong>Office Hours:</strong> Monday to Friday, 9 AM - 5 PM</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default Help;
