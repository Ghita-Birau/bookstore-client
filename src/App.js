import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/main/NavBar";
import SideBar from './components/main/SideBar';
import BookGrid from './components/books/BookGrid';
import Footer from './components/main/Footer';
import BookDetails from './components/books/BookDetails';
import OrderDetails from './components/orders/OrderDetails';
import './App.css';

function App() {

    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<OrderDetails />} />
                    <Route path="/order/:bookId" element={<OrderDetails />} />
                </Routes>
                <div className="d-flex">
                    <SideBar  />
                    <div className="content flex-grow-1">
                        <Routes>
                            <Route path="/" element={<BookGrid />} />
                            <Route path="/book/:id" element={<BookDetails />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
