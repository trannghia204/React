import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Logout() {
    const [dkus, setDkus] = useState({});
    const navigate = useNavigate();

    const submitDuLieu = (e) => {
        e.preventDefault(); // Ngăn sự kiện submit mặc định
        let url = `http://localhost:3000/dangky`;
        let otp = {
            method: "post",
            body: JSON.stringify(dkus),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(url, otp)
            .then(res => res.json())
            .then(data => {
                alert(data.thongbao);
                if (data.id) {
                    navigate('/dangnhap');
                }
            });
    };

    const xuliValue = (e) => {
        const { name, value } = e.target;
        setDkus({ ...dkus, [name]: value });
    };

    return (
        <div className="dangki">
            <form>
                <div className="form-container form-dky" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', height: '500px', background: 'black' }}>
                    <h1>Đăng ký</h1>
                    <div className="input-group">
                        <div><input type="text" id="name" name="name" placeholder="Nhập tên tài khoản" onChange={xuliValue} /></div>

                    </div>
                    <div className="input-group">
                        <div><input type="text" id="email" name="email" placeholder="...@gmail.com" onChange={xuliValue} /></div>

                    </div>
                    <div className="input-group">
                        <div><input type="password" id="pass" name="password" placeholder="Nhập password" onChange={xuliValue} /></div>

                    </div>
                    <div className="input-group">
                        <div><input type="text" id="phone" name="dien_thoai" placeholder="Nhập số điện thoại" onChange={xuliValue} /></div>
                    </div>
                    <div className="input-group">
                        <div><input type="text" id="dia_chi" name="dia_chi" placeholder="Địa chỉ" onChange={xuliValue} /></div>
                    </div>

                    <div className="button-group">
                        <button onClick={submitDuLieu} className="btn-submit" type="button">Đăng ký</button>
                        {/* <Link to="/#" activeclassname="active-link"><button className="btn-close" type="button"></button></Link> */}
                    </div>
                </div>
            </form>

        </div>
    );
}

export default Logout;