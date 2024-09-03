import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChiTiet from './ChiTiet';
import SPTrongLoai from './SPTrongLoai';
import TimKiem from './TimKiem';
import NotFound from './NotFound';
import GioiThieu from './GioiThieu';
import Homepage from './pagehome';
import ShowCart from './ShowCart';
import ThanhToan from './ThanhToan';
import CamOn from './CamOn';
import DangNhap from './DangNhap';
import SanPhamList from './SanPhamList';
import SanPhamThem from './SanPhamThem';
import SanPhamSua from './SanPhamSua';
import ProtectedRoute from './ProtectedRoute';
import Admin from './Admin';
import AdminLayout from './AdminLayout';
import DefaultLayout from './DefaultLayout';
import LoaiSPlist from './LoaiSPlist';
import LoaiSPthem from './LoaiSPthem';
import DangKy from './DangKy';
import Account from './Account';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log("REACT_APP_API_URL= ", process.env.REACT_APP_API_URL)
    console.log("NODE_ENV= ", process.env.NODE_ENV)
  }, []);
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Routes sử dụng DefaultLayout */}
        <Route path='/' element={<DefaultLayout><Homepage /></DefaultLayout>} />
        <Route path='/dangnhap' element={<DefaultLayout><DangNhap /></DefaultLayout>} />
        <Route path='/dangky' element={<DefaultLayout><DangKy /></DefaultLayout>} />
        <Route path='/gioithieu' element={<DefaultLayout><GioiThieu /></DefaultLayout>} />
        <Route path='/sp/:id' element={<DefaultLayout><ChiTiet /></DefaultLayout>} />
        <Route path='/loai/:id_loai' element={<DefaultLayout><SPTrongLoai /></DefaultLayout>} />
        <Route path='/timkiem' element={<DefaultLayout><TimKiem /></DefaultLayout>} />
        <Route path='/cart' element={<DefaultLayout><ShowCart /></DefaultLayout>} />
        <Route path='/account' element={<DefaultLayout><Account /></DefaultLayout>} />
        <Route path='/camon' element={<DefaultLayout><CamOn /></DefaultLayout>} />

        {/* Routes sử dụng AdminLayout */}
        <Route element={<ProtectedRoute />}>
          <Route path='/admin' element={<AdminLayout><Admin /></AdminLayout>} />
          <Route path='/thanhtoan' element={<AdminLayout><ThanhToan /></AdminLayout>} />
          <Route path='/admin/sp' element={<AdminLayout><SanPhamList /></AdminLayout>} />
          <Route path='/admin/spthem' element={<AdminLayout><SanPhamThem /></AdminLayout>} />
          <Route path='/admin/spsua/:id' element={<AdminLayout><SanPhamSua /></AdminLayout>} />
          <Route path='/admin/loai' element={<AdminLayout><LoaiSPlist /></AdminLayout>} />
          <Route path='/admin/themloai' element={<AdminLayout><LoaiSPthem /></AdminLayout>} />
        </Route>

        {/* Route không tìm thấy trang */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
