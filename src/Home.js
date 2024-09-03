import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { themSP } from './cartSlice';
import { FaShoppingCart, FaEye } from 'react-icons/fa';

const Home = () => {
    document.title = 'Home';
    const dispatch = useDispatch();
    const [listsp, ganListSP] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/spmoi/12')
            .then(res => res.json())
            .then(data => ganListSP(data));
    }, []);

    return (
        <div id="home">
            <div className="box-product">
                <div className="title" id="location">
                    <h1>Danh sách sản phẩm</h1>
                </div>
                <div className="row home">
                    {listsp.slice(0, 12).map((sp, i) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 sp mb-4" key={i}>
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
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Home;
