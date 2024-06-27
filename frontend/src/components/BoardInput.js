import { useState } from "react";
import styles from '../style/cssmodule/components/BoardInput.module.css'

function InputForm({ onSubmit, boardData, onChange, handleFileChange }) {
    return (
        <form onSubmit={onSubmit} encType="multipart/form-data" className={styles.formContainer}>
            <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                    제목 :
                    <input
                        type="text"
                        placeholder="Enter Title"
                        name="title"
                        value={boardData.title}
                        onChange={onChange}
                        className={styles.inputField}
                    />
                </label>
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                    내용 :
                    <textarea
                        placeholder="Enter Content"
                        name="content"
                        value={boardData.content}
                        onChange={onChange}
                        className={styles.inputField}
                    />
                </label>
            </div>
            <div className={styles.categoryContainer}>
                <label className={styles.categoryLabel}>카테고리 :</label>
                <select
                    name="category"
                    value={boardData.category}
                    onChange={onChange}
                    className={styles.categorySelect}
                >
                    <option value="">카테고리 선택</option>
                    <option value="전자제품">전자제품</option>
                    <option value="식품">식품</option>
                    <option value="의류">의류</option>
                    <option value="기타">기타</option>
                </select>
            </div>
            <div className={styles.fileInput}>
                <input
                    type="file"
                    name="files"
                    onChange={handleFileChange}
                    multiple
                />
                파일 선택
            </div>
            <button type="submit" className={styles.submitButton}>완료</button>
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