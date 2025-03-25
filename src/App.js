import React from 'react';
import './App.css';
import Homepage from './components/Homepage';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import ApplyForm from './components/ApplyForm';
import MOPPage from './components/MOPPage';
import ListOfCandidates from './components/ListOfCandidates';
import Confirmation from './components/Confirmation';
import VoterDashboard from './components/VoterDashboard';
import ChangePassword from './components/ChangePassword';
import { Provider } from 'react-redux';
import store from './components/store';
import MemberOfParliamentDashboard from './components/MemberOfParliamentDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; 
import ElectionCommitteeComp from './components/ElectionCommitteeComp';
import NoticeDashboard from './components/NoticeDashboard';
import PostNotices from './components/PostNotices';
import About from './components/About';
import Help from './components/Help';
import ViewResult from './components/ViewResult';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/apply" element={<ApplyForm />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/viewResult" element={<ViewResult/>} />

                    <Route path="/register" element={<Confirmation />} />
                    
                    {/* Protected Routes */}
                    <Route path="/voterDashboard" element={<ProtectedRoute element={<VoterDashboard />} />} />
                    <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
                    <Route path="/change-password" element={<ProtectedRoute element={<ChangePassword />} />} />
                    <Route path="/member-of-parliament" element={<ProtectedRoute element={<MemberOfParliamentDashboard />} />} />
                    <Route path="/election_committee" element={<ProtectedRoute element={<ElectionCommitteeComp />} />} />
                    <Route path="/candidateDashboard" element={<ProtectedRoute element={<ListOfCandidates />} />} />
                    <Route path="/NoticeDashboard" element={<ProtectedRoute element={<NoticeDashboard />} />} /> {/* Ensure the path is correct */}
                    <Route path="/post-notice" element={<ProtectedRoute element={<PostNotices />} />} /> {/* Ensure the path is correct */}


                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
