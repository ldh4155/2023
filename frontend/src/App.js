import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './page/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardList from "./page/board/BoardList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header>
        <Container style={{minHeight:'75vh'}} />
      </Header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/board/*" element={<BoardList />} /> // 게시판 불러오기, 중첩 라우팅을 위한 와일드카드
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  
  );
}

export default App;