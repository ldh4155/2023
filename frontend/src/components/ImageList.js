import React from "react";

const MediaList = ({ imageUrls }) => {
  // 파일 확장자를 기준으로 미디어 타입을 결정하는 함수
  const renderMedia = (url, index) => {
    const extension = url.split(".").pop();
    if (["mp4", "avi", "mov"].includes(extension)) {
      return (
        <video key={index} controls style={{ width: "300px", height: "300px" }}>
          <source src={url} type={`video/${extension}`} />
          비디오를 지원하지 않는 브라우저입니다.
        </video>
      );
    } else if (["png", "jpg", "jpeg", "gif"].includes(extension)) {
      return (
        <img
          key={index}
          src={url}
          alt={`Media ${index}`}
          style={{ width: "300px", height: "auto" }}
        />
      );
    } else {
      return <div key={index}>지원하지 않는 파일 형식입니다.</div>;
    }
  };

  return (
    <div>
      {imageUrls && imageUrls.length > 0 ? (
        imageUrls.map((url, index) => renderMedia(url, index))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MediaList;
