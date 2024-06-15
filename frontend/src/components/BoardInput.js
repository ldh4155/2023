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
      <label>
        카테고리 :
        <select
          name="category"
          value={boardData.category}
          onChange={onChange}
        >
          <option value="">카테고리 선택</option>
          <option value="전자제품">전자제품</option>
          <option value="식품">식품</option>
          <option value="의류">의류</option>
          <option value="기타">기타</option>
        </select>
      </label>
      <br />
      <input type="file" name="files" onChange={handleFileChange} multiple />
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
