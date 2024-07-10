import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from "../../api/api";
import styles from "../../style/cssmodule/auction/Auction.module.css";

function Auction() {
    const [bid, setBid] = useState(0);
    const [bidder, setBidder] = useState('');
    const [highestBid, setHighestBid] = useState({bidder: '', amount: 0});
    const { auctionId } = useParams();
    const token = localStorage.getItem('access');
    const navigate = useNavigate();
    useEffect(() => {
      if(auctionId) fetchHighestBid();
    }, [auctionId]);
  
    const fetchHighestBid = async () => {
      try {
        const response = await api.get(`auctions/${auctionId}`);
        setHighestBid(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    const submitBid = async (e) => {
      e.preventDefault();
      if (bid < highestBid.amount) {
        alert("최고 입찰가보다 높은 금액을 입력해주십시오.");
        return;
      }
  
      const balanceResponse = await api.get(`auctions/balance`);
      if(balanceResponse.data < bid){
        alert("보유한 금액이 충분하지 않습니다.");
        return;
      }
  
      const checkResponse = await api.get(`auctions/${auctionId}/check`);
      if(checkResponse.data === false){
        alert("종료된 경매입니다.");
        navigate("/auctions");
      }
  
      const userResponse = await api.get(`mypageuser`);
      const ownerResponse = await api.get(`auctions/${auctionId}/ownerId`);
      if(userResponse.data.id === ownerResponse.data){
        alert("경매 주최자는 참여할 수 없습니다.");
        return;
      }
  
      const bidderResponse = await api.get(`auctions/${auctionId}`);
        setHighestBid(bidderResponse.data);
      if(userResponse.data.id === highestBid.bidder){
        alert("이미 입찰하신 경매입니다.");
        return;
      }
  
      try {
        
        setBidder(userResponse.data.memberId);
  
        const bidResponse = await api.post(`auctions/${auctionId}/bid`, {bid} );
        if(bidResponse.data === false){
          alert("종료된 경매입니다.");
          navigate("/auctions")
        }
        fetchHighestBid();
        setBid('');
        setBidder('');
      } catch (error) {
        console.error("Error posting data: ", error);
      }
    };
  
    // 경매 종료 기능
    const endAuction = async () => {
      try {
  
        const response = await api.post(`auctions/${auctionId}/end`,{});
        if(response.data === true){
          alert("경매가 종료되었습니다.");
          navigate("/auctions");
        }
        else{
          alert("경매는 시작한 사용자만 종료할 수 있습니다.")
        }
      } catch (error) {
        console.error("Error ending auction: ", error);
      }
    };
    return (
        <div className={styles.app}>
            <div className={styles.titleContainer}>
                <img
                    src="https://lh3.googleusercontent.com/fife/ALs6j_GuYhjYDzv4PF-_UmygkBOr6mQxmtjDNT0MoIApAnnhkQKrs38eMFLfcHf4o9wlJj2xZaK6ZYI0V8--BiJMzVOmfCRBPDd1n1aRvHyV9GqQ53XnIi8jDy4efsxcDgNIKR6inqzQbX2ZY--A0Y0Ix8G_JEZJ1ktdcEWn_5c2e7X4SGeD-kaw-9KgZbuOwG38J9WhPG-l2f2Hn6WOzmVgaPrWlgBRaqr3w4l3EGL-JYy9OhY069CQB9VH407wsqRXjE-1N9MQ3kdWRrPlSrIJ2gH_FQGrAeXcZHRS2nuNNwbfDNDKnuVk3yhi-ywPXSP8CAkcefj2e9c7WfFeyaabTrk-1UNVDJYPPr2YioYE_UpHfvfrkFEvUA7QhfR2qR_9GWzsY__bKgPJU_7n3U70Y_N2pIPLvPckouPzA2F16CTxA6EmpIwLFKdP_DOr66BRFDsjcJzjcDnRfclbyOZzJBqKDHRU2GhHV5MlbjSqptD2jpZft0hXe45WXxBL5F_33Bf7WPB3vsgYgTGfrlgRMc8uY-Gq8RSqphN8-6OVAEHJKESk67_OQXT1fY9lHMnrGkyUzj-t_y4pTsm8LuNOMHK2V1X5_dExLgPpkF-UGpLz0YqomDJdbhppJKUtb2Kz77refNACXApeU7EOkPnTeO4Nzo3elu0b2n3qbuX9YUVuLfDnTHGtqDmabPeeCbqZjafldfv_5jT6G-lflu5J_d_Yy4PO81tGeuTTL1bN8cWFCW6tE35ry4C5Fj08CDj_eYTvuUjMpCZ-qdmfFJtf7XkL7v-2blpjqrMk8wdBAIChg1H0N1DsM3WPS-Arl4cKVu1uWq2VUFJcGOtQW-76k_XVaJbQKAVXCq1VLWXUJApK1J2c8NEZBzn9dXfaE82vSD09TpLkwL48SHdcQ_lgh1X3e-jOkqYg6PdUDZRNxkiMBR679gKt2ONZktG6qm7pbK8Oa7nRTH2DR-oytRCtkaMvS7TmNYJDKo1C39Csfk5j3MArV6qcxBvKsnpCgoGDvQWq3sPhd8WwXnnPInIalRDzJdq8ax4ueH0a4z2gfC7DZ_3Inw958H6J7Og-uWGQRJIklgPJjV8w5XFJZHjLiubdAnaAup4L3QalZdXsKKwR75zqC2dLjX-CBWW2AFgGvNA1P1HAk5sw2xMNDqKJUUY4H6VpdEvl0fACcUipHWzyiGhqRXc9VFzvMRz_Ykbtqs13l6mn0oyd1NQRWVSifhcd61W8ER2hHWdx5xSvDrhWSwmTY_RKVBWbRUlLYQEV7yXm9VkR6PZtdgq-ggoARXtnSzJYDVqpMWitqUvI3jLp0P7knWbbYtonbTC6sYuJk_cGDln58YokZioqkyy8S9whqiFFU_jolf_V53B-1V7qnThT_PV1gfzNfLFZKmjjaeQ4TPSEimqHN68n2V8cz1c_TplzKCLHURRzlh25qeyOEuYM1PTvZVrExokkoTbpHVsZ4t3o1voEjDKFRK5czCFqkI9IFETMuepGPuOVfsc1NrT9MKwYHLQs7CnTCTLmk9l9rNNAu0X_JeBQbRXvbUb2d5va8WeSep9UqrvWeuTUcLd60MEuH07y6SXcNZS3DNWujk3P0X95xMSGOw=w1920-h919"
                    alt="Popular Icon" className={styles.titleIcon}/>
                <h1 className={styles.title}>경매 입찰 시스템</h1>
            </div>
            <form className={styles.form} onSubmit={submitBid}>
                <input
                    className={styles.input}
                    type="number"
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    placeholder="입찰 금액"
                    required
                />
                <button className={styles.button} type="submit">
                    입찰
                </button>
            </form>
            <button className={styles.button} onClick={endAuction}>
                경매 종료
            </button>
            <div className={styles.bidInfo}>
                <h2>현재 최고 입찰자: {highestBid.bidder}</h2>
                <h2>금액: {highestBid.amount}</h2>
            </div>
        </div>
    );
}
export default Auction;