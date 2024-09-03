import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { dalogin } from "./authSlice";
import { useNavigate } from "react-router-dom";

function DangNhap() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submitDuLieu = () => {
        if (emailRef.current.value === "" || passwordRef.current.value === "") {
            alert("Nhập đủ thông tin nhé bạn ơi");
            return;
        }

        let url = "http://localhost:3000/login";
        let tt = { email: emailRef.current.value, password: passwordRef.current.value };
        var opt = {
            method: "post",
            body: JSON.stringify(tt),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(url, opt)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                if (data.token) {
                    console.log(data);
                    dispatch(dalogin(data));
                    alert('Đăng nhập thành công!');
                    navigate('/');
                } else {
                    alert("Đăng nhập thất bại. có chắc là đúng thông tin chưa?");
                }
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                alert("Đăng nhập thất bại. có chắc là đúng thông tin chưa?");
            });
    };

    return (
        <div className="container-form-login">
            <form id="frmLogin" className="login-form col-7 m-auto border rounded shadow p-4">
                <h2 className="form-header text-uppercase text-center mb-4">Thành viên đăng nhập</h2>

                <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập email"
                        ref={emailRef}
                    />
                </div>

                <div className="form-group mb-3">
                    <label>Mật khẩu</label>
                    <input
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        ref={passwordRef}
                    />
                </div>

                <div className="form-group form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="showPasswordCheckbox"
                        onChange={togglePasswordVisibility}
                    />
                    <label className="form-check-label" htmlFor="showPasswordCheckbox">
                        Hiển thị mật khẩu
                    </label>
                </div>

                <div className="form-group mb-3 text-center">
                    <button type="button" onClick={submitDuLieu} className="btn btn-primary w-100">
                        Đăng nhập
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DangNhap;
