// import { listsp } from "./data";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

function SanPhamXemNhieu() {

    const [listspXemNhieu, ganListSPXemNhieu] = useState([]);
    const [sotin, setsotin] = useState(8);

    useEffect(() => {
        fetch("http://localhost:3000/spxemnhieu")
            .then(res => res.json()).then(data => ganListSPXemNhieu(data));
    }, []);

    let jsxcode =

        <div id="spxn" className="container">
            <div className="tieude text-center my-3">
                <h3>Sản Phẩm "HOT"</h3>
            </div>
            <div className="row">
                {listspXemNhieu.slice(0, sotin).map((sp, i) => (
                    <div className="col-12 mb-4" key={i}>
                        <div className="card h-100">
                            <div className="row g-0 bg">
                                <div className="col-4">
                                    <img src={sp.hinh} alt={sp.ten_sp} className="img-fluid rounded-start" />
                                </div>
                                <div className="col-8">
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <div className="ten">
                                                <Link to={`/sp/${sp.id}`} className="card-title h5">{sp.ten_sp}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-end mt-3">
                <button
                    type="button"
                    className="btn btn-outline-info me-2"
                    onClick={() => setsotin(sotin + 8)}
                >
                    Xem thêm
                </button>
                <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => setsotin(sotin - 8)}
                >
                    Ẩn
                </button>
            </div>
        </div>


    return (jsxcode);
}
export default SanPhamXemNhieu;
