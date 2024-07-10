import React, {  useEffect, useState } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';

import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import MessageModalButton from './MessageModalButton';
import Message from '../page/message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { Login, LogoutUser } from '../redux/Action/LoginAction';
import styles from '../style/cssmodule/components/Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access');
  const isLoggedIn = useSelector(state => state.loginState.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if(token!=null) {
      dispatch(Login());
    }
  }, []);

  const handleLogin = () => {
    navigate('/signin');
  }

  const handleLogout = async () => {
    dispatch(LogoutUser());
    navigate('/');
  }

  return (
      <Navbar expand="lg" className={styles.navbar}>
        <Container>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Navbar.Brand className={styles.navbarBrand}>
              <img
                  src ="https://lh3.googleusercontent.com/fife/ALs6j_HZzAgHcqB3etwuKZrMfbXo1HyK6zSi5YyNvyciTy-gt9ExwQBIt8IShjpXP5cAKTp_Ui9RQcopQm9AkPr4ccW9UosPsa_TauWwKV3A8uEHpjq1oOQbZvQ5zqz1MLWmywdEDHfvACDraRLklAAXXyDhry2uxvByNQC5Zgza4NnREy1E4gROtI-nzwd6LdVukZbZmKqHUu2gBIVuqFzIFoJeu7ykdrNAL34heXSX41EqepM0Ls9NqWnDyk9fAkkJ1LnYgM-pEeK-KCwnaza2nxqNKGpgiITvXFMC0Eh4VmVJFlut-iRNW0-dg2LV8Jq5SPRpwzElJBmgl1XGBSBOFw5hW5qL1AgznXv2zfUXEWbPXlBW9oNR32QtZELPzS9u9MivMGr9yvboZAxjFg_xjPRF3PLqku9-z9ItM3Chor_bDfYTuDsNQ1Qb7Kx0zWG4pGaXXYcjrbOc8LgLOb9cRwSMaM_m1TkdXjcSSYmxX20V6EAuVGdXZ70vZniG824UrKkZx-sr-FuromxNBJy1F-oLkvfgWB20HrjdAeXNIk51Wa6Bx5tjbyHCy4H-JwCixVUa48KiXbNQDKcWZuoeQpT5MrnpYHPAYnEvooXX_MMjJBAxmphn4w0HgQnrJsfXHsMrKFFHWgd9mzKu_T4ZxCK8d6IrJBB0ZJVB8CXxK_ubVw-6D5kLuydCIJbpNqGIawZVyaTMtoOlO5QdGPrbNOBRczVVSUa0C1Nbuuyf3ZlbLRjbbRshVN5euoItOx82qYftRRtufxCzyCnr2UoHa9KGTGWIQB-lWCgtkKZXeXs8r4NxfqfrEOlTCfOVWwQ7ohJHhgznfjjCp_ibJR960i8EfdwXD2RiYKE3SMbij1PwJcAjL0nbUcCyIv5weZVHoXdLGkYMgirask_8Jq8BjOHllwAa8FoziE-sUU_2-i6dSW0IPLPXPSvgGX-4a3V4lSjDNLYeb_dToi8HZa_cx9458B1dHv1Wjjsa5_wAV5i0H22pAiY_vSe5ByiXkiWrzC5ss2bzuww1LWRQngrPf5KQvkaWTv0n5v5VQKnmE2aYwR2d3l8Mlm8TayPDMWaOP0LPtdD8dIA32H3gwCsTIlKEsiBes1iEAxdvjo7_FOT-oBuxTrWUjzKZSl_ciGS4-N2QkMuv2-FGb8bp__mfMabFu3EQj2ml80_X4Hpzh8nlQLkEcaxt8mn0mjPGDNk81aqr8f-7oijmpkZbJ9C4auC-XLCaZDL1HvwN75Dbvs5IwLeOwZWzO5MuNMpQ6v2PjQ9D71WKxAwN7sTBlI2aPHnyBfNWQnMM0ysrgeSkGDQZupdJVtaaxZNwFF0R-7kZW7DfFDqLeCs7dOrE7ndSbQshJP55jYMPRsveV0AMBQBWpRIJh_fP6X5OoICpNEbR5ZRboRR50PXeQHAESXuoMShRtWYCxn3XoSNO11F9l94Lmg5qSAJnmv6OXnN6y3CUtW1JPjERfqgiGHDufGwGrgL6Y0tlDQ59lXXEIHqYcn4oQtJlYdleORDvD4vg5O8cmWzrbgkwZ7pmnGQkNmzSwB5O2ZF9aOZKnmQplDYdO779CWUX1Qf_OtGFE5rIMNDKGDYAJWbLxX50rQ=w1283-h767"
              />
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.navLinks}>
              <Link to="/board" className={styles.navLink}>게시판</Link>
              <Link to="/auctions" className={styles.navLink}>경매</Link>

            </Nav>

          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">

            <div className="d-lg-none my-2" style={{borderTop: '2px solid #dee2e6'}}></div>

            <Nav className={styles.navLinks}>
              {isLoggedIn ? (
                  <>
                    <Nav.Link onClick={handleLogout} style={{ fontSize: '18px' }} className={styles.navLink}>로그아웃</Nav.Link>
                    <Link to="/mypage" className={styles.navLink}>마이페이지</Link>
                    <MessageModalButton/>
                  </>
              ) : (
                  <>
                    <Nav.Link onClick={handleLogin} style={{ fontSize: '19px' }} className={styles.navLink}>로그인</Nav.Link>
                    <Link to="/signup" className={styles.navLink}>회원가입</Link>

                  </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Header;
