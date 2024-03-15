import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './page/Home';
<<<<<<< HEAD
import MyPage from './page/mypage/MyPage'
=======
import Login from './page/login/login';
import Signin from './page/login/signin';
>>>>>>> c98a20ff6fddc9db7d4afd88463d8c8b3239580a
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardList from "./page/board/BoardList";
import Update from './page/board/Update';
import SignIn from './page/sign/SignIn';
import SignUp from './page/sign/SignUp';
import UserList from './page/mypage/UserList';
import SomeonePage from './page/mypage/SomeonePage';
import React, { useState } from 'react';

function App() {
<<<<<<< HEAD
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
        <Route path="/signin" element={<SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path='/users' element={<UserList/>}/>
        <Route path='/user/:id' element={<SomeonePage/>}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  
  );
=======
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
>>>>>>> c98a20ff6fddc9db7d4afd88463d8c8b3239580a
}

export default App;
