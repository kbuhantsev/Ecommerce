import { useState } from "react";
import styled, { css } from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 300px;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 80px;
  cursor: pointer;
  padding: 2px;
  border-color: ${(p) => (p.active ? "#ccc" : "transparent")};
  opacity: ${(p) => (p.active ? 1 : 0.6)};
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0].url || "");

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="product image" />
      </BigImageWrapper>
      <ImageButtons>
        {images.map(({ url, _id }) => (
          <ImageButton
            key={_id}
            active={url === activeImage}
            onClick={() => setActiveImage(url)}
          >
            <Image src={url} key={_id} alt="product image" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
