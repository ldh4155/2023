import { useState } from "react";

function InputForm({ onSubmit, boardData, onChange, handleFileChange }) {
  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <label>
        제목 :
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          value={boardData.title}
          onChange={onChange}
        />
      </label>
      <br />
      <label>
        내용 :
        <textarea
          placeholder="Enter Content"
          name="content"
          value={boardData.content}
          onChange={onChange}
        />
      </label>
      <br />
      <input type="file" name="images" onChange={handleFileChange} multiple />
      <br />
      <button type="submit">완료</button>
    </form>
  );
}

export default function BoardInput({
  SubmitBoard,
  boardData,
  ChangeValue,
  handleFileChange,
}) {
  return (
    <InputForm
      onSubmit={SubmitBoard}
      boardData={boardData}
      onChange={ChangeValue}
      handleFileChange={handleFileChange}
    />
  );
}
