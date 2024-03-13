import React, { useState } from "react";

const ImageList = ({ imageUrls }) => {
  return (
    <div>
      {imageUrls ? (
        imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index}`}
            style={{ width: "300px", height: "300px" }}
          />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ImageList;
