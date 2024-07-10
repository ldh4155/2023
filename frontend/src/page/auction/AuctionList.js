import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from "../../api/api";
import styles from '../../style/cssmodule/auction/AuctionList.module.css';

function AuctionList() {
    const [auctions, setAuctions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [auctionImage, setAuctionImage] = useState(null);
    const [endDate, setEndDate] = useState(''); // 경매 종료 시각 상태 추가
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('access');
  
    useEffect(() => {
      fetchAuctions();
    }, []);
  
  
    const isValidToken = token => {
      if (!token) {
        setErrorMessage("토큰이 존재하지 않습니다.");
        return false;
      }
      return token.split('.').length === 3;
    };
  
    const fetchAuctions = async () => {
      if (!isValidToken(token)) return;
  
      try {
        const response = await api.get('/auctions');
        setAuctions(response.data);
        setErrorMessage('');
        
      } catch (error) {
        console.error("경매 목록을 불러오는데 오류가 발생했습니다: ", error);
        setErrorMessage("경매 목록을 불러오는데 오류가 발생했습니다.");
      }
    };
  
    const handleCreateAuction = async (e) => {
      e.preventDefault();
    
      if (!isValidToken(token)) return;
    
      const formData = new FormData();
      formData.append('title', title);
      formData.append('startPrice', startPrice);
      formData.append('endDate', endDate); // 경매 종료 시각을 FormData에 추가
      if (auctionImage) {
        formData.append('image', auctionImage);
      }
    
      try {
        const response = await api.post('/auctions', formData);
        setAuctions(prevAuctions => [...prevAuctions, response.data]);
        setShowForm(false);
        setTitle('');
        setStartPrice('');
        setEndDate(''); // 상태 초기화
        setAuctionImage(null);
        setErrorMessage('');
        window.location.href = '/auctions';
      } catch (error) {
        console.error("경매 등록 중 오류가 발생했습니다: ", error);
        setErrorMessage("경매 등록 중 오류가 발생했습니다.");
      }
    };
  
    const handleImageChange = (e) => {
      setAuctionImage(e.target.files[0]);
    };
  


    return (
        <div className={styles.container}>
            <div className={styles.parent}>
                <img
                    src="https://lh3.googleusercontent.com/fife/ALs6j_GuYhjYDzv4PF-_UmygkBOr6mQxmtjDNT0MoIApAnnhkQKrs38eMFLfcHf4o9wlJj2xZaK6ZYI0V8--BiJMzVOmfCRBPDd1n1aRvHyV9GqQ53XnIi8jDy4efsxcDgNIKR6inqzQbX2ZY--A0Y0Ix8G_JEZJ1ktdcEWn_5c2e7X4SGeD-kaw-9KgZbuOwG38J9WhPG-l2f2Hn6WOzmVgaPrWlgBRaqr3w4l3EGL-JYy9OhY069CQB9VH407wsqRXjE-1N9MQ3kdWRrPlSrIJ2gH_FQGrAeXcZHRS2nuNNwbfDNDKnuVk3yhi-ywPXSP8CAkcefj2e9c7WfFeyaabTrk-1UNVDJYPPr2YioYE_UpHfvfrkFEvUA7QhfR2qR_9GWzsY__bKgPJU_7n3U70Y_N2pIPLvPckouPzA2F16CTxA6EmpIwLFKdP_DOr66BRFDsjcJzjcDnRfclbyOZzJBqKDHRU2GhHV5MlbjSqptD2jpZft0hXe45WXxBL5F_33Bf7WPB3vsgYgTGfrlgRMc8uY-Gq8RSqphN8-6OVAEHJKESk67_OQXT1fY9lHMnrGkyUzj-t_y4pTsm8LuNOMHK2V1X5_dExLgPpkF-UGpLz0YqomDJdbhppJKUtb2Kz77refNACXApeU7EOkPnTeO4Nzo3elu0b2n3qbuX9YUVuLfDnTHGtqDmabPeeCbqZjafldfv_5jT6G-lflu5J_d_Yy4PO81tGeuTTL1bN8cWFCW6tE35ry4C5Fj08CDj_eYTvuUjMpCZ-qdmfFJtf7XkL7v-2blpjqrMk8wdBAIChg1H0N1DsM3WPS-Arl4cKVu1uWq2VUFJcGOtQW-76k_XVaJbQKAVXCq1VLWXUJApK1J2c8NEZBzn9dXfaE82vSD09TpLkwL48SHdcQ_lgh1X3e-jOkqYg6PdUDZRNxkiMBR679gKt2ONZktG6qm7pbK8Oa7nRTH2DR-oytRCtkaMvS7TmNYJDKo1C39Csfk5j3MArV6qcxBvKsnpCgoGDvQWq3sPhd8WwXnnPInIalRDzJdq8ax4ueH0a4z2gfC7DZ_3Inw958H6J7Og-uWGQRJIklgPJjV8w5XFJZHjLiubdAnaAup4L3QalZdXsKKwR75zqC2dLjX-CBWW2AFgGvNA1P1HAk5sw2xMNDqKJUUY4H6VpdEvl0fACcUipHWzyiGhqRXc9VFzvMRz_Ykbtqs13l6mn0oyd1NQRWVSifhcd61W8ER2hHWdx5xSvDrhWSwmTY_RKVBWbRUlLYQEV7yXm9VkR6PZtdgq-ggoARXtnSzJYDVqpMWitqUvI3jLp0P7knWbbYtonbTC6sYuJk_cGDln58YokZioqkyy8S9whqiFFU_jolf_V53B-1V7qnThT_PV1gfzNfLFZKmjjaeQ4TPSEimqHN68n2V8cz1c_TplzKCLHURRzlh25qeyOEuYM1PTvZVrExokkoTbpHVsZ4t3o1voEjDKFRK5czCFqkI9IFETMuepGPuOVfsc1NrT9MKwYHLQs7CnTCTLmk9l9rNNAu0X_JeBQbRXvbUb2d5va8WeSep9UqrvWeuTUcLd60MEuH07y6SXcNZS3DNWujk3P0X95xMSGOw=w1920-h919"
                    className={styles.img}/>
            </div>
            {!showForm && (
                <button className={styles.button} onClick={() => setShowForm(true)}>경매 등록</button>
            )}
            {showForm && (
                <form className={styles.form} onSubmit={handleCreateAuction}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="title">경매 제목</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="경매 제목"
                            required
                        />
                    </div>
                    <div>
                        종료시간 설정:
                        <input
                            type="datetime-local" // 날짜와 시간을 선택할 수 있는 input 타입
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="startPrice">시작 가격</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="startPrice"
                            value={startPrice}
                            onChange={(e) => setStartPrice(e.target.value)}
                            placeholder="시작 가격"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="image">이미지 업로드</label>
                        <div className={styles.fileInput}>
                            <input
                                type="file"
                                id="image"
                                onChange={handleImageChange}
                                required
                            />
                            업로드
                        </div>
                    </div>

                    <button className={styles.submitButton} type="submit">등록</button>
                </form>
            )}
            <ul className={styles.auctionList}>
                {auctions.map(auction => (
                    <li key={auction.auctionId} className={styles.auctionItem}>
                        <Link to={`/auctions/${auction.auctionId}`}>
                            <div className={styles.auctionImage}>
                                {auction.imageUrl && (
                                    <img src={auction.imageUrl} alt="Auction"/>
                                )}
                            </div>
                            <div>
                                <div className={styles.auctionTitle}>{auction.title}</div>
                                <div className={styles.auctionDetails}>
                                    {"시작가 : " + auction.startPrice}
                                </div>
                                <div className={styles.auctionDetails}>
                                    {"현재 최고가 : " + (auction.amount ? auction.amount : "미입찰")}
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AuctionList;