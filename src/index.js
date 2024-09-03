const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
app.use([cors(), express.json()]);

const PRIVATE_KEY = fs.readFileSync("private-key.txt");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'laptop_react1'
});

db.connect(err => {
    if (err) throw err;
    console.log("Database kết nối thành công");
});

// Định nghĩa các route

app.listen(3000, () => console.log("Ứng dụng đang chạy với port 3000"));

// Định nghĩa các route API

app.get('/spmoi/:sosp?', (req, res) => {
    let sosp = parseInt(req.params.sosp || 6);
    if (sosp <= 1) sosp = 6;
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
               FROM san_pham WHERE an_hien = 1 ORDER BY ngay desc LIMIT 0, ?`;
    db.query(sql, sosp, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy list sp", err });
        else res.json(data);
    });
});

app.get('/sp', (req, res) => {
    let sql = `SELECT * FROM san_pham`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy list sp", err });
        else res.json(data);
    });
});

app.get('/sp/hot', (req, res) => {
    let sql = `SELECT * FROM san_pham WHERE hot = 1 LIMIT 10`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy sản phẩm hot", err });
        else res.json(data);
    });
});

app.get('/sp/new', (req, res) => {
    let sql = `SELECT * FROM san_pham ORDER BY ngay DESC LIMIT 15`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy sản phẩm mới", err });
        else res.json(data);
    });
});

app.get('/lt/:id', (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM san_pham WHERE id = ?`;
    db.query(sql, [id], (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy chi tiết sản phẩm", err });
        else if (data.length === 0) res.json({ "thongbao": "Không tìm thấy sản phẩm" });
        else res.json(data[0]);
    });
});


app.get('/loai', (req, res) => {
    let sql = `SELECT * FROM loai`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy loai sp", err });
        else res.json(data);
    });
});

app.get('/sp/:id', (req, res) => {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({ "thongbao": "Không biết sản phẩm", "id": id });
        return;
    }
    let sql = `SELECT sp.id, sp.ten_sp, sp.slug, sp.gia, sp.gia_km, sp.hinh, sp.ngay, sp.luot_xem, 
               tt.ram, tt.cpu, tt.dia_cung, tt.can_nang 
               FROM san_pham sp
               LEFT JOIN thuoc_tinh tt ON sp.id = tt.id_sp
               WHERE sp.id = ?`;
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err });
        else res.json(data[0]);
    });
});

app.get('/sptrongloai/:id_loai', (req, res) => {
    let id_loai = parseInt(req.params.id_loai);
    if (isNaN(id_loai) || id_loai <= 0) {
        res.json({ "thongbao": "Không biết loại", "id_loai": id_loai });
        return;
    }
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay
               FROM san_pham WHERE id_loai = ? AND an_hien = 1 ORDER BY id desc`;
    db.query(sql, id_loai, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy sp trong loại", err });
        else res.json(data);
    });
});

app.get('/loai/:id_loai', (req, res) => {
    let id_loai = parseInt(req.params.id_loai);
    if (isNaN(id_loai) || id_loai <= 0) {
        res.json({ "thongbao": "Không biết loại", "id_loai": id_loai });
        return;
    }
    let sql = `SELECT id, ten_loai FROM loai WHERE id = ?`;
    db.query(sql, id_loai, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy loại", err });
        else res.json(data[0]);
    });
});

app.get('/spxemnhieu', (req, res) => {
    let spXemNhieu = parseInt(req.params.spXemNhieu || 8);
    if (spXemNhieu <= 1) spXemNhieu = 7;
    let sql = `SELECT * FROM san_pham WHERE luot_xem > 900`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy sp hot", err });
        else res.json(data);
    });
});

app.post('/luudonhang/', (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO don_hang SET ?`;
    db.query(sql, data, (err, data) => {
        if (err) {
            res.json({ "id_dh": -1, "thongbao": "Lỗi lưu đơn hàng", err });
        } else {
            let id_dh = data.insertId;
            res.json({ "id_dh": id_dh, "thongbao": "Đã lưu đơn hàng" });
        }
    });
});

