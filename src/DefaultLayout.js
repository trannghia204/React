// DefaultLayout.js
import React from 'react';
import Header from './header';
import Menu from './Menu';
import Footer from './Footer';


const DefaultLayout = ({ children }) => {
    return (
        <div className='container-fluid'>
            <header className='header'>
                <Header />
            </header>
            <nav className='sticky-menu navbar navbar-expand-lg custom-navbar'>
                <Menu />
            </nav>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default DefaultLayout;
