import React from "react";
import { useSelector } from "react-redux";
import { xoaSP } from "./cartSlice";
import { useDispatch } from "react-redux";
function ThanhToan() {
    const dispatch = useDispatch();
    let htRef = React.createRef();
    let emRef = React.createRef();
    const cart = useSelector((state) => state.cart.listSP);

    const submitDuLieu = () => {
        let ht = htRef.current.value;
        let em = emRef.current.value;
        if (ht === "" || em === "") {
            alert('Nhập đủ thông tin bạn ơi');
            return;
        }
        if (cart.length === 0) {
            alert('Bạn chưa chọn sản phẩm nào');
            return;
        }

        let url = "http://localhost:3000/luudonhang";
        let tt = { ho_ten: htRef.current.value, email: emRef.current.value };
        var opt = {
            method: "post",
            body: JSON.stringify(tt),
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                if (data.id_dh < 0) {
                    console.log("Lỗi lưu đơn hàng", data);
                } else {
                    let id_dh = data.id_dh;
                    console.log("Đã lưu xong giỏ hàng");
                    luuchitietdonhang(id_dh, cart);
                    alert("Đã đặt hàng thành công");
                    window.location.href = "/camon";
                }
            });
    }


    const luuxongsp = (data) => {
        console.log(data)
        dispatch(xoaSP(data.id_sp));
    }


    const luuchitietdonhang = (id_dh, cart) => {
        let url = "http://localhost:3000/luugiohang";
        cart.forEach(sp => {
            let t = { id_dh: id_dh, id_sp: sp.id, so_luong: sp.soluong };
            let opt = {
                method: "post",
                body: JSON.stringify(t),
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(url, opt)
                .then(res => res.json())
                .then(data => luuxongsp(data))
                .catch(err => console.error("Lỗi lưu sản phẩm", sp));
        });
    }

    return (
        <form id="frmthanhtoan" > <h2>Thanh toán đơn hàng</h2>
            <div><label>Họ tên</label> <input ref={htRef} type="text" /> </div>
            <div> <label>Email</label> <input ref={emRef} type="email" /> </div>
            <div><button onClick={() => submitDuLieu()} type="button">Lưu đơn hàng</button></div>
        </form>
    );

}

export default ThanhToan;
