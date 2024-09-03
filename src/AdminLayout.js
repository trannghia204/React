import React from 'react';
import './admin.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { thoat } from './authSlice';
import logo from './images/avata.jpeg';
const AdminLayout = ({ children }) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        if (window.confirm('Bạn muốn đăng xuất?')) {
            dispatch(thoat());
        }
    };

    return (
        <div id="AdminLayout">
            <div className="container-fluid">
                <div className="main-content">
                    <div className="sidebar">
                        <div className='in-fo'>
                            <img src={logo} className="img-fluid card-img-top img-info-admin" />
                            <h4>{user.name}</h4>
                        </div>
                        <ul className="nav navadmin">
                            <li className="nav-item">
                                <button className="btn-sidebar">
                                    <Link to="/admin">Dashboard</Link>
                                </button>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn-sidebar dropdown-toggle text-light" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    Quản lý sản phẩm
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <button className="dropdown-item">
                                            <Link className='text-black' to="/admin/spthem">Thêm sản phẩm</Link>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item">
                                            <Link className='text-black' to="/admin/sp">Danh sách sản phẩm</Link>
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn-sidebar dropdown-toggle text-light" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    Quản lý loại sản phẩm
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <button className="dropdown-item">
                                            <Link className='text-black' to="/admin/themloai">Thêm loại sản phẩm</Link>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item">
                                            <Link className='text-black' to="/admin/loai">Danh sách loại sản phẩm</Link>
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn-sidebar dropdown-toggle text-light" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tài khoản
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <button className="dropdown-item">
                                            <Link className='text-black' to="/admin/spthem">Tạo tài khoản mới</Link>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item">
                                            <Link className='text-black' to="/admin/sp">Danh sách tài khoản</Link>
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <button className="btn-sidebar">
                                    <Link to="/" onClick={handleLogout}>Đăng xuất</Link>
                                </button>
                            </li>

                        </ul>
                    </div>
                    <div className="main-content-area">
                        <div className='toppp'></div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
