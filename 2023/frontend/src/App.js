import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './page/Home';
import Login from './page/login/login';
import Signin from './page/login/signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardList from "./page/board/BoardList";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Container style={{minHeight:'75vh'}}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<login />} />
                        <Route path='/signin' element={<signin />} />
                        <Route path="/board/*" element={<BoardList />} />
                    </Routes>
                </Container>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
