// NoticeDashboard.js
import React, { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import PostNotices from './PostNotices';
// Import other components as needed
import '../CSSFolder/NoticeDashboard.css'; // Custom CSS for styling the header
import Header from './Header'; // Assuming this is your reusable header component

const NoticeDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('PostNotices'); // Set a default component

    const renderComponent = () => {
        switch (activeComponent) {
            case 'PostNotices':
                return <PostNotices />;
            // Handle other cases as needed
            default:
                return <div>Select an option from the header</div>;
        }
    };

    return (
        <div className="dashboard-wrapper">
            <Header />
            <div className="header">
                <div className="header-brand">Notice Dashboard</div>
                <Nav className="header-nav">
                    <Nav.Link onClick={() => setActiveComponent('PostNotices')}>Post Notice</Nav.Link>
                    <Nav.Link onClick={() => setActiveComponent('DeleteNotice')}>Delete Notice</Nav.Link>
                    <Nav.Link onClick={() => setActiveComponent('UpdateNotice')}>Update Notice</Nav.Link>
                    <Nav.Link onClick={() => setActiveComponent('ViewNotices')}>View Notices</Nav.Link>
                </Nav>
            </div>

            {/* Main Content */}
            <Container className="content-wrapper">
                {renderComponent()}
            </Container>
        </div>
    );
};

export default NoticeDashboard;
