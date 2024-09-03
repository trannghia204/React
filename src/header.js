import React from 'react';
import { FaSearch, FaShoppingCart, FaPhone } from 'react-icons/fa';
import logo from './images/logo2.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DropdownMenu from './DropdownMenu';

const Header = () => {
    const cartItemCount = useSelector(state => state.cart.listSP.length);
    return (
        <header className='header'>
            <div className='header-left'>
                <img src={logo} alt='Logo' className='logo' />
            </div>
            <div className='header-center'>
                <input type='text' placeholder='Search...' className='search-input' />
                <button className='search-button'>
                    <FaSearch />
                </button>
            </div>
            <div className='header-right'>
                <a href='tel:+123456789' className='icon'><FaPhone /></a>
                <DropdownMenu />
                <Link to="/cart" className="cart-link">
                    <div className='icon '>
                        <FaShoppingCart />
                        <div className="cart-count">{cartItemCount}</div>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Header;
