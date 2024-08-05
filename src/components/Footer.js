import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer bg-dark text-white text-center py-3">
            <div className="container">
                <p>&copy; 2024 Bookstore. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
