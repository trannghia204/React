import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Menu = () => {
    const [listloai, ganListloai] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/loai")
            .then(res => res.json())
            .then(data => ganListloai(data));
    }, []);

    return (
        <ul className="submenu">
            {listloai.map((loai, i) => (
                <li className="menucon" key={i}>
                    <Link to={"/loai/" + loai.id}>{loai.ten_loai}</Link>
                </li>
            ))}
        </ul>
    );
};

export default Menu;