import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";
import { FaShoppingCart, FaEye } from 'react-icons/fa';

function PhanTrang({ listSP, pageSize }) {
    const [currentPage, setCurrentPage] = useState(0);
    const spTrong1Trang = listSP.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    const tongSoTrang = Math.ceil(listSP.length / pageSize);

    const chuyenTrang = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div>
            <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} />
            <ReactPaginate
                nextLabel=">"
                previousLabel="<"
                pageCount={tongSoTrang}
                pageRangeDisplayed={5}
                onPageChange={chuyenTrang}
                containerClassName="thanhphantrang"
                activeClassName="active"
            />
        </div>
    );
}

function HienSPTrongMotTrang({ spTrongTrang }) {
    const dispatch = useDispatch();

    return (
        <div id="data">
            {spTrongTrang.map((sp, index) => (
                <div className="sp" key={index}>
                    <h4><Link to={`/sp/${sp.id}`}>{sp.ten_sp}</Link></h4>
                    <img src={sp.hinh} alt={sp.ten_sp} />
                    <div
                        className="btn btn-cart button-hidden">
                        <div className='icon-btn-cart' ><FaShoppingCart onClick={() => dispatch(themSP(sp))} /></div>
                        <div className='icon-btn-cart' ><Link to={`/sp/${sp.id}`}><FaEye onClick={() => dispatch(themSP(sp))} /></Link></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function SPTrongLoai() {
    document.title = "Sản phẩm";
    const { id_loai } = useParams();
    const [list_sp, ganListSP] = useState([]);
    const [loai, ganLoai] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/sptrongloai/${id_loai}`)
            .then(res => res.json())
            .then(data => ganListSP(data));

        fetch(`http://localhost:3000/loai/${id_loai}`)
            .then(res => res.json())
            .then(data => ganLoai(data));
    }, [id_loai]);

    return (
        <div id="listsp">
            <h1>Các dòng máy {loai.ten_loai}</h1>
            <PhanTrang listSP={list_sp} pageSize={20} />
        </div>
    );
}

export default SPTrongLoai;
