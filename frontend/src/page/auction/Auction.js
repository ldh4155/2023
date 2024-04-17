import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Auction() {
  const [bid, setBid] = useState(0);
  const [bidder, setBidder] = useState('');
  const [highestBid, setHighestBid] = useState({bidder: '', amount: 0});
  const [auctionId, setAuctionId] = useState('');

  // 서버로부터 최고 입찰 정보를 가져옵니다.
  useEffect(() => {
    fetchHighestBid();
  }, []);

  const fetchHighestBid = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/auction/${auctionId}`);
      setHighestBid(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const submitBid = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/auction/${auctionId}/bid`, { bidder, amount: bid });
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
          type="text"
          value={bidder}
          onChange={(e) => setBidder(e.target.value)}
          placeholder="입찰자 이름"
          required
        />
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