import React, { useState } from 'react';
import CreateUserAPI from './API/CreateUserAPI.ts';

function CreateUser() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const userData = await CreateUserAPI(email, password);
            console.log('User created successfully:', userData);
            // Handle successful user creation (e.g., redirect, show message)
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Input your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Input your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default CreateUser;