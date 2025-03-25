import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MemberOfParliament from './MemberOfParlamentForm';

const AdminRegistrationDashboard = () => {
    const [showForm, setShowForm] = useState(true);
    const [defaultRole, setDefaultRole] = useState('');

    const handleParliamentClick = () => {
        setDefaultRole('memberOfParliament');
        setShowForm(true);
    }

    // const handleAdminClick = () => {
    //     setDefaultRole('admin');
    //     setShowForm(true);
    // }

    // const handleElectionCommitteeClick = () => {
    //     setDefaultRole('electionCommittee');
    //     setShowForm(true);
    // }

    return (
        <div>
            {/* <Link to="/create_account">
                <button>Add Election Committee</button>
            </Link> */}

            {/* <Link to="/create_account">
                <button>Add Admin</button>
            </Link> */}

            <button onClick={handleParliamentClick}>Add Parliament</button>

            {/* {showForm && ( */}
            <MemberOfParliament
                defaultRole={defaultRole}
            // onFormClose={() => setShowForm(false)}
            />
            {/* )} */}
        </div>
    );
}

export default AdminRegistrationDashboard;