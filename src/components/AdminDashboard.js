import React, { useState } from 'react';
import '../CSSFolder/AdminDashboard.css';
import CommitteeRegistrationForm from './CommitteeRegistrationForm';
import MemberOfParlamentForm from './MemberOfParlamentForm';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [activeContent, setActiveContent] = useState('home');
  const [status, setStatus] = useState('graduated');
  const [loading, setLoading] = useState(false);
  const [postingNotice, setPostingNotice] = useState(false);
  const [noticeText, setNoticeText] = useState('');
  const [noticeTitle, setNoticeTitle] = useState('');
  const [audience, setAudience] = useState('all');
  const [electionReport, setElectionReport] = useState(null);

  const navigate = useNavigate();

  const showContent = (id) => {
    setActiveContent(id);
  };

  const handleRegisterVoter = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/admin/voter/generate`, {
      method: 'GET',
    })
      .then(response => {
        setLoading(false);
        if (response.ok) {
          toast.success('2000 voters added successfully!'); 
        } else {
          throw new Error('Failed to register voters');
        }
      })
      .catch(error => {
        setLoading(false);
        toast.error('Failed to register voters.');
        console.error('Error:', error);
      });
  };

  const handlePostNotice = () => {
    setPostingNotice(true);
    fetch(`${process.env.REACT_APP_API_URL}/admin/post-notice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: noticeTitle, audience, notice: noticeText })
    })
      .then(response => {
        setPostingNotice(false);
        if (response.ok) {
          toast.success('Notice posted successfully!');
          setNoticeText('');
          setNoticeTitle('');
          setAudience('all');
        } else {
          throw new Error('Failed to post notice');
        }
      })
      .catch(error => {
        setPostingNotice(false);
        toast.error('Failed to post notice.');
        console.error('Error:', error);
      });
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleGenerateReport = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/election/report`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        const sortedData = Object.entries(data).reduce((acc, [campus, candidates]) => {
          acc[campus] = candidates.sort((a, b) => b.votes - a.votes).map((candidate, index) => ({
            ...candidate,
            rank: index + 1,
            isWinner: index === 0
          }));
          return acc;
        }, {});
        setElectionReport(sortedData);
        toast.success('Report generated successfully!');
      })
      .catch(error => {
        console.error('Error fetching report:', error);
        toast.error('Failed to generate report.');
      });
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const getRankLabel = (rank) => {
    if (rank === 1) return 'Winner';
    if (rank === 2) return 'Second';
    if (rank === 3) return 'Third';
    return `${rank}th`;
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div style={{ display: 'flex' }}>
        <div className="sidebar">
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {['home', 'register-parlament', 'register-committee', 'add voters', 'generate-report', 'change-profile', 'add notice'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => showContent(item)} 
                  className={`sidebar-button ${activeContent === item ? 'active' : ''}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="main-content">
          {activeContent === 'home' && <div><h2>Home</h2><p>This is the Home content.</p></div>}
          {activeContent === 'register-committee' && <CommitteeRegistrationForm status={status} onStatusChange={handleStatusChange} />}
          {activeContent === 'add voters' && (
            <div>
              <button onClick={handleRegisterVoter} disabled={loading}>
                {loading ? 'Registering...' : 'Register Voters'}
              </button>
            </div>
          )}
          {activeContent === 'register-parlament' && <MemberOfParlamentForm onStatusChange={handleStatusChange} />}
          {activeContent === 'add notice' && (
            <div className="notice-form">
              <h2>Add Notice</h2>
              <label>
                Title of Notice:
                <input
                  type="text"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="Enter notice title"
                  required
                />
              </label>
              <label>
                Audience:
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                >
                  <option value="all">All Users</option>
                  <option value="voters">Voters</option>
                  <option value="candidates">Candidates</option>
                  <option value="membersOfParliament">Members of Parliament</option>
                </select>
              </label>
              <label>
                Content:
                <textarea
                  value={noticeText}
                  onChange={(e) => setNoticeText(e.target.value)}
                  placeholder="Write your notice here..."
                  rows="5"
                  required
                />
              </label>
              <button
                onClick={handlePostNotice}
                disabled={postingNotice}
              >
                {postingNotice ? 'Posting...' : 'Post Notice'}
              </button>
            </div>
          )}
          {activeContent === 'generate-report' && (
            <div>
              <button onClick={handleGenerateReport}>
                Generate Election Report
              </button>
              {electionReport && (
                <div className="report-container">
                  <h2>Election Report</h2>
                  {Object.entries(electionReport).map(([campus, candidates]) => (
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
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
}

export default AdminDashboard;
