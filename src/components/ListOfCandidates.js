import React, { useState, useEffect } from 'react';
import '../CSSFolder/CampaignDetails.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ListOfCandidates() {
    const [campaigns, setCampaigns] = useState([]);
    const [error, setError] = useState(null);
    const [statuses, setStatuses] = useState({});
    const [rejectReason, setRejectReason] = useState('');
    const [rejectCandidateId, setRejectCandidateId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/campaign/getCandidates');
            if (!response.ok) {
                throw new Error('Failed to fetch campaigns');
            }
            const data = await response.json();
            setCampaigns(data);
        } catch (error) {
            console.error(error);
            setError("Some error occurred");
        }
    };

    const handleApproval = async (campaignId, isApproval) => {
        if (isApproval) {
            await approveCampaign(campaignId);
        } else {
            setRejectCandidateId(campaignId);
        }
    };

    const approveCampaign = async (campaignId) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/approveCampaign/${campaignId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                toast.success('Candidate approved successfully!', { autoClose: 3000 });
                setStatuses(prev => ({ ...prev, [campaignId]: 'approved' }));
            } else {
                toast.error('Failed to approve candidate.', { autoClose: 5000 });
            }
        } catch (error) {
            toast.error('An error occurred while approving the candidate.', { autoClose: 5000 });
            console.error(error);
        }
    };

    const handleRejectSubmit = async () => {
    console.log('Rejecting candidate ID:', rejectCandidateId); // Debugging log
    if (!rejectReason) {
        toast.error('Rejection reason is required!', { autoClose: 3000 });
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/admin/rejectCampaign/${rejectCandidateId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason: rejectReason }),
        });

        if (response.ok) {
            toast.success('Candidate rejected successfully!', { autoClose: 3000 });
            setStatuses(prev => ({ ...prev, [rejectCandidateId]: 'rejected' }));
            setRejectReason('');
            setRejectCandidateId(null);
        } else {
            toast.error('Failed to reject candidate.', { autoClose: 5000 });
        }
    } catch (error) {
        toast.error('An error occurred while rejecting the candidate.', { autoClose: 5000 });
        console.error(error);
    }
};

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCampaigns = campaigns.slice(indexOfFirstItem, indexOfLastItem);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="campaign-details-container">
            <ToastContainer />
            <h1 className="title">List Of Candidates</h1>
            <table className="candidates-table">
                <thead>
                    <tr>
                        <th>Candidate Photo</th>
                        <th>Campaign ID</th>
                        <th>Student ID</th>
                        <th>Candidate Experience</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCampaigns.map(campaign => {
                        const { memberOfParliament } = campaign;
                        const account = memberOfParliament?.account;

                        return (
                            <tr key={campaign.campaignId}>
                                <td>
                                    <img
                                        src={`http://localhost:8080/${campaign.candidatePhotoPath}`}
                                        alt={`Photo of campaign ${campaign.campaignId}`}
                                        className="candidate-image"
                                    />
                                </td>
                                <td>{campaign.campaignId}</td>
                                <td>{account?.studentId || 'N/A'}</td>
                                <td>
                                    <a href={`http://localhost:8080/${campaign.candidateExperiencePath}`} download>
                                        Download
                                    </a>
                                </td>
                                <td>
                                    {statuses[campaign.campaignId] ? (
                                        <span className={`status ${statuses[campaign.campaignId]}`}>{statuses[campaign.campaignId]}</span>
                                    ) : (
                                        <div className="button-group">
                                            <button 
                                                className="approve-button" 
                                                onClick={() => handleApproval(campaign.campaignId, true)}
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                className="reject-button" 
                                                onClick={() => handleApproval(campaign.campaignId, false)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: Math.ceil(campaigns.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {rejectCandidateId && (
                <div className="modal">
                    <h2 className="modal-title">Rejection Reason</h2>
                    <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Enter rejection reason..."
                        className="modal-input"
                    />
                    <div className="modal-buttons">
                        <button className="confirm-button" onClick={handleRejectSubmit}>Submit</button>
                        <button className="cancel-button" onClick={() => setRejectCandidateId(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}
