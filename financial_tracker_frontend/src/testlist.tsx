import api from "./API/api";
import { useEffect, useState } from "react";

interface User {
    id: number;
    username: string;
    email: string;
}

const TestList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/list/', {
                    withCredentials: true // Ensure cookies are sent with the request
                },
                );
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default TestList;