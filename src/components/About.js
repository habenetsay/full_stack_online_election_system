import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../CSSFolder/About.css'; // Import your CSS file for styling
import Header from './Header'
const About = () => {
    return (
        <>
        <Header/>
        <Container className="about-container">
            <h1 className="text-center mb-4">About the Student Union</h1>
            <Row>
                <Col md={6}>
                    <Card className="about-card">
                        <Card.Body>
                            <Card.Title>Importance of Student Union</Card.Title>
                            <Card.Text>
                                The Student Union plays a crucial role in promoting student welfare and fostering a vibrant campus community. It serves as a bridge between students and the university administration, ensuring that student voices are heard and represented. The union organizes various activities, events, and services that enhance the overall student experience.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="about-card">
                        <Card.Body>
                            <Card.Title>Roles of the Student Union</Card.Title>
                            <Card.Text>
                                The Student Union is responsible for:
                                <ul>
                                    <li>Advocating for student rights and concerns</li>
                                    <li>Organizing social, cultural, and educational events</li>
                                    <li>Providing resources and support for student organizations</li>
                                    <li>Facilitating communication between students and university administration</li>
                                    <li>Encouraging civic engagement and leadership among students</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={12}>
                    <Card className="about-card">
                        <Card.Body>
                            <Card.Title>Join Us!</Card.Title>
                            <Card.Text>
                                The Student Union welcomes all students to get involved, share their ideas, and contribute to making our university a better place. Whether you're looking to join a committee, participate in events, or simply learn more about what we do, we encourage you to reach out and connect with us!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default About;
