import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Unauthorized");
                navigate("/login");
                return;
            }

            const res = await fetch("https://your-railway-backend-url.com/api/auth/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 403) {
                alert("You are not authorized to view this page.");
                navigate("/");
                return;
            }

            const data = await res.json();
            setUsers(data);
        };

        fetchUsers();
    }, [navigate]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>All Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}
                        ({user.role})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;