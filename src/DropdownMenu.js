import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thoat } from './authSlice';
import './DropdownMenu.css';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(thoat());
    };

    return (
        <div id='userdropdownn'>
            <div className="dropdownn">
                <button onClick={toggleDropdown} className="dropdownn-button">
                    {user === null || user === undefined ? (
                        <FaUser />
                    ) : (
                        user.name + ":>"
                    )}
                </button>
                {isOpen && (
                    <div className="dropdownn-menu">
                        {user === null || user === undefined ? (
                            <>
                                <Link to="/dangnhap">Đăng nhập</Link>
                                <Link to="/dangky">Đăng kí</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/account">Quản lí tài khoản</Link>
                                <Link to="/" onClick={handleLogout}>Đăng xuất</Link>
                                {user && user.role === 1 && <Link to="/admin">Quản lí admin</Link>}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropdownMenu;
