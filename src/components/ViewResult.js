// ViewResult.js
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header'
import 'react-toastify/dist/ReactToastify.css';

function ViewResult() {
  const [electionReport, setElectionReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchElectionReport = async () => {
      setLoading(true);
      try {
        const response = await fetch('${process.env.REACT_APP_API_URL}/api/election/report', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();

        const sortedData = Object.entries(data).reduce((acc, [campus, candidates]) => {
          acc[campus] = candidates.sort((a, b) => b.votes - a.votes).map((candidate, index) => ({
            ...candidate,
            rank: index + 1,
            isWinner: index === 0
          }));
          return acc;
        }, {});

        setElectionReport(sortedData);
        toast.success('Report fetched successfully!');
      } catch (error) {
        console.error('Error fetching report:', error);
        toast.error('Failed to fetch report.');
      } finally {
        setLoading(false);
      }
    };

    fetchElectionReport();
  }, []);

  const getRankLabel = (rank) => {
    if (rank === 1) return 'Winner';
    if (rank === 2) return 'Second';
    if (rank === 3) return 'Third';
    return `${rank}th`;
  };

  return (
    <div>
    <Header/>
      <h2>Election Report</h2>
      {loading ? (
        <p>Loading...</p>
      ) : electionReport ? (
        Object.entries(electionReport).map(([campus, candidates]) => (
          <div key={campus} className="campus-report">
            <h3>Campus: {campus}</h3>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Votes</th>
                  <th>Campus</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr key={index} className={candidate.isWinner ? 'winner-row' : ''}>
                    <td>{getRankLabel(candidate.rank)}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.votes}</td>
                    <td>{candidate.campus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No report available.</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default ViewResult;
