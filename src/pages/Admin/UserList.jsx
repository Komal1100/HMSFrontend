import { useEffect, useState } from "react";
import {  getUsers } from "../../api/services/adminService";

const UsersList = () => {
    const [users, setData] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setData(data);
        };

        fetchUsers();
    }, [])
    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        const names = user.name.split(' ');
                        const first = names.slice(0, 2).join(' ');
                        const last = names.slice(2).join(' ');

                        return (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{first}</td>
                                <td>{last}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.phone}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


        </>
    );
}

export default UsersList