import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';

function SanPhamList() {
    const navigate = useNavigate();
    const xoaSP = (id) => {
        if (window.confirm('Xóa thật không bò') === false) return;
        fetch(`http://localhost:3000/admin/sp/${id}`, { method: "delete" })
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    alert('Có lỗi xảy ra khi xóa sản phẩm');
                } else {
                    window.confirm('Xóa thành công!')
                    ganListSP(listSP.filter(sp => sp.id !== id));
                }
            });
    };

    const [listSP, ganListSP] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/admin/sp")
            .then(res => res.json())
            .then(data => ganListSP(data))
    }, []);

    return (
        <div id="adminspList" className="col-md-9 ml-sm-auto col-lg-12 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Danh sách sản phẩm</h1>
            </div>
            <div className="container">
                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th>Hình</th>
                            <th>Tên sản phẩm</th>
                            <th>Ngày</th>
                            <th>Giá</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listSP.slice(0, 100).map((sp, index) => (
                            <tr key={sp.id_sp}>
                                <td>
                                    <img src={sp.hinh} alt={sp.ten_sp} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                </td>
                                <td>{sp.ten_sp}</td>
                                <td>{new Date(sp.ngay).toLocaleDateString('vi')}</td>
                                <td>{parseFloat(sp.gia).toLocaleString('vi')} VND</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => xoaSP(sp.id)}>Xóa</button> &nbsp;
                                    <Link to={"/admin/spsua/" + sp.id} className='btn btn-primary'>Sửa</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SanPhamList;
