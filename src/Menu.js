import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Menu = () => {
    const [listloai, setListLoai] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/loai")
            .then(res => res.json())
            .then(data => setListLoai(data));
    }, []);

    return (
        <ul className="navbar-nav custom-navbar">
            <li className="nav-item">
                <Link className="nav-link" to="/">TRANG CHỦ</Link>
            </li>
            <li className="nav-item custom-dropdown">
                <Link className="nav-link" to="#">DANH MỤC</Link>
                <ul className="custom-dropdown-menu">
                    {listloai.map((loai, i) => (
                        <li className="custom-dropdown-item" key={i}>
                            <Link to={"/loai/" + loai.id}>{loai.ten_loai}</Link>
                        </li>
                    ))}
                </ul>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/cart">GIỎ HÀNG</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/gioithieu">GIỚI THIỆU</Link>
            </li>
        </ul>
    );
};

export default Menu;
