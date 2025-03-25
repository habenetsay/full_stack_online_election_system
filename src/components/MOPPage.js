import React from 'react';
import Header from './Header';

function MOPPage() {
    return (
        <div className="member-of-parliament-page d-flex flex-column min-vh-100" style={{ backgroundImage: "url('public\online_vote.jpg')", backgroundSize: 'cover' }}>
            <Header />
            <div className="content flex-grow-1 my-5">
                <div className="announcement">
                    <p>this is member of parlament page</p>
                </div>
                {/* Additional content */}
            </div>
            <footer className="footer bg-light py-3">
                <div className="container text-center">
                    <p>&copy; 2024 Member of Parliament</p>
                </div>
            </footer>
        </div>
    );
}

export default MOPPage;
