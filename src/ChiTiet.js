import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";
import { FaShoppingCart, FaEye } from 'react-icons/fa';

function ChiTiet() {
    document.title = "Chi Tiết";
    const dispatch = useDispatch();
    let { id } = useParams();
    const [sp, ganSP] = useState([]);
    let giagiam = (((sp['gia'] - sp['gia_km']) / sp['gia']) * 100).toFixed(0);
    const [sanPhamNgauNhien, setSanPhamNgauNhien] = useState([]);
    useEffect(() => {
        let url = `http://localhost:3000/sp/${id}`;
        fetch(url).then(res => res.json()).then(data => ganSP(data))
    }, [id]);
    useEffect(() => {
        fetch('http://localhost:3000/sp')
            .then(res => res.json())
            .then(data => {
                const randomProducts = [];
                while (randomProducts.length < 4) {
                    const index = Math.floor(Math.random() * data.length);
                    const randomProduct = data[index];
                    if (!randomProducts.includes(randomProduct)) {
                        randomProducts.push(randomProduct);
                    }
                }
                setSanPhamNgauNhien(randomProducts);
            });

    }, []);

    return (
        <div id='chitiet'>
            <div id="row1">
                <div className="product-image">
                    <img src={sp['hinh']} alt={sp['ten_sp']} />
                </div>
                <div className="product-details">
                    <h1>{sp['ten_sp']}</h1>
                    <div className="rating">
                        <span>4.7</span> <span className="stars">★★★★★</span> <span>4,2k Đánh Giá</span>
                    </div>
                    <div className="price">
                        <span className="original-price">{Number(sp['gia']).toLocaleString("vi")} VNĐ</span> <span className="discounted-price">{Number(sp['gia_km']).toLocaleString("vi")} VNĐ</span> <span className="discount">{giagiam}% GIẢM</span>
                    </div>
                    <div className="policies">
                        <span>Chính Sách Trả Hàng</span> - <span>Trả hàng 15 ngày</span> - <span>Đổi ý miễn phí</span>
                    </div>
                    <div className="shipping">
                        <div className="free-shipping">Miễn phí vận chuyển</div>
                        <div className="delivery">Vận Chuyển Tới <span>Q12 TP HCM</span></div>
                        <div className="shipping-fee">Phí Vận Chuyển: ₫0</div>
                        <div className="shipping-fee">thời gian dự kiến: {new Date(sp.ngay).toLocaleDateString('vi-VN')}</div>
                        <div className="mota">
                            <p>RAM: {sp['ram']}</p>
                            <p>CPU: {sp['cpu']}</p>
                            <p>Đĩa Cứng: {sp['dia_cung']}</p>
                        </div>
                    </div>
                    <div className="quantity">
                        <label for="quantity">Số Lượng</label>
                        <input type="number" id="quantity" name="quantity" value="1" min="1" />
                    </div>
                    <div className="actions">
                        <button className="add-to-cart"><a onClick={() => dispatch(themSP(sp))}>Thêm vào giỏ hàng</a></button>
                        <button className="buy-now">Mua Ngay</button>
                    </div>
                </div>
            </div>

            <div id="row2">
                <h3>Các sản phẩm liên quan</h3>
                <div className="chitiet">
                    {sanPhamNgauNhien.map((sp, i) =>
                        <div className="sp" key={i}>
                            <div className="card">
                                <h4 className="card-title">
                                    <Link to={`/sp/${sp.id}`}>{sp.ten_sp}</Link>
                                </h4>
                                <img
                                    src={sp.hinh}
                                    alt={sp.ten_sp}
                                    title={sp.ten_sp}
                                    className="img-fluid card-img-top"
                                />
                                <div className="card-body">
                                    <p className="gia">
                                        <del>{Number(sp.gia).toLocaleString('vi')} VND</del>
                                        <div className="price">{parseFloat(sp.gia_km).toLocaleString('vi')} VND</div>
                                    </p>
                                    <div
                                        className="btn btn-cart button-hidden">
                                        <div className='icon-btn-cart' ><FaShoppingCart onClick={() => dispatch(themSP(sp))} /></div>
                                        <div className='icon-btn-cart' ><Link to={`/sp/${sp.id}`}><FaEye onClick={() => dispatch(themSP(sp))} /></Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};


export default ChiTiet;