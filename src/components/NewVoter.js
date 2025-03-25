import React, { useState } from 'react';

function NewVoter() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can perform validation or any other logic before submitting the form
        // For example, you can check if the fields are not empty, if the email is valid, etc.
        if (!id || !email) {
            setError('Please fill in all fields');
        } else {
            // You can handle form submission here, like sending data to the server
            // For this example, let's just log the entered values
            console.log('Submitted ID:', id);
            console.log('Submitted Email:', email);
            // Reset fields after submission
            setId('');
            setEmail('');
            setError(null);
        }
    };

    return (
        <div className="new-voter-wrapper">
            <h1>Create New Voter</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>ID</p>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </label>
                <label>
                    <p>Email</p>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    );
}

export default NewVoter;
