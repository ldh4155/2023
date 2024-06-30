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
                    src="https://lh3.googleusercontent.com/fife/ALs6j_GV3fib_I5o04XXd9xssJ7sTsDV-idcUyFQK5GP4h5detHQw3ACzW9z-gTkFKlJgQwvdeJ0SrUAzf4bvnSL4QUxHleRF2nrg7H6PtOwvuILVJO857I6wZkXoq-BB2-h5SrfK2mwinh2z9Xf5DcXvmxUb7fZQxQX90ToJnmr7NdfZc6OmiGrz8dQK1AbJ9bmgNMgpe_f9UoPL4wrw-qCiJoGOjasY8iyoVuxrkl9CEktTsASn5lqsBUzTy29V8Knrkl4b4QJP9jXxqISM5U3X8wXt2wNqOhwIqTWNP1fZYbFw80GisWomGqWS4Ryo_F2RH9nF9i1Vt-GZUH_C80OCQEtTw_yZdFRNbei-tg9p-EbAFikqV-_yKNxEdpiPqnnS7aED1lAID4_qh17Io6YFGD24lAdR15iSdTIoQYIs7t9U7W4dldrCrlWgAMM7-dLPOFgoYlPGBRR5QtYTuSxHE_rPC1dZ8J_rjoQesAxMFq2h9-cGInjfQbuJIFZ72pl0oBzkgbeAuVHmKHNcqnqHdv5kqW-1z3FvxRzJnTOXnkHdq9LY1bjC7XL87VWM6MMr9M0iJy0BP_0aHPnUnEQ_lb-xffR-Rgu6AF4jB90RD6i5iY3dRAH8JEhgLUS3M0kZc9DLQXyz6fYD6T517e7KkEdc5dKhO6E6XazFubY0R1Hx-ERDYeXkHHFvMO2lrC0drzHyl5ZGNmmVY-mYBpyQn2oxee6EARdD1cN4xAQctrQUPZAIYEpU1W4CqS266vhrDn_O8KTbeT6uiEg2hHXxvS9X1HlaYFqj_f-EvMowqNbd2p7YElxlEKzWLJr5hP9yj83Zcf9ny2el_9VeiHSp_WwtqIyqH6TfoAiJF6VWQVpUAFdi4vIRCd6zzdPkrft1jMT3nKZBrXE_bkJ-_ZoH6mKR4TdOpAZSNF1j1QbMqjXyLBDv5VybG68FArZXbUusIIrtMAkSX-_VHydd84_-V64ht2B6_FMYhnKGXF7_ILDDvUpaeIjqUdonaLGUpO7jFoKxSpd45zXsrMYNLR4HhSYjA5S2xuy-_79aryJTE0f9wW1ppr-zn5NtIINKg2kXDClnc9Hkd4L-xM4r3oiDvnOa7OCPPhSsPLb6Q6SSUa4vOvtI5VKyTgojqa-BP4ABFXUaYy3RluJ__0yEqL0ccn-y1KbO5GTgfpGbYISb5W5exkVIvrqeqYc7vN-6IRdJwWVnqoRGATOC50_bL13n244RHbzHkiYK17ulH0yHe0obY-u6ShfHERpEVy7dfd0WbWGopkP9iCTCKCFHMB0CjhvBYzeW0LcWFzGfiX1rIdmfvGMq8zNxv66_i4MScdjJDsXqEOxjgg4fevhvi-EQrXZ8md1PLjlwX2e7Tbg3GkdpWm9XXOBI4cypDenwEIAZjCxmUF6z0MnMCiLSuOgAhhpNamAwGtDR87rnXuO5gmVl_vauOG0SIsqHBs6Y9eb3SJY4ssl2VjiWfn9BTPKzg5RGWa-ef3L9VD4RrPWhKVvXAGg9cm--U4VkEadBptpVF3-s3XwV3EJQhUKPBT9ydWlQluY5LVQVTyK11xsXmZ0Rynroqx5VwsHe9i3MtIdkaYHAwoXoe82G2Uy=w1920-h919"
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
            <ul>
                {auctions.map(auction => (
                    <li key={auction.auctionId}>
                        <Link to={`/auctions/${auction.auctionId}`}>{auction.title}</Link> {/* 각 경매 상세 페이지로 이동 */}
                        <p>{auction.imageUrl && (
                            <img src={auction.imageUrl} alt="Auction" style={{width: '100px', height: '100px'}}/>
                        )}</p>
                        <p>{"시작가 : " + auction.startPrice}</p>
                        <p>{"현재 최고가 : " + (auction.amount ? auction.amount : "미입찰")}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default AuctionList;