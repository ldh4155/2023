import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './page/Home';
import MyPage from './page/mypage/MyPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardList from "./page/board/BoardList";
import Update from './page/board/Update';
import SignIn from './page/sign/SignIn';
import SignUp from './page/sign/SignUp';
import UserList from './page/mypage/UserList';
import SomeonePage from './page/mypage/SomeonePage';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MessageModal from './components/MessageModal';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOpen = useSelector((state) => state.modal.isModalOpen);

  return (
    <div className="App">
      <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Container style={{minHeight:'75vh'}} />
      </Header>
      {isOpen && <MessageModal />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path="/board/*" element={<BoardList />} /> // 게시판 불러오기, 중첩 라우팅을 위한 와일드카드
        <Route path="/Update/:id" element={<Update/>} />
        <Route path="/signin" element={<SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path='/users' element={<UserList/>}/>
        <Route path='/user/:id' element={<SomeonePage/>}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  
  );
}

export default App;
