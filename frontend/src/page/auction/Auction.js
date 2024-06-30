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
  
        const bidResponse = await api.post(`auctions/${auctionId}/bid`, bid );
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
                    src="https://lh3.googleusercontent.com/fife/ALs6j_GV3fib_I5o04XXd9xssJ7sTsDV-idcUyFQK5GP4h5detHQw3ACzW9z-gTkFKlJgQwvdeJ0SrUAzf4bvnSL4QUxHleRF2nrg7H6PtOwvuILVJO857I6wZkXoq-BB2-h5SrfK2mwinh2z9Xf5DcXvmxUb7fZQxQX90ToJnmr7NdfZc6OmiGrz8dQK1AbJ9bmgNMgpe_f9UoPL4wrw-qCiJoGOjasY8iyoVuxrkl9CEktTsASn5lqsBUzTy29V8Knrkl4b4QJP9jXxqISM5U3X8wXt2wNqOhwIqTWNP1fZYbFw80GisWomGqWS4Ryo_F2RH9nF9i1Vt-GZUH_C80OCQEtTw_yZdFRNbei-tg9p-EbAFikqV-_yKNxEdpiPqnnS7aED1lAID4_qh17Io6YFGD24lAdR15iSdTIoQYIs7t9U7W4dldrCrlWgAMM7-dLPOFgoYlPGBRR5QtYTuSxHE_rPC1dZ8J_rjoQesAxMFq2h9-cGInjfQbuJIFZ72pl0oBzkgbeAuVHmKHNcqnqHdv5kqW-1z3FvxRzJnTOXnkHdq9LY1bjC7XL87VWM6MMr9M0iJy0BP_0aHPnUnEQ_lb-xffR-Rgu6AF4jB90RD6i5iY3dRAH8JEhgLUS3M0kZc9DLQXyz6fYD6T517e7KkEdc5dKhO6E6XazFubY0R1Hx-ERDYeXkHHFvMO2lrC0drzHyl5ZGNmmVY-mYBpyQn2oxee6EARdD1cN4xAQctrQUPZAIYEpU1W4CqS266vhrDn_O8KTbeT6uiEg2hHXxvS9X1HlaYFqj_f-EvMowqNbd2p7YElxlEKzWLJr5hP9yj83Zcf9ny2el_9VeiHSp_WwtqIyqH6TfoAiJF6VWQVpUAFdi4vIRCd6zzdPkrft1jMT3nKZBrXE_bkJ-_ZoH6mKR4TdOpAZSNF1j1QbMqjXyLBDv5VybG68FArZXbUusIIrtMAkSX-_VHydd84_-V64ht2B6_FMYhnKGXF7_ILDDvUpaeIjqUdonaLGUpO7jFoKxSpd45zXsrMYNLR4HhSYjA5S2xuy-_79aryJTE0f9wW1ppr-zn5NtIINKg2kXDClnc9Hkd4L-xM4r3oiDvnOa7OCPPhSsPLb6Q6SSUa4vOvtI5VKyTgojqa-BP4ABFXUaYy3RluJ__0yEqL0ccn-y1KbO5GTgfpGbYISb5W5exkVIvrqeqYc7vN-6IRdJwWVnqoRGATOC50_bL13n244RHbzHkiYK17ulH0yHe0obY-u6ShfHERpEVy7dfd0WbWGopkP9iCTCKCFHMB0CjhvBYzeW0LcWFzGfiX1rIdmfvGMq8zNxv66_i4MScdjJDsXqEOxjgg4fevhvi-EQrXZ8md1PLjlwX2e7Tbg3GkdpWm9XXOBI4cypDenwEIAZjCxmUF6z0MnMCiLSuOgAhhpNamAwGtDR87rnXuO5gmVl_vauOG0SIsqHBs6Y9eb3SJY4ssl2VjiWfn9BTPKzg5RGWa-ef3L9VD4RrPWhKVvXAGg9cm--U4VkEadBptpVF3-s3XwV3EJQhUKPBT9ydWlQluY5LVQVTyK11xsXmZ0Rynroqx5VwsHe9i3MtIdkaYHAwoXoe82G2Uy=w1920-h919"
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