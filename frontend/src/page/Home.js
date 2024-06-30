import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { api } from '../api/api'
import { Link } from 'react-router-dom';
import styles from "../style/cssmodule/home.module.css";

const Home = () => {
    const [topBoards, setTopBoards] = useState([]);

    useEffect(() => {
        fetchTopBoards();
    }, []);

    const fetchTopBoards = async () => {
        try {
            const response = await api.get('board/top?page=0&size=10');
            setTopBoards(response.data.content);
        } catch (error) {
            console.error('Failed to fetch top boards', error);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <img src="https://lh3.googleusercontent.com/fife/ALs6j_EvXDWavbvt6VuBERNb7SFJ1UC421pc8WcXRWEpGABFvIdxz1qeUIbEZxFN8Ahr0PvEcY7NRBgicSmuND8QqP3pzdarqN2670Tnotry7p8Pj0HPQkY9NtSmOyKwWk7XVHZS36RwtPZDcifPyeNwkNYJFNtxAWHsm84Mkr0YG0dup19D2FNce6lJ2gBYavTkjGgGN2okPFvTjlSD-51hOO1OvkFu5In7uSYjo7A6y0160MQKjUsrvumpzawrJiGm5uR8pmTpeoMXChoR_9nZvoXpUUA8zEU3IRkDTYs37w7-psRk_Eo3fHbBiOMjhFC_ozDpiMi45RJPN3pmxaG8EuXS_uc4x6tPt3_owAgxu_Ia2K7P5251kJYsMJuOqJi3gQQF2LWXfVduu8cHIbknIFFjfz96A3lBkbicZNiPaizjrMkVwvs-ZKj3dW0itVjS7MpcvHIcI5DwzhwI4IBC0jxuoG0CWC0EtzS5yOhNfUWUB3c-P4FIzZWo0-GkY9S-WXqIcZ58-N8bTr_rCR_BFlCizm4jM8aIBWW5oJv_fqsl8w2lpcehIHGfyI0CSrRsxLTK4r4J9DdFdq70BoIRQv4lnfrL3i8XTcIbm3-mWYhBZc9ntEokTfXigVcal2BIDOat9piNPjr5NFt4pAzb3lnXzZXJtwfKDTDpscNYNb6XtZIMZIFBByFDm_OLanRCKibBRGyTk9y4aXjt6dKScA0Pqgz6BKdkkHrdptCJMMnP4En44mCpCTPQa758yvVaWZfgwXt_rTt5zrt8kQcXI2VmvIi5_lC_4S2s2O142OeCUZE5p42zdss5UIFTPF4ZTkig4BPxgMM8BQlIz_M7qTVdYo8yfVniR6H8k-MaPiAi3AV49nqOWIviaoRcajonEpjOG_OPNyeozpyzgUXNoYGazmLmYvMP6k4448SC4_514ywqtCA_rYY7GXJcIiHxQm9kbLpgHBn_LYmhN190wJB70po2hF9Fo74mliM9dv_9l3m3_49mIc0mSnxzjpzmWN3wKayB13j5CTKzut__diiYS3W-ej7B9nZ8RTsSe5S5qlkE1nqw5GgspLLMHxYsowM95aGfxlsmF7x-qYSiQVqulKpVKpHys06-WnmR_Ah6TgzPdPu0pfTf2HlBjXXhG71k3e_ZFvVCp5EosWU7oooUg6z4cY20CtJAeo5Ub6-FcQrDt1Zj05VLgRsCG1exlmt8ZFJxsJAVqqfPasgY9GJ1yMnpK6gXq0ZixAOpa-Fh2UQtanddCSjQ_NN-lSOCqx3BcV3hMMBKqYnJvjESfMMpDKfvn_iHhj1gENDm8d1tIsoWKlK-IX09rVYFhoNLBJvUhoQK-NApBlEhfGPLqsjJWOLaieupEhkN9PByJgq54x05OXEVMDxlV2LEo3e7CPVg5zXymfowWXRmxrUKQH-VTGOamDYhAYtd72lPHcq6-X6OLQOiTHo51WAn4cwkwmxK5WrVMD0eAGeTE3kz7hKt89WnhkUFPT6l6WD-x5Ka4VGI-kbVKOt038wLyh3xfYKpi8duIIP9XdURyhUG5iyfQLlIiDPkcUHswGXgaK63vcnYeT_ZmifwkmWadLsy4YI_hUQteYLYRNEM4A=w901-h881"
                         alt="Popular Icon" className={styles.titleIcon}/>
                    <h1 className={styles.title}>오늘의 인기글</h1>
                </div>
                <ul className={styles.boardList}>
                    {topBoards.map((board) => (
                        <li key={board.id} className={styles.boardItem}>
                        <h2 className={styles.boardTitle}>
                                <Link to={`/board/${board.id}`}>{board.title}</Link>
                            </h2>
                            <p className={styles.boardViews}>Views: {board.view}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
