import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AccountManagement = () => {
    const user = useSelector((state) => state.auth.user);
    console.log('User in account management:', user);  // Kiểm tra dữ liệu
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState(user);

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the API to update user info
        fetch(`http://localhost:3000/user/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(userInfo),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                setIsEditing(false);
            })
            .catch(error => console.error('Error updating user info:', error));
    };

    return (
        <div className="account-management">
            <h2>Account Management</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={handleChange}
                        />
                    ) : (
                        <p>{userInfo.name}</p>
                    )}
                </div>
                <div>
                    <label>Email:</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                        />
                    ) : (
                        <p>{userInfo.email}</p>
                    )}
                </div>
                <div>
                    <label>Address:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="address"
                            value={userInfo.dia_chi}
                            onChange={handleChange}
                        />
                    ) : (
                        <p>{userInfo.dia_chi}</p>
                    )}
                </div>
                <div>
                    <label>Phone:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="phone"
                            value={userInfo.dien_thoai}
                            onChange={handleChange}
                        />
                    ) : (
                        <p>{userInfo.dien_thoai}</p>
                    )}
                </div>
                <button type="button" onClick={toggleEdit}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && <button type="submit">Save</button>}
            </form>
        </div>
    );
};

export default AccountManagement;
