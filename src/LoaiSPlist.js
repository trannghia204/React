import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';

function LoaiSPlist() {
    const navigate = useNavigate();
    const xoaLoaiSP = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa loại sản phẩm này?')) {
            fetch(`http://localhost:3000/admin/loai/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.thongbao === 'Xóa loại thành công') {
                        alert('Xóa loại thành công');
                        // Cập nhật lại danh sách loại sản phẩm
                        ganListLoai(listLoai.filter(sp => sp.id !== id));
                    } else {
                        alert('Có lỗi xảy ra khi xóa loại sản phẩm');
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    };


    const [listLoai, ganListLoai] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/admin/loai")
            .then(res => res.json())
            .then(data => ganListLoai(data))
    }, []);

    return (
        <div id="adminspList" className="col-md-9 ml-sm-auto col-lg-12 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Danh sách sản phẩm</h1>
            </div>
            <div className="table-container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Tên Loại</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listLoai.slice(0, 100).map((sp, index) => (
                            <tr key={sp.id_sp}>
                                <td>{sp.ten_loai}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => xoaLoaiSP(sp.id)}>Xóa</button> &nbsp;
                                    <Link to={"/admin/LoaiSPsua/" + sp.id} className='btn btn-primary'>Sửa</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LoaiSPlist;
