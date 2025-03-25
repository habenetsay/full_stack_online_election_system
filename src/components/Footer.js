import React from 'react';
import Header from './Header';
import Footer from './Footer';

function MemberOfParliamentPage() {
    return (
        <div className="member-of-parliament-page">
            <Header />
            <div className="content">
                <h1>Welcome, Member of Parliament!</h1>
                <div className="announcement">
                    <h2>Election Announcement</h2>
                    <p>The upcoming election is scheduled for...</p>
                </div>
                {/* Additional content */}
            </div>
            <Footer />
        </div>
    );
}

export default MemberOfParliamentPage;
