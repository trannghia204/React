import React, { useState } from 'react';
import './admin.css';

function AddLoaiSP() {
    const [tenLoai, setTenLoai] = useState('');
    const [thuTu, setThuTu] = useState('');
    const [anHien, setAnHien] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const loai = {
            ten_loai: tenLoai,
            thu_tu: thuTu,
            an_hien: anHien
        };

        fetch('http://localhost:3000/admin/loai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loai)
        })
            .then(response => response.json())
            .then(data => {
                if (data.thongbao === 'Thêm loại mới thành công') {
                    alert('Thêm loại mới thành công');
                    setTenLoai('');
                    setThuTu('');
                    setAnHien(1);
                } else {
                    alert('Có lỗi xảy ra khi thêm loại mới');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="add-loai-container">
            <h2 className="add-loai-header">Thêm Loại Sản Phẩm Mới</h2>
            <form onSubmit={handleSubmit}>
                <div className="add-loai-form-group">
                    <label htmlFor="tenLoai">Tên Loại:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tenLoai"
                        value={tenLoai}
                        onChange={(e) => setTenLoai(e.target.value)}
                        required
                    />
                </div>
                <div className="add-loai-form-group">
                    <label htmlFor="thuTu">Thứ Tự:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="thuTu"
                        value={thuTu}
                        onChange={(e) => setThuTu(e.target.value)}
                        required
                    />
                </div>
                <div className="add-loai-form-group">
                    <label>Trạng Thái:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="1"
                                checked={anHien === 1}
                                onChange={() => setAnHien(1)}
                            />
                            Hiện
                        </label>
                        <label style={{ marginLeft: '10px' }}>
                            <input
                                type="radio"
                                value="0"
                                checked={anHien === 0}
                                onChange={() => setAnHien(0)}
                            />
                            Ẩn
                        </label>
                    </div>
                </div>
                <button type="submit" className="add-loai-btn-primary">Thêm Loại</button>
            </form>
        </div>
    );
}

export default AddLoaiSP;
