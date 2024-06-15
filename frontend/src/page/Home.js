import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { api } from '../api/api'
import { Link } from 'react-router-dom';


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
      <Container>
        <div style={{ textAlign: 'center' }}>
          <h1>인기글</h1>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {topBoards.map((board) => (
              <li key={board.id} style={{ marginBottom: '10px' }}>
                <h2>
                  <Link to={`/board/${board.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {board.title}
                  </Link>
                </h2>
                <p>Views: {board.view}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Home;
