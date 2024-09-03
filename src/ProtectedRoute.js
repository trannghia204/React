import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const daDangNhap = useSelector(state => state.auth.daDangNhap);
    console.log("daDangNhap=", daDangNhap);
    if (!daDangNhap) return <Navigate to="/dangnhap" />
    else return (<Outlet />);
};
export default ProtectedRoute;
