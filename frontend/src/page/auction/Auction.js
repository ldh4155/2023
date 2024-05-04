import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { api, setAuthToken } from "../../api/api";

function Auction() {
  const [bid, setBid] = useState(0);
  const [bidder, setBidder] = useState('');
  const [highestBid, setHighestBid] = useState({bidder: '', amount: 0});
  const { auctionId } = useParams(); // useParams를 사용하여 auctionId를 얻습니다.
  const token = localStorage.getItem('Authorization');
  
  useEffect(() => {
    if(auctionId) fetchHighestBid(); // auctionId가 설정되었을 때만 fetchHighestBid를 호출합니다.
  }, [auctionId]); // auctionId의 변화를 감지하여 useEffect를 다시 실행합니다.

  const fetchHighestBid = async () => {
    try {
      const response = await api.get(`http://localhost:8080/auctions/${auctionId}`);
      setHighestBid(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const submitBid = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await api.get(`mypageuser`);
      setBidder(userResponse.data.memberId);
  
      // Content-Type을 application/json으로 설정
      const config = {
        headers: {
          'Authorization': token, // 기존 토큰 설정
          'Content-Type': 'application/json' // Content-Type 추가
        }
      };
  
      await axios.post(`http://localhost:8080/auctions/${auctionId}/bid`, bid, config);
      fetchHighestBid();  // 최고 입찰 정보를 업데이트합니다.
      setBid('');
      setBidder('');
    } catch (error) {
      console.error("Error posting data: ", error);
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
      <h2>현재 최고 입찰자: {highestBid.bidder} 금액: {highestBid.amount}</h2>
    </div>
  );
}

export default Auction;