app.post('/luugiohang/', (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO don_hang_chi_tiet SET ?`;
    db.query(sql, data, (err, d) => {
        if (err) {
            res.json({ "thongbao": "Lỗi lưu sp", err });
        } else {
            res.json({ "thongbao": "Đã lưu sp vào db", "id_sp": data.id_sp });
        }
    });
});

// API admin

app.get('/admin/sp', (req, res) => {
    let sql = `SELECT id, ten_sp, gia, hinh, ngay, luot_xem 
               FROM san_pham ORDER BY id desc`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy list sp", err });
        else res.json(data);
    });
});

app.get('/admin/sp/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (id == 0) {
        res.json({ "thongbao": "Không biết sản phẩm", "id": id });
        return;
    }
    let sql = 'SELECT * FROM san_pham WHERE id = ?';
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err });
        else res.json(data[0]);
    });
});

app.post('/admin/sp', (req, res) => {
    const san_pham = {
        id_loai: req.body.id_loai,
        ten_sp: req.body.ten_sp,
        slug: req.body.slug,
        gia: req.body.gia,
        gia_km: req.body.gia_km,
        hinh: req.body.hinh,
        ngay: req.body.ngay,
        luot_xem: req.body.luot_xem
    };

    const thuoc_tinh = {
        ram: req.body.ram,
        cpu: req.body.cpu,
        dia_cung: req.body.dia_cung,
        can_nang: req.body.can_nang
    };

    const san_phamSQL = 'INSERT INTO san_pham SET ?';
    db.query(san_phamSQL, san_pham, (err, result) => {
        if (err) {
            console.error("Lỗi chèn 1 sp:", err);
            res.json({ "thongbao": "Lỗi chèn 1 sản phẩm", err });
        } else {
            const newIdSP = result.insertId;
            const thuoc_tinhSQL = 'INSERT INTO thuoc_tinh SET ?';
            const thuoc_tinhIDSP = { ...thuoc_tinh, id_sp: newIdSP };

            db.query(thuoc_tinhSQL, thuoc_tinhIDSP, (err, result) => {
                if (err) {
                    console.error("Lỗi chèn 1 thuộc tính:", err);
                    res.json({ "thongbao": "Lỗi chèn thuộc tính sản phẩm", err });
                } else {
                    console.log("Thêm thành công:", result);
                    res.json({ "thongbao": "Đã chèn 1 sản phẩm và thuộc tính", "id": newIdSP });
                }
            });
        }
    });
});

app.put('/admin/sp/:id', (req, res) => {
    const san_pham = {
        id_loai: req.body.id_loai,
        ten_sp: req.body.ten_sp,
        slug: req.body.slug,
        gia: req.body.gia,
        gia_km: req.body.gia_km,
        hinh: req.body.hinh,
        ngay: req.body.ngay,
        luot_xem: req.body.luot_xem
    };

    const thuoc_tinh = {
        ram: req.body.ram,
        cpu: req.body.cpu,
        dia_cung: req.body.dia_cung,
        can_nang: req.body.can_nang
    };

    const id = req.params.id;

    const updateSanPhamSQL = 'UPDATE san_pham SET ? WHERE id = ?';
    db.query(updateSanPhamSQL, [san_pham, id], (err, result) => {
        if (err) {
            console.error("Lỗi cập nhật sp:", err);
            res.json({ "thongbao": "Lỗi cập nhật sản phẩm", err });
        } else {
            const updateThuocTinhSQL = 'UPDATE thuoc_tinh SET ? WHERE id_sp = ?';
            db.query(updateThuocTinhSQL, [thuoc_tinh, id], (err, result) => {
                if (err) {
                    console.error("Lỗi cập nhật thuộc tính:", err);
                    res.json({ "thongbao": "Lỗi cập nhật thuộc tính sản phẩm", err });
                } else {
                    console.log("Cập nhật thành công:", result);
                    res.json({ "thongbao": "Đã cập nhật sản phẩm và thuộc tính" });
                }
            });
        }
    });
});



app.delete('/admin/sp/:id', (req, res) => {
    let id = req.params.id;
    let sql = 'DELETE FROM san_pham WHERE id = ?';
    db.query(sql, id, (err, d) => {
        if (err) res.json({ "thongbao": "Lỗi khi xóa sp", err });
        else res.json({ "thongbao": "Đã xóa sp" });
    });
});


app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ thongbao: "Lỗi server" });
            return;
        }

        if (results.length > 0) {
            const userInfo = results[0];
            const jwtBearToken = jwt.sign({}, PRIVATE_KEY, {
                algorithm: "RS256",
                expiresIn: 1800,
                subject: userInfo.id.toString()
            });
            res.status(200).json({
                token: jwtBearToken,
                expiresIn: 120,
                userInfo: {
                    id: userInfo.id,
                    email: userInfo.email,
                    role: userInfo.role,
                    name: userInfo.name,
                    dia_chi: userInfo.dia_chi,
                    dien_thoai: userInfo.dien_thoai,
                    hinh: userInfo.hinh,
                    password: userInfo.password
                }
            });
        } else {
            res.status(401).json({ thongbao: "Đăng nhập thất bại" });
        }
    });
});


app.get('/admin/loai', (req, res) => {
    let sql = `SELECT id, ten_loai
               FROM loai`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy list loại", err });
        else res.json(data);
    });
});
app.post('/admin/loai', (req, res) => {
    const { ten_loai, thu_tu } = req.body;
    let sql = `INSERT INTO loai (ten_loai, thu_tu) VALUES (?, ?)`;
    db.query(sql, [ten_loai, thu_tu], (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi thêm loại mới", err });
        else res.json({ "thongbao": "Thêm loại mới thành công", data });
    });
});
app.delete('/admin/loai/:id', (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM loai WHERE id = ?`;
    db.query(sql, [id], (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi xóa loại", err });
        else res.json({ "thongbao": "Xóa loại thành công", data });
    });
});

app.post('/dangky', (req, res) => {
    const data = req.body;
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, data, (err, result) => {
        if (err) {
            console.error("Error during insertion:", err);
            res.json({ "thongbao": "Lỗi đăng ký tài khoản!", err });
        } else {
            console.log("Insertion successful, result:", result);
            res.json({ "thongbao": "Đã Đã đăng ký tài khoản thành công!", "id": result.insertId });
        }
    });
});


app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const sql = `SELECT id, name, email, dia_chi, dien_thoai FROM users WHERE id = ?`;
    db.query(sql, [userId], (err, data) => {
        if (err) res.json({ "thongbao": "err", err });
        else res.json(data[0]);
    });
});

app.post('/user/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, address, phone } = req.body;
    const sql = `UPDATE users SET name = ?, email = ?, dia_chi = ?, dien_thoai = ? WHERE id = ?`;
    db.query(sql, [name, email, address, phone, userId], (err, data) => {
        if (err) res.json({ "thongbao": "err", err });
        else res.json({ message: 'User info updated successfully' });
    });
});