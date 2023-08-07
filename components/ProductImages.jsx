import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import ImageWrapper from "./ImageWrapper";

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
  width: 80px;
  cursor: pointer;
  padding: 2px;
  border-color: ${(p) => (p.active ? "#ccc" : "transparent")};
  opacity: ${(p) => (p.active ? 1 : 0.6)};
`;

const BigImageWrapper = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  height: 300px;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0].url || "");

  return (
    <>
      <BigImageWrapper>
        <Image
          src={activeImage}
          alt="product image"
          fill
          style={{ objectFit: "contain" }}
        />
      </BigImageWrapper>
      <ImageButtons>
        {images.map(({ url, _id }) => (
          <ImageButton
            key={_id}
            active={url === activeImage}
            onClick={() => setActiveImage(url)}
          >
            <ImageWrapper>
              <Image
                src={url}
                key={_id}
                alt="product image"
                fill
                style={{ objectFit: "contain" }}
              />
            </ImageWrapper>
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
