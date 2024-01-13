import React, { useEffect } from "react";
import BoardItem from "./BoardItem";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/board")
      .then((res) => {
        setBoards(res.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:8080/board")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setBoards(res);
  //       console.log(1, res);
  //     });
  // }, []);

  return (
    <div>
      {boards.map((board) => (
        <BoardItem key={board.id} board={board} />
      ))}
    </div>
  );
}
