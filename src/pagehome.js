// import logo from './logo.svg';
import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import SanPhamXemNhieu from './SanPhamXemNhieu';
import SlideShow from './SlideShow';

function HomePage() {
    return (
        <div className="pagehome">
            <div className="row">
                <div className="col-12">
                    <div className="App">
                        <SlideShow />
                    </div>
                </div>
            </div>
            <div className="row d-flex page-home">
                <article className="col-md-9 col-12">
                    <Home />
                </article>
                <aside className="col-md-3 col-12">
                    <SanPhamXemNhieu />
                </aside>
            </div>
        </div>

    )
}
export default HomePage;