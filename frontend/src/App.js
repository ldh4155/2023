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
import Login from './page/sign/Login';
import UserList from './page/mypage/UserList';
import SomeonePage from './page/mypage/SomeonePage';
import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Container style={{minHeight:'75vh'}} />
      </Header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mypage/:id' element={<MyPage/>}/>
        <Route path="/board/*" element={<BoardList />} /> // 게시판 불러오기, 중첩 라우팅을 위한 와일드카드
        <Route path="/Update/:id" element={<Update/>} />
        <Route path="/signin" eleement={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/users' element={<UserList/>}/>
        <Route path='/user/:id' element={<SomeonePage/>}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  
  );
}

export default App;