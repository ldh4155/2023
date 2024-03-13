import { Container } from 'react-bootstrap';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './page/Home.js';
import Login from './page/login/login.js';
import Signin from './page/login/signin.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardList from "./page/board/BoardList.js";
import axios from "axios";
import {useEffect, useState} from "react";


function App() {

    const [hello, setHello] = useState('');



    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Container style={{minHeight:'75vh'}}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signin' element={<Signin />} />
                        <Route path="/board/*" element={<BoardList />} />
                    </Routes>
                </Container>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
