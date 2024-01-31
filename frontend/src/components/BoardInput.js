function InputForm({ onSubmit, boardData, onChange }) {
  return (
    <form onSubmit={onSubmit}>
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
      <button type="submit">완료</button>
    </form>
  );
}

export default function BoardInput({ SubmitBoard, boardData, ChangeValue }) {
  return (
    <InputForm
      onSubmit={SubmitBoard}
      boardData={boardData}
      onChange={ChangeValue}
    />
  );
}
