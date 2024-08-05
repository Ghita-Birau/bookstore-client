import React from 'react';
import {FaUser, FaShoppingCart, FaHeart} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/NavBar.css';
import logo from '../assets/logo.jpg';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="Logo" className="d-inline-block align-text-top logo-test"/>
                        BookStore
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <form className="d-flex mx-auto search-form">
                        <input className="form-control me-2 search-input" type="search" placeholder="Search books..."
                               aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FaUser/> Account
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FaHeart/> Favorite
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FaShoppingCart/> Cart
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
