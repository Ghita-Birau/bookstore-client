import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import SideBar from './components/SideBar';
import BookGrid from './components/BookGrid';
import Footer from './components/Footer';
import BookDetails from './components/BookDetails';
import './App.css';

function App() {

    return (
        <Router>
            <div className="App">
                <NavBar />
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
