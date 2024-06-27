import React, { useEffect, useState } from "react";
import styles from '../../style/cssmodule/sign/signup.module.css';
import {Link, useNavigate} from "react-router-dom";
import { api } from "../../api/api";
import { debounce } from 'lodash';
import {PostCode} from "./PostCode"
const SignUp = () => {

    const [address,setAddress] = useState("");
    const [member, setMember] = useState({
        id:'',
        password:'',
        name:'',
        nickName:'',
        phone:'',
        address:address,
        detailAddr:'',
        email:'',
        birth:'',
        sido:"",
        sigungu:""
    });

    const [idMessage, setIdMessage] = useState("");
    const [pwdMessage, setpwdMessage] = useState("");
    const [isButtonDisable,setIsButtonDisable] = useState(true);
    const [sido, setSido] = useState("");
    const [sigungu, setSigungu] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const isValid = member.id?.trim() !== '' && member.password?.trim() !== '' &&
            member.name?.trim() !== '' && member.nickName?.trim() !== '' && member.phone?.trim() !== '' &&
            member.address?.trim() !== '' && member.email?.trim() !== '' && member.birth?.trim() !== '' &&
            member.detailAddr?.trim() !== '';

        setIsButtonDisable(!isValid);
    }, [member]);

    useEffect(() => {
        setMember(prevMember => ({
            ...prevMember,
            address: address,
            sido: sido,
            sigungu:sigungu
        }));
    }, [address]);

    //1초동안 입력 없는 경우 get 보내서 중복 체크
    const checkId = debounce(async (e) => {
        const id = e.target.value;

        //정규식 검사
        const regex = /^[a-zA-Z0-9]{4,10}$/;  // 예: 영문자와 숫자로 이루어진 4자 이상의 아이디
        if (!regex.test(id)) {
            setIdMessage("영문자와 숫자로 이루어진 4~10자이내");
            return;
        }
        //중복 체크
        try {
            const response = await api.get(`signup?id=${id}`)
            if(!response.data)
                setIdMessage("사용할 수 있는 아이디");
            else
                setIdMessage("사용할 수 없는 아이디");
        } catch (error) {

        }
    }, 1000);

    //비밀번호 일치 확인
    const checkPassword = (e) => {
        const inputpwd = e.target.value;

        if(member.password === inputpwd){
            setpwdMessage("비밀번호가 일치합니다");
        }else {
            setpwdMessage("비밀번호가 일치하지 않습니다.");
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember(prev => ({ ...prev, [name]: value }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            console.log(member);
            const response = await api.post('signup', member);
            console.log(response.data)
            if (response.data) {
                alert('가입에 성공하였습니다!');
                navigate('/signin');
            } else {
                alert('가입에 실패하였습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Failed to sign up', error);
            alert('가입에 실패하였습니다. 다시 시도해주세요.');
        }
    }


    return (
        <>
            <div className={styles.container}>
                <Link to="/">
                    <h2 className={styles.centerAlign}>
                        <img
                            src="https://lh3.googleusercontent.com/fife/ALs6j_HczOwLPbAaxKYUNURw7ATCdYqs7l4Pcoq6wymYYug8exSQv9OstUJIUVy4joONbM7lKNw25Ic6Vzi9T1FNrHFBqlYm1xranNAFBiPJ0LjdwUDjK5GOvhi35SLT1SpS6lkR9CXZ5nJYYlilK8_hbMU-9MDF3mMeAPyLAB2t0D5nSc-1aB5w3jpFw_1ao1WJhfJdiFWuXQYNfTg1WCoPcfdtARR85UOzvNQet3DiNV5ihO3dhhDxEuuj2HTcjdkOQSKPi_Ca8obCn3IpnPYITf5NsPtvYlxkWCnGegHJDOOteaufRiaTbJAhB_zjDvZwucfP-Hkq36qbIH8Jnfr-MaD2nA1iMKfzm-rDVtmDywwncv3b2sYdwHHUqtjCKj3OYPSs3LzRMRUSEcwQT-3hrTQDLOjoprmHxdy2aoIDUu_KBuyvsvqx3oep26fID5ugVTDR9E-vZVBc-h416rPfXI2HsUiDrFMOL-RBRCpWNgmpv94ydcktjoZiUti45OvopFfwltVqeGtGNaHIp530ujiV1ALjmnyrsCahKJ3yitQv0TZA0wZyqqNsRxyRnmkUkZgm1l90_NIZjb_znKetU4Xab7ssZS9xfKbuY7v70ceN6vPlWrzt9SYM9aShCEXZB_en3432yieF_jGntVTHTqhvEii7bkgRpTSxo6hSH2Q5dOGhsSzNHjTfyCT0yqrIHyt-_6kka63cMc6f-OWa9YxQnS1LP-K2l_pqTFvUTi__aYNk5qTJG1FVLSlTaVjWYYtKGuZPBBFbxBUDTVr5ED6hnSmzo383EVVbcS6MJZsTJU25eC4Wdh_NEP3Eh4eti6jmuGUK8uxaydBnBtwiyha1_bYt5gFcvMKad4I3IUiaWYZ4fjXKC9q-svHNY66KjYXpR3aUlL4w9luXbPYcnzXhG84oF8Ra1uqyjgzVQ57J4o9SRIMctulyxE6ltBH3iKuQP6cFTT6GH5fj1amEQa-E_Y_FlS2vWyt_Z_YF6MQVu5xDpcCxSY619VoeXiLtAhm-czCecvfWw422WPYcyGHTSJQqeySCU7ByCR-9fdytfa4KsiNTdi856sVj09axdCu85MfXkwZI9xFQTUblPxoz-oI9vMIxzo32cgsxMKRgQW6fdvD8d57hyNnWQngggow8xY-eV0ElYO_hpqIkhaX2JdoqLC2vM50WKuX7F_tmY5cfIKrjsVa0wATT8TH4X1BZ9J_UEuNfg_NuGj2EOpi-hJcy9da-GA_FtNcs7Ik36lRUi0jv51sBGcWOv8t_hr9-83s-pBeBPIZAl0sxJO1JuKqhP4Z51ZbVR8XkcmWe-eI11UHJEN6kYdNYTWyvjtYeHvKmTdaf4A8knTb0S8d283ge0yZTGYQCtpNMnHkJZWEXpBnK9Yhw9Ttwvrum1zdTKejIgDaHPTsGZBO1MD3_y0gBm0AlHD08caSVtsg42J6oJuqlvgL0rwP72SuwNkYjQfaljPI2BgohSZSg633d9UK6OkWiR7lUxMGJWjTN-xEVj0PBz_f0s3yVa09fECS4U508bTeJgJRgtUChVw9uGVJEj-AVQqcIECC-Miknb3lWLjVU2Ar1ZzvMT3U407TzImuxYx8L=w649-h767"
                            alt="메인화면" className={styles.logoImage}/>
                    </h2>
                </Link>
                <form className={styles.signUpForm}>
                    <input className={styles.inputField} name="id" type="text" placeholder="아이디" onChange={(e) => {
                        handleChange(e);
                        checkId(e);
                    }}/>
                    <p className={styles.errorMsg}>{idMessage}</p>
                    <input className={styles.inputField} name="password" type="password" placeholder="비밀번호"
                           onChange={handleChange}/>
                    <input className={styles.inputField} type="password" placeholder="비밀번호 확인"
                           onChange={checkPassword}/>
                    <p className={styles.errorMsg}>{pwdMessage}</p>
                    <input className={styles.inputField} name="name" type="text" placeholder="이름"
                           onChange={handleChange}/>
                    <input className={styles.inputField} name="nickName" type="text" placeholder="닉네임"
                           onChange={handleChange}/>
                    <input className={styles.inputField} name="phone" type="text" placeholder="휴대폰 번호"
                           onChange={handleChange}/>
                    <input className={styles.inputField} name="address" type="text" placeholder="주소"
                           onChange={handleChange}/>
                    <input className={styles.inputField} name="email" type="email" placeholder="이메일"
                           onChange={handleChange}/>
                    <input className={styles.inputField} name="birth" type="date" placeholder="생년월일"
                           onChange={handleChange}/>
                    {isButtonDisable && <p className={styles.errorMsg}>모두 입력해주세요</p>}
                    <input type="submit" className={styles.submitButton} value="회원가입" disabled={isButtonDisable}
                           onClick={handleSignUp}/>
                </form>
            </div>
        </>
    );
}
export default SignUp;