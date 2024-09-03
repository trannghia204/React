import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SanPhamThem() {
    const [sp, setSp] = useState({
        id_loai: '',
        ten_sp: '',
        gia: '',
        gia_km: '',
        hinh: '',
        ngay: '',
        luot_xem: '',
        ram: '',
        cpu: '',
        dia_cung: '',
        can_nang: ''
    });

    const navigate = useNavigate();

    const submitDuLieu = (e) => {
        e.preventDefault(); // Ngăn chặn form submit mặc định
        let url = `http://localhost:3000/admin/sp`;
        let opt = {
            method: "post",
            body: JSON.stringify(sp),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                alert(data.thongbao);
                if (!data.err) {
                    setSp({
                        id_loai: '',
                        ten_sp: '',
                        gia: '',
                        gia_km: '',
                        hinh: '',
                        ngay: '',
                        luot_xem: '',
                        ram: '',
                        cpu: '',
                        dia_cung: '',
                        can_nang: ''
                    });
                    navigate('/admin/sp');
                }
            });
    }

    return (
        <div id="SanPhamThem" className="col-md-9 ml-sm-auto col-lg-12 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Thêm sản phẩm</h1>
            </div>
            <div className="container">
                <form id="frmaddsp" onSubmit={submitDuLieu}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="id_loai" className="form-label">Loại sản phẩm</label>
                            <select
                                id="id_loai"
                                className="form-control"
                                value={sp.id_loai}
                                onChange={e => setSp({ ...sp, id_loai: e.target.value })}>
                                <option value={0}>Chọn loại sản phẩm</option>
                                <option value={1}>Asus</option>
                                <option value={2}>Acer</option>
                                <option value={3}>Lenovo</option>
                                <option value={4}>MSI</option>
                                <option value={5}>HP</option>
                                <option value={6}>Dell</option>
                                <option value={7}>Apple</option>
                                <option value={8}>Surface</option>
                                <option value={9}>Masstel</option>
                                <option value={10}>LG</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="ten_sp" className="form-label">Tên SP</label>
                            <input
                                type="text"
                                id="ten_sp"
                                className="form-control"
                                value={sp.ten_sp}
                                onChange={e => setSp({ ...sp, ten_sp: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="gia" className="form-label">Giá</label>
                            <input
                                type="number"
                                id="gia"
                                className="form-control"
                                value={sp.gia}
                                onChange={e => setSp({ ...sp, gia: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="gia_km" className="form-label">Giá KM</label>
                            <input
                                type="number"
                                id="gia_km"
                                className="form-control"
                                value={sp.gia_km}
                                onChange={e => setSp({ ...sp, gia_km: e.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="hinh" className="form-label">Hình</label>
                            <input
                                type="text"
                                id="hinh"
                                className="form-control"
                                value={sp.hinh}
                                onChange={e => setSp({ ...sp, hinh: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="ngay" className="form-label">Ngày nhập</label>
                            <input
                                type="date"
                                id="ngay"
                                className="form-control"
                                value={sp.ngay}
                                onChange={e => setSp({ ...sp, ngay: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="luot_xem" className="form-label">Lượt xem</label>
                            <input
                                type="number"
                                id="luot_xem"
                                className="form-control"
                                value={sp.luot_xem}
                                onChange={e => setSp({ ...sp, luot_xem: e.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="ram" className="form-label">RAM</label>
                            <input
                                type="text"
                                id="ram"
                                className="form-control"
                                value={sp.ram}
                                onChange={e => setSp({ ...sp, ram: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="cpu" className="form-label">CPU</label>
                            <input
                                type="text"
                                id="cpu"
                                className="form-control"
                                value={sp.cpu}
                                onChange={e => setSp({ ...sp, cpu: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="dia_cung" className="form-label">Đĩa cứng</label>
                            <input
                                type="text"
                                id="dia_cung"
                                className="form-control"
                                value={sp.dia_cung}
                                onChange={e => setSp({ ...sp, dia_cung: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="can_nang" className="form-label">Cân nặng</label>
                            <input
                                type="text"
                                id="can_nang"
                                className="form-control"
                                value={sp.can_nang}
                                onChange={e => setSp({ ...sp, can_nang: e.target.value })} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary" type="submit">Thêm sản phẩm</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SanPhamThem;
