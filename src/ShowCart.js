import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { xoaSP, suaSL } from './cartSlice';
import { Link } from 'react-router-dom';
import ThanhToan from './ThanhToan';

const Cart = () => {
    const listSP = useSelector(state => state.cart.listSP);
    const dispatch = useDispatch();

    return (
        <div className="cart-container">
            <h2 className='text-light'>Giỏ Hàng</h2>
            {listSP.length === 0 ? (
                <p className='text-light'>Giỏ hàng trống :v</p>
            ) : (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSP.map((sp, index) => (
                                <tr className="cart-item" key={index}>
                                    <td>{sp.ten_sp}</td>
                                    <td><img src={sp.hinh} title={sp.ten_sp} className='img-cart-table' /></td>
                                    <td>
                                        <input
                                            type="number"
                                            className='item-quantity'
                                            defaultValue={sp.so_luong}
                                            onClick={e => dispatch(suaSL([sp.id, e.target.value]))}
                                        />
                                    </td>
                                    <td>{Number(sp.gia).toLocaleString("vi")} VNĐ</td>
                                    <td>{Number(sp.gia * sp.so_luong).toLocaleString("vi")} VNĐ</td>
                                    <td><a onClick={() => dispatch(xoaSP(sp.id))}>Xóa</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ThanhToan />
                </>
            )}
        </div>
    );
};

export default Cart;
