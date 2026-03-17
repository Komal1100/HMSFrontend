import React, { useState } from 'react';
import { addUser } from '../../api/services/adminService';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'receptionist',
        phone: ''
    });


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const res = await addUser(formData);
            console.log("Success:", res);

            navigate("/admin/users");
        } catch (error) {
            console.error("Failed to add user:", error);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="John Doe"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="user@example.com"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="receptionist">Receptionist</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="+1 234 567 890"
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default AddUser;
