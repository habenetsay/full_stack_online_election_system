import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import ListOfCandidates from './ListOfCandidates';

const ElectionCommitteeComp = () => {
    const user = useSelector((state) => state.user);
    const role = user?.role || 'Guest'; // Fallback to "Guest" if role is undefined

    return (
        <div>
            <Header title="Election Committee" role={role} />
            <main style={{ padding: '20px' }}>
                <h2>Candidates for Election</h2>
            </main>
        </div>
    );
};

export default ElectionCommitteeComp;
