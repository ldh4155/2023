import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from "../../api/api";

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
    <div className="App">
      <h1>경매 입찰 시스템</h1>
      <form onSubmit={submitBid}>
        <input
          type="number"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
          placeholder="입찰 금액"
          required
        />
        <button type="submit">입찰</button>
      </form>
      <button onClick={endAuction}>경매 종료</button>
      <h2>현재 최고 입찰자: {highestBid.bidder}</h2>
      <h2>금액: {highestBid.amount}</h2>
    </div>
  );
}

export default Auction;