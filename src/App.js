import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/main/NavBar";
import SideBar from './components/main/SideBar';
import BookGrid from './components/books/BookGrid';
import Footer from './components/main/Footer';
import BookDetails from './components/books/BookDetails';
import './App.css';
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import MyAccount from "./components/user/MyAccount";
import MyOrders from "./components/user/MyOrders";

function App() {

    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/account" element={<MyAccount />} />
                    <Route path="/myOrders" element={<MyOrders />} />
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
