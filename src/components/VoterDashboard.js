import React, { useState } from 'react';
import { Button, Container, Row, Col, Table, Spinner, Alert } from 'react-bootstrap';
import Header from './Header';
import '../CSSFolder/VoterDashboard.css';
import VoteForCandidates from './VoteForCandidates';
import axios from 'axios';

function VoterDashboard() {
    const [showCandidates, setShowCandidates] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [studentId] = useState(localStorage.getItem('studentId'));
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleToggleCandidates = () => {
        setShowCandidates(!showCandidates);
    };

    const handleToggleResults = async () => {
        setShowResults(!showResults);

        // Fetch results only if showing them
        if (!showResults) {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/election/report/student/${studentId}`);
                setResults(response.data || []);
                setError(null); // Reset error on successful fetch
            } catch (err) {
                setError('Error fetching results. Please try again later.');
            } finally {
                setLoading(false);
            }
        }
    };

    // Function to determine the position based on rank
    const getPosition = (index) => {
        switch (index) {
            case 0:
                return 'Coordinator';
            case 1:
                return 'Vice Coordinator';
            case 2:
                return 'Secretary';
            case 3:
                return 'Female Coordinator';
            default:
                return ''; // No specific position for other ranks
        }
    };

    return (
        <>
            <Header />
            <Container className="voter-dashboard">
                <Row className="justify-content-center mt-5">
                    <Col md={8} className="text-center">
                        <h2 className="dashboard-title">Voter Dashboard</h2>
                        <p className="dashboard-description">
                            Welcome to the Voter Dashboard! Here, you can view candidates for the upcoming election and check the results once voting is completed.
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={4} className="text-center mt-4">
                        <Button
                            variant="primary"
                            className="dashboard-btn"
                            onClick={handleToggleCandidates}
                        >
                            {showCandidates ? 'Hide Candidates' : 'View Candidates'}
                        </Button>
                    </Col>
                    <Col md={4} className="text-center mt-4">
                        <Button
                            variant="success"
                            className="dashboard-btn"
                            onClick={handleToggleResults}
                        >
                            {showResults ? 'Hide Results' : 'View Results'}
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-5">
                    <Col md={10}>
                        {showCandidates && <VoteForCandidates studentId={studentId} />}
                    </Col>
                </Row>
                {showResults && (
                    <Row className="justify-content-center mt-5">
                        <Col md={10}>
                            {loading ? (
                                <Spinner animation="border" />
                            ) : error ? (
                                <Alert variant="danger">{error}</Alert>
                            ) : results.length === 0 ? (
                                <p>No results available for this student ID.</p>
                            ) : (
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Candidate Name</th>
                                            <th>Votes</th>
                                            <th>Campus</th>
                                            <th>Position</th> {/* New column for Position */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((result, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td> {/* Display rank based on index */}
                                                <td>{result.name}</td> {/* Assuming the candidate name is in the "name" field */}
                                                <td>{result.votes}</td> {/* Assuming the votes are in the "votes" field */}
                                                <td>{result.campus}</td> {/* Assuming the campus name is in the "campus" field */}
                                                <td>{getPosition(index)}</td> {/* Display the position based on rank */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
}

export default VoterDashboard;
