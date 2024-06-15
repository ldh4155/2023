import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from "../../api/api";

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
    } catch (error) {
      console.error("경매 등록 중 오류가 발생했습니다: ", error);
      setErrorMessage("경매 등록 중 오류가 발생했습니다.");
    }
  };

  const handleImageChange = (e) => {
    setAuctionImage(e.target.files[0]);
  };

  return (
    <div className="App">
      <h1>경매 목록</h1>
      <button onClick={() => setShowForm(!showForm)}>경매 등록</button>
      {showForm && (
        <form onSubmit={handleCreateAuction}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="경매 제목"
            required
          />
          <input
            type="number"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
            placeholder="시작 가격"
            required
          />
          <input
            type="datetime-local" // 날짜와 시간을 선택할 수 있는 input 타입
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
          <button type="submit">등록</button>
        </form>
      )}
      <ul>
        {auctions.map(auction => (
          <li key={auction.auctionId}>
            <Link to={`/auctions/${auction.auctionId}`}>{auction.title}</Link>
            <p>{auction.imageUrl && (
              <img src={auction.imageUrl} alt="Auction" style={{ width: '100px', height: '100px' }} />
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