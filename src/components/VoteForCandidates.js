import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';
import '../CSSFolder/VoteForCandidates.css';

const ITEMS_PER_PAGE = 6; // Number of candidates per page

export default function VoteForCandidates({ studentId }) {
    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState(null);
    const [votes, setVotes] = useState({});
    const [detailsVisible, setDetailsVisible] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/campaign/getCandidatesByCampus?studentId=${studentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch candidates');
                }
                const data = await response.json();
                setCandidates(data);
            } catch (error) {
                console.error(error);
                setError('Could not load candidates. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (studentId) {
            fetchCandidates();
        }
    }, [studentId]);

    const handleVote = async (campaignId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/voter/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: studentId, campaignId: campaignId }),
            });

            if (response.ok) {
                toast.success('Vote submitted successfully!', { autoClose: 3000 });
                setVotes(prevVotes => ({ ...prevVotes, [campaignId]: 'voted' }));
            } else {
                const errorMessage = await response.text();
                toast.error(`Failed to vote: ${errorMessage}`, { autoClose: 5000 });
            }
        } catch (error) {
            toast.error('An error occurred while voting.', { autoClose: 5000 });
            console.error('Error occurred while voting:', error);
        }
    };

    const toggleDetails = (campaignId) => {
        setDetailsVisible(prev => ({ ...prev, [campaignId]: !prev[campaignId] }));
    };

    // Pagination functions
    const indexOfLastCandidate = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstCandidate = indexOfLastCandidate - ITEMS_PER_PAGE;
    const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(candidates.length / ITEMS_PER_PAGE);

    if (loading) {
        return (
            <div className="loading-container">
                <ThreeDots height="80" width="80" color="#00BFFF" />
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="campaign-details-container">
            <ToastContainer />
            <h1 className="title">Vote for Your Candidates</h1>
            {candidates.length === 0 ? (
                <div>No candidates available for your campus.</div>
            ) : (
                <>
                    <div className="campaign-grid">
                        {currentCandidates.map(campaign => (
                            <div key={campaign.campaignId} className="candidate-card">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/${campaign.candidatePhotoPath}`}
                                    alt={`Photo of candidate ${campaign.candidateName}`}
                                    className="candidate-photo"
                                />
                                <h3 className="candidate-name">{campaign.candidateName}</h3>
                                <p className="candidate-party"><strong>Party:</strong> {campaign.party}</p>
                                <button
                                    className="vote-button"
                                    onClick={() => handleVote(campaign.campaignId)}
                                    disabled={votes[campaign.campaignId] === 'voted'}
                                >
                                    {votes[campaign.campaignId] === 'voted' ? 'Voted' : 'Vote'}
                                </button>
                                {votes[campaign.campaignId] === 'voted' && (
                                    <p className="status-message voted">You have voted for this candidate</p>
                                )}
                                <button className="details-button" onClick={() => toggleDetails(campaign.campaignId)}>
                                    {detailsVisible[campaign.campaignId] ? 'Hide Details' : 'View Details'}
                                </button>
                                {detailsVisible[campaign.campaignId] && (
                                    <div className="candidate-details">
                                        <p><strong>Biography:</strong> {campaign.biography}</p>
                                        <p><strong>Campaign Promises:</strong> {campaign.promises}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
