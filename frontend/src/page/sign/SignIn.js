import React, { useState } from 'react';
import {api} from "../../api/api"
import {Link, useNavigate} from "react-router-dom";
import styles from '../../style/cssmodule/sign/signin.module.css';
import { useDispatch } from 'react-redux';
import { Login } from '../../redux/Action/LoginAction';
const SignIn = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post(`login`, { id, password },{ withCredentials: true });
            alert("로그인 성공");
            dispatch(Login());
            localStorage.setItem("access", response.headers["access"]);
            console.log("성공:",response.headers)
            navigate('/');
        } catch (error) {
            console.log("실패:",localStorage.getItem("access"))
            console.error(error);
            alert("아이디나 비밀번호를 확인해주세요");
        }
    }

  return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleLogin}>
          <Link to="/">
            <h2 className={styles.centerAlign}>
              <img
                  src="https://lh3.googleusercontent.com/fife/ALs6j_HczOwLPbAaxKYUNURw7ATCdYqs7l4Pcoq6wymYYug8exSQv9OstUJIUVy4joONbM7lKNw25Ic6Vzi9T1FNrHFBqlYm1xranNAFBiPJ0LjdwUDjK5GOvhi35SLT1SpS6lkR9CXZ5nJYYlilK8_hbMU-9MDF3mMeAPyLAB2t0D5nSc-1aB5w3jpFw_1ao1WJhfJdiFWuXQYNfTg1WCoPcfdtARR85UOzvNQet3DiNV5ihO3dhhDxEuuj2HTcjdkOQSKPi_Ca8obCn3IpnPYITf5NsPtvYlxkWCnGegHJDOOteaufRiaTbJAhB_zjDvZwucfP-Hkq36qbIH8Jnfr-MaD2nA1iMKfzm-rDVtmDywwncv3b2sYdwHHUqtjCKj3OYPSs3LzRMRUSEcwQT-3hrTQDLOjoprmHxdy2aoIDUu_KBuyvsvqx3oep26fID5ugVTDR9E-vZVBc-h416rPfXI2HsUiDrFMOL-RBRCpWNgmpv94ydcktjoZiUti45OvopFfwltVqeGtGNaHIp530ujiV1ALjmnyrsCahKJ3yitQv0TZA0wZyqqNsRxyRnmkUkZgm1l90_NIZjb_znKetU4Xab7ssZS9xfKbuY7v70ceN6vPlWrzt9SYM9aShCEXZB_en3432yieF_jGntVTHTqhvEii7bkgRpTSxo6hSH2Q5dOGhsSzNHjTfyCT0yqrIHyt-_6kka63cMc6f-OWa9YxQnS1LP-K2l_pqTFvUTi__aYNk5qTJG1FVLSlTaVjWYYtKGuZPBBFbxBUDTVr5ED6hnSmzo383EVVbcS6MJZsTJU25eC4Wdh_NEP3Eh4eti6jmuGUK8uxaydBnBtwiyha1_bYt5gFcvMKad4I3IUiaWYZ4fjXKC9q-svHNY66KjYXpR3aUlL4w9luXbPYcnzXhG84oF8Ra1uqyjgzVQ57J4o9SRIMctulyxE6ltBH3iKuQP6cFTT6GH5fj1amEQa-E_Y_FlS2vWyt_Z_YF6MQVu5xDpcCxSY619VoeXiLtAhm-czCecvfWw422WPYcyGHTSJQqeySCU7ByCR-9fdytfa4KsiNTdi856sVj09axdCu85MfXkwZI9xFQTUblPxoz-oI9vMIxzo32cgsxMKRgQW6fdvD8d57hyNnWQngggow8xY-eV0ElYO_hpqIkhaX2JdoqLC2vM50WKuX7F_tmY5cfIKrjsVa0wATT8TH4X1BZ9J_UEuNfg_NuGj2EOpi-hJcy9da-GA_FtNcs7Ik36lRUi0jv51sBGcWOv8t_hr9-83s-pBeBPIZAl0sxJO1JuKqhP4Z51ZbVR8XkcmWe-eI11UHJEN6kYdNYTWyvjtYeHvKmTdaf4A8knTb0S8d283ge0yZTGYQCtpNMnHkJZWEXpBnK9Yhw9Ttwvrum1zdTKejIgDaHPTsGZBO1MD3_y0gBm0AlHD08caSVtsg42J6oJuqlvgL0rwP72SuwNkYjQfaljPI2BgohSZSg633d9UK6OkWiR7lUxMGJWjTN-xEVj0PBz_f0s3yVa09fECS4U508bTeJgJRgtUChVw9uGVJEj-AVQqcIECC-Miknb3lWLjVU2Ar1ZzvMT3U407TzImuxYx8L=w649-h767"
                  alt="메인화면" className={styles.logoImage}/>
            </h2>
          </Link>
          <input
              className={styles.loginInput}
              type="text"
              value={id}
              placeholder="아이디"
              onChange={(e) => setId(e.target.value)}
              aria-label="아이디"
          />
          <input
              className={styles.loginInput}
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              aria-label="비밀번호"
          />
          <button type="submit" className={styles.loginButton}>
            로그인
          </button>
        </form>
        <div>
          <p>
            계정이 없으신가요?{' '}
            <button className={styles.signupButton} onClick={() => navigate('/signup')}>
              회원가입
            </button>
          </p>
        </div>
        <div>
          <button className={styles.FindIdButton} onClick={() => navigate('/findid')} >아이디 찾기</button>
            |
          <button className={styles.FindPwdButton} onClick={() => navigate('/findpwd')} >비밀번호 찾기</button>
        </div>
      </div>
  );
};
export default SignIn